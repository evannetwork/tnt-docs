const fs = require('fs');
const fse = require('fs-extra');
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
  const versions = fs.readdirSync('./docs');
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

  for (let i = 0; i < versionFolders.length; i++) {
    console.log(`${i + 1} / ${versionFolders.length}: deploying "${versionFolders[i]}"...`);

    execSync([
      `rdme docs "./docs/${version}/${versionFolders[i]}"`,
      `--version=${version}`,
      '--key=F5UuRPWqqCMTYR6DHKg1VYnOeG8SqTq2',
    ].join(' '));
  }
};

deployDocs();
