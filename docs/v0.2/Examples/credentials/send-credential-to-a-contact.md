---
title: "Verify Credential Values"
slug: "send-credential-to-a-contact"
hidden: false
createdAt: "2020-09-17T12:14:22.636Z"
updatedAt: "2020-11-19T07:25:55.319Z"
---
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e11300b-credentials_4.png",
        "credentials_4.png",
        487,
        487,
        "#f4f9f9"
      ]
    }
  ]
}
[/block]
Back at our first account, we can now get the values from our contact and verify them.

To get the credential values we can use [Proof Request] endpoint again. Notice, that we use the `uuid` of the original request on our first accounts side:

```js
const data = null;

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.trust-trace.com/api/v1/proof-request/6d866fa4-929f-4546-bdf2-db91b7cb7241");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("tnt-subscription-key", "$ALICE_SUBSCRIPTION_KEY");

xhr.send(data);
```

Which returns:
```json
{
  "createdBy": null,
  "createdAt": "2020-09-22T06:28:17.996Z",
  "updatedBy": null,
  "updatedAt": "2020-09-22T06:28:17.996Z",
  "uuid": "abe2760d-e0af-4885-a21b-4adf36c4a6a8",
  "principalUuid": "990ccd48-94dc-4c21-8589-7d602322517e",
  "assetRefId": "e6c00b39-1452-46bc-8fe8-425badf1be32",
  "type": "PROOF_REQUEST",
  "status": "ACTIVE",
  "value": "{\"@context\":[\"https://www.w3.org/2018/credentials/v1\"],\"id\":\"e6c00b39-1452-46bc-8fe8-425badf1be32\",\"type\":[\"VerifiablePresentation\"],\"verifiableCredential\":[{\"@context\":[\"https://www.w3.org/2018/credentials/v1\"],\"id\":\"0d520c11-b381-4dc0-9f0b-ba6a539bfd22\",\"type\":[\"VerifiablePresentation\"],\"issuer\":\"did:evan:testcore:0xce5C9d0989E642619494e343042615E9D527cde7\",\"credentialSubject\":{\"id\":\"did:evan:testcore:0xce5C9d0989E642619494e343042615E9D527cde7\",\"data\":{\"paymentDate\":{\"raw\":\"2020-01-23\",\"encoded\":\"10841126087327526101253494474326369216674323583635906514931067962875232455837\"},\"payedAmount\":{\"raw\":\"1234.56 EUR\",\"encoded\":\"39494260058677908780687632820306938858691371548592967689070312921224627089687\"}}},\"credentialSchema\":{\"id\":\"did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98\",\"type\":\"EvanZKPSchema\"},\"proof\":{\"credentialDefinition\":\"did:evan:zkp:0x4cde5dd59272a9d4636260c3d0a23b8f47bda94d882639a23946c9a209ea1d76\",\"revocationRegistryDefinition\":\"did:evan:zkp:0x4b2e32db0f7dadcfc55cdacb862e3d60b4099cf6ebf57ba849c9d46a27211b66\",\"proof\":\"{\\\"primary_proof\\\":{\\\"eq_proof\\\":{\\\"revealed_attrs\\\":{\\\"payedAmount\\\":\\\"39494260058677908780687632820306938858691371548592967689070312921224627089687\\\",\\\"paymentDate\\\":\\\"10841126087327526101253494474326369216674323583635906514931067962875232455837\\\"},\\\"a_prime\\\":\\\"10003071862443556351086114128903513903977353104826851650031908979114879595750536562893742099382357328026775503326981227171375491905333886873314583511268194448873516900664130927074595247707570479094274865472137274769144000993713454311390150118533287592388489398168495135344130958444037135912610209778129266423736744790880666562076139758976370900747614485477891568814350638853960249459676077368673171033808870154004463730931783324744707385799573987998110223345965874772961881864743639864199544756879677720595543642924214149168634127156186318419171536758248783040992361167402772758851046217927326574244690030477482465511\\\",\\\"e\\\":\\\"682101360290450533642096325916313063807707179276875539724301991496204391832737512332798095712938343560295486604454265403409464952656096\\\",\\\"v\\\":\\\"1245273037840879229365757598558110720774042296000140316245012115673165959146118569465783672554619013054149133220185733156407852200555090488630563254189265763979569045345079052848564229803040484490861380593491843737492185426906712488486715402025436276644830680714512051456074131135975807690000058673204147422280737136299507772190201511321753911997085964138183874600900457839084093471130842762105872673640275452014399615927312719384414677880095193295443833171131609159572427465291673801136841621972229569526329800417914686135597372020821004402467040056630052154749415388102609706485653793667192986502995684758091641054553076733928972461084575410538723648589664553119173266017048741571275222053026600509614345562118038225233055696616184094301976827501576127323157842506107226116216046588949668029824772569330005879950153701692791247177286295919769764222244252239376505844067770109712856895478139569681693612772467815588143917\\\",\\\"m\\\":{\\\"master_secret\\\":\\\"7294471173753979160379261123739431792548171432831287530065519184813178069316086577546148695346905162385173473355057297710464260827942250123614846977269615976223679285518033477475\\\",\\\"invoiceId\\\":\\\"13139497271816529170436850839086468164991190883587191836384159503788201007946703201112170892809765008262408084740299513695789094778577875793549955210752657277414722193748129923587\\\"},\\\"m2\\\":\\\"3771427772996450141890656566837309785008150699183446661741166569863823313443633002285296406216263998834933105200516401249065378049761062310552433432483865\\\"},\\\"ge_proofs\\\":[]},\\\"non_revoc_proof\\\":{\\\"x_list\\\":{\\\"rho\\\":\\\"0108B09E1418E5835575EA7C1F946BA617C3D035F60BD32771F131EC40C09E69\\\",\\\"r\\\":\\\"1F8C043ECD46DAC282716553AD7BDB0DE73F31845214C77A1AF40C24E1913DCC\\\",\\\"r_prime\\\":\\\"1CC6761818348EDE5E389216AF2BC0F1D621E438C6229B57BA76597161C11509\\\",\\\"r_prime_prime\\\":\\\"17F89C093D33EADF9ED4EAED58FDAB98F62DB6F2A1FAA5928C4A80932B0B8B98\\\",\\\"r_prime_prime_prime\\\":\\\"1EC830D548DA86A89AED3423F7800BC02EFB2EE535D374DC6A35A257D657D8F1\\\",\\\"o\\\":\\\"1027532C462B6D248601E031E7B34FBBCA89F098F8365CC02D1EFECC70C0960F\\\",\\\"o_prime\\\":\\\"18F1DF362E454EA9FA5A910A94D154463756B1CA7929976C2536637ABD918871\\\",\\\"m\\\":\\\"09DE34E91B3A23FA9696D6C853FE5E3F4C73589C4AF9FEE07C34A5902D5D0F95\\\",\\\"m_prime\\\":\\\"1346FA928B84137167E51D34EA6A4EE76875F5926EBE763CA9DCC07348603D0C\\\",\\\"t\\\":\\\"1054211C21CAB3C31A72D63A72DF0F097F3A8983D9FDD711DF0A8B25D3683CDF\\\",\\\"t_prime\\\":\\\"01E7328891C043D67F37E3B8A0F642A3D6046A273407B00D202C67711881D9B9\\\",\\\"m2\\\":\\\"00116DCEFA2C9DB32AC94482733EFCD520CE54BA86E2E28C75C932BF0E67A92B\\\",\\\"s\\\":\\\"1D310A2864AF558D6730B1C780278B74CE9F129263F77A32F04D0D90ACC723F6\\\",\\\"c\\\":\\\"09BEF5EAF859CF91EC67D9769921EFBD0A6258135C43190ED96A122A38ACB5DC\\\"},\\\"c_list\\\":{\\\"e\\\":\\\"6 46B24C4A38C8EEB69F040AABC891D797454CD64719DEE761667AF7E00B3A928F 4 176CD48C71A64B56597E2E9B059450C8D643B439BCD0C4597083DA92F3175752 4 28AB46FC14461CB9A2C4CF5CC8D70FA71A6005B7C036398306E8DADB740AD710\\\",\\\"d\\\":\\\"6 3B4FCCA0B26BA9EFB9FD5F40F6236E1032A0BE0052AA2E309C84C86B5290AF5F 4 336CD043D46157507501F219D3D51BA758EBDC75E287734802F9EF5BDE596616 4 2DB2756A1CFC51358CD7A8523621DDF07757F33ABE6BAC062EBE9284DC5157B1\\\",\\\"a\\\":\\\"6 4E4FE43C53A625F67E63EB549345DB568EC8CB62416D178C79ED39F1AAAF286F 4 30D1D736EA00EB5CFF5A439D89DFE95248EE9A44C485EA9DA20AEF103AEE2EF7 4 2DEE2B314F447A247AC198D6EF9738E664EA646B9E359DC1DB74395E3038210D\\\",\\\"g\\\":\\\"6 3431B2407B5E97D2F873C561D04A7DD8087EB225145633782108CB5F1EA73839 4 08B75CC62F7A86D945EF18D133AD329C0770A34632B15895EC94DA3E28ABB79E 4 1BA059DF51F2A17A474E9485795373D89051F3FF33A551A1918D863C344F0B40\\\",\\\"w\\\":\\\"21 13FCD982D2E8EF87DCC0B4F8E2D394303F818E901CC8DCB0A5E895904A87045DA 21 11DAD88EB9334025052DDD96D6ED4D0ECE536000AA21FA5C58067C0E6828A5B25 6 529A27474ED6C8635F95F184E6BAD43BDA2D3881629A5C93EE32015FFEAC7106 4 36A666883A777492B49C59BF939CBE0485D7190FCF736E92FA94EA49CA7D3776 6 62A6E76F3B0CB6461FF345BB2D3BB63785835DD49A2546BEB4BC7EF73F00FF3F 4 2DCED12274251B54BDE38A02B6A1B6398DA601DB81366BC57D775CACF52D174D\\\",\\\"s\\\":\\\"21 12F2D9BF9ABE2130B929ABA11CE733D7B4EF6AB9AFEEF090758E55EEFDB53B3BB 21 11FFFC7C1812789AE8E68A817B192BD7A21B7DAEC45E0F159D2D307593E75E7C5 6 662AD446918709F37F4B8142FD118FE0DB1D7E35B92F4D42484FBFE5BB18F5F5 4 22D4E41A4E1156B72E5BE98F745B171DEBF015052B81FE6C542DFE961CE2339E 6 7D42409976A62BB01266E57F27785895773322AED0766D35FC1948FC3ED6BFE1 4 272C1602341704574110CE6194B5932BB781C5D54A49971BF1E29FAA1E0B7007\\\",\\\"u\\\":\\\"21 118ED3417C526FCD2C113F91D1C316F307521891F60A0F193301D5D21D9FE2CC6 21 10BFCEEBF53473F6305F67094F1F56EA71BCEC209BE7A5C4DFACAA1F228C0B464 6 70060976EEFED37B8DF42B5A8FAABFE7C1486ACFC0589C6AF6DB0482B409CC4B 4 253177BAAC408C92C5570B8C82408E231AF582FD029DF0468908E94959CC3FDD 6 6965126D24188B499D96B017B04519411BA00A0439CE6DE57434781B2431893C 4 1474949F3F20E1625B5D3F42286D95338570312EB2D77702D03A2126BD6EFE6E\\\"}}}\"}}],\"proof\":{\"nonce\":\"965289303059648771018575\",\"aggregatedProof\":\"{\\\"c_hash\\\":\\\"95898036218923664481043855047475870072483436416087139109583026023124931196979\\\",\\\"c_list\\\":[[4,6,23,158,203,25,228,231,129,132,159,59,208,253,239,76,133,155,30,146,29,175,92,50,98,31,125,152,160,69,49,76,184,22,58,79,200,248,255,230,140,222,57,135,68,107,190,224,184,214,167,7,105,84,100,65,244,247,166,120,128,56,19,149,73,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[4,16,9,81,67,158,226,194,234,130,63,230,76,150,140,249,33,10,148,190,86,92,52,233,0,121,86,61,196,251,141,179,231,6,98,164,10,89,173,105,69,188,213,169,220,189,53,204,233,235,218,217,234,142,237,251,92,182,177,93,50,107,222,222,162,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[4,31,102,247,18,103,108,246,121,40,102,119,37,56,222,55,134,138,30,211,189,163,232,244,188,59,236,74,170,242,40,154,162,20,222,36,20,52,228,98,41,101,234,36,120,196,186,247,153,143,95,168,98,242,205,179,218,45,34,114,230,50,122,108,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[4,36,189,189,208,241,15,24,123,62,42,205,238,244,148,167,240,63,95,255,47,6,188,10,71,123,178,217,137,70,117,71,64,7,184,58,50,242,150,150,177,34,210,150,234,199,72,174,58,153,62,173,143,16,134,254,158,88,69,116,123,107,93,251,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[21,112,22,23,209,162,239,86,94,103,6,132,30,140,9,123,115,49,144,158,157,99,208,25,85,33,9,179,235,204,49,205,22,134,157,47,73,25,96,29,158,56,169,180,18,61,236,244,189,174,120,234,145,180,30,119,194,221,180,76,121,28,223,188,0,137,237,0,119,43,103,234,199,0,18,136,177,3,39,211,103,169,228,17,253,78,88,34,84,5,206,58,174,85,162,223,15,146,217,252,112,92,188,103,200,177,117,7,161,101,227,164,150,10,131,243,171,27,209,140,210,162,59,135,121,13,117,190],[7,151,248,82,206,205,160,168,68,76,247,166,94,222,15,141,107,203,100,89,174,44,24,70,167,7,196,87,71,219,178,64,30,58,121,44,149,42,114,51,28,119,146,119,222,153,255,198,178,82,239,114,216,142,110,197,233,173,36,253,24,169,29,110,4,197,3,126,52,69,88,60,235,143,250,90,146,102,121,158,14,134,83,1,132,146,172,242,31,208,47,29,63,160,193,104,13,116,54,103,189,14,217,1,131,179,192,58,149,58,111,249,91,196,179,6,239,217,209,60,132,76,181,132,131,174,232,201],[13,85,251,68,211,56,149,159,103,82,75,206,81,61,219,162,160,151,108,72,36,46,77,23,220,243,121,207,37,39,126,109,19,254,195,222,143,253,114,105,128,65,25,86,131,88,196,183,29,59,205,135,66,111,25,36,124,122,52,25,38,82,219,216,25,90,130,234,55,215,24,102,28,238,74,105,134,163,125,1,143,7,61,134,126,39,237,88,93,100,225,239,61,197,111,31,2,77,116,23,139,228,85,252,57,192,104,172,207,185,50,154,153,245,190,55,44,90,124,191,249,243,175,116,85,118,157,183],[79,61,85,241,167,189,31,116,73,120,154,188,153,146,60,86,149,141,57,231,179,167,65,239,191,172,80,103,24,42,119,233,23,43,168,12,124,176,221,165,142,215,242,141,73,218,59,108,104,20,176,46,53,214,3,206,18,40,112,52,119,102,89,34,188,61,186,190,21,189,255,106,64,105,22,185,157,209,114,76,225,29,153,64,251,231,92,113,63,45,217,49,92,22,51,81,33,87,139,50,88,27,52,40,38,99,249,108,77,224,115,171,159,218,192,50,149,158,107,167,132,180,62,97,109,114,98,40,111,216,73,141,44,9,187,64,59,16,45,131,158,147,255,123,207,87,131,154,186,23,202,18,160,190,68,218,46,154,213,150,5,244,247,41,130,101,147,35,84,104,71,69,99,10,35,108,147,119,11,112,26,186,32,94,199,102,127,172,29,106,148,147,162,215,77,76,160,165,223,73,44,206,240,46,187,74,229,187,183,33,129,197,244,185,58,229,79,160,35,241,182,148,64,156,46,139,153,9,78,159,73,219,45,212,151,179,97,106,167,1,153,122,4,134,206,8,14,235,26,156,75,168,74,153,24,231]]}\"}}",
  "subject": "37f657b8-dc2f-4f1d-8d20-927393101e74",
  "issuer": "37f657b8-dc2f-4f1d-8d20-927393101e74",
  "verifier": "046973cf-2190-49b0-b668-7ff46ba8495b",
  "issueDate": null,
  "expirationDate": null
}
```

Now we can verify this result with [presentation's GET] endpoint:

```js
const data = null;

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.trust-trace.com/api/v1/presentation/abe2760d-e0af-4885-a21b-4adf36c4a6a8/verify?proofRequestUuid=6d866fa4-929f-4546-bdf2-db91b7cb7241");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("tnt-subscription-key", "$ALICE_SUBSCRIPTION_KEY");

xhr.send(data);
```

Which returns:

```json
{
  "presentedProof": "e6c00b39-1452-46bc-8fe8-425badf1be32",
  "status": "verified"
}
```

[Proof Request]: ref:get_request-presentation
[presentation's GET]: ref:get_presentation