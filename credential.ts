import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {
  TaskProcessor,
  createProcessorFunc,
} from '@utils/processors';
import * as vadeApi from '@utils/vade/vade-api';
import { KeyTypes as AZURE_KEY_TYPES } from '@utils/interfaces';
import {
  AssetData,
  ActionDirection,
  AssetDataType,
  CredentialDefinition,
  CredentialTemplate,
  Identity,
  Contact,
} from '@utils/models';
import DIDCommHandler from '@utils/data-handlers/DIDCommHandler';
import config from '@utils/config';
import { requestService } from '@utils/request';

class VcProcessor extends TaskProcessor {
  static configParams = [
    'assetDataUuid',
    'credentialValues',
    'credUuid',
    'schemaUuid',
  ];

  static optionalParams = [
    'contactUuid',
  ];

  async run() {
    const {
      assetDataReferenceToUse,
      assetDataUuid,
      contactUuid,
      credentialValues,
      credUuid,
      schemaUuid,
      threadId,
    } = this.config;
    const identity = await Identity.findOne(
      { uuid: this.identityUuid },
      { relations: ['principal'] },
    );
    const targetUuid = contactUuid || this.identityUuid;
    let contact;
    if (contactUuid) {
      contact = await Contact.findOne(contactUuid);
    }

    const template = await CredentialTemplate.findOneOrFail({ uuid: schemaUuid });
    const credDef = await CredentialDefinition.findOneOrFail(
      { uuid: credUuid },
      { relations: ['credentialTemplate'] },
    );

    const credDefResponse = await axios.get(config.SECRET_SERVICE_URL, {
      params: {
        type: AZURE_KEY_TYPES.CREDENTIAL_DEFINITION_KEY,
        key: credDef.credentialKeyUuid,
      },
      headers: this.context.bindings.req.headers,
    });

    const revRegResponse = await axios.get(config.SECRET_SERVICE_URL, {
      params: {
        type: AZURE_KEY_TYPES.REVOCATION_REGISTRY_KEY,
        key: credDef.revocationKeyUuid,
      },
      headers: this.context.bindings.req.headers,
    });

    const msResponse = await axios.get(config.SECRET_SERVICE_URL, {
      params: {
        type: AZURE_KEY_TYPES.MASTER_SECRET,
        key: identity.uuid,
      },
      headers: this.context.bindings.req.headers,
    });

    // fill empty values to prevent vade errors
    const templateValue = JSON.parse(template.data);
    Object.keys(templateValue.properties).forEach((key) => {
      if (!credentialValues[key]) {
        credentialValues[key] = '';
      }
    });

    const vc = await vadeApi.workflow_issue_credential(
      identity.did,
      contact?.did || identity.did,
      credDef.credentialTemplate.templateDid,
      credDef.definitionDid,
      credDefResponse.data,
      credDef.revocationRegistryDid,
      JSON.parse(credDef.revocationRegistryInfo),
      revRegResponse.data,
      msResponse.data,
      credentialValues,
      this.context,
    );

    // apply the new vc id to the draft asset, so it will be overwritten by the didcomm handler
    // logic
    const existingAssetData = await AssetData.findOne(assetDataUuid);
    const didMessage = {
      // assign the message to the already existing event / asset
      '@id': JSON.parse(existingAssetData.value).eventId || uuidv4(),
      '@type': 'credential-issue',
      'credentials~attach': [vc],
      '~thread': { thid: threadId || targetUuid },
    };
    await DIDCommHandler.store(
      this.context,
      this.identityUuid,
      targetUuid,
      ActionDirection.OUTGOING,
      // apply a mocked did comm message, so we can just the logic of the didcomm handler
      didMessage,
      (handler: DIDCommHandler, key: string, inputAssetData: AssetData) => {
        const formatted = inputAssetData;
        // overwrite new uuid with old one, to prevent duplicated data
        if (inputAssetData.type === AssetDataType.CREDENTIAL) {
          formatted.uuid = assetDataUuid;
          formatted.assetRefId = assetDataReferenceToUse || formatted.assetRefId;
        }
        return formatted;
      },
    );

    // send out, if the credential was issued for another user
    if (contact) {
      await requestService(
        'post',
        'didcomm',
        {
          from: vc.credential.issuer,
          to: contact.did,
          message: didMessage,
        },
        null,
        this.context,
      );
    }
  }
}

export default createProcessorFunc(VcProcessor);
