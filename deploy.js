const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { execSync } = require('child_process');

const excluded = [
  '.DS_Store',
  'API Services',
  'Auth Services',
  'Documentation',
  'ESG Certificates',
  'Getting Started',
];

const deployDocs = async () => {
  const versions = fs
    .readdirSync('./docs')
    .filter((folder) => !excluded.includes(folder));
  const { version } = await inquirer.prompt([{
    type: 'list',
    choices: versions,
    name: 'version',
    default: versions[versions.length - 1],
  }]);

  const versionFolders = fs
    .readdirSync(`./docs/${version}`)
    .filter((folder) => !excluded.includes(folder));
  const { categories } = await inquirer.prompt([{
    type: 'checkbox',
    choices: versionFolders.map((value) => ({
      value,
      checked: true,
    })),
    name: 'categories',
  }]);

  let foldersToDeploy = [];
  for (let i = 0; i < versionFolders.length; i++) {
    const categoryFolder = path.resolve(`./docs/${version}/${versionFolders[i]}`);
    const categorySubs = fs
      .readdirSync(categoryFolder)
      .filter((folder) => !folder.endsWith('md') && !excluded.includes(folder));
    foldersToDeploy = [
      ...foldersToDeploy,
      categoryFolder,
      ...categorySubs.map((folder) => `${categoryFolder}/${folder}`),
    ];
  }

  for (let i = 0; i < foldersToDeploy.length; i++) {
    console.log(`${i + 1} / ${foldersToDeploy.length}: deploying "${foldersToDeploy[i]}"...`);

    execSync([
      `rdme docs "${foldersToDeploy[i]}"`,
      `--version=${version}`,
      '--key=F5UuRPWqqCMTYR6DHKg1VYnOeG8SqTq2',
    ].join(' '));
  }
};

deployDocs();
