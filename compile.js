const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve('build');

const createBuildFolder = () => {
  fs.emptyDirSync(buildPath);
};

const contractFolderPath = path.resolve('contracts');

const buildSources = () => {
  const sources = {};
  const contractFiles = fs.readdirSync(contractFolderPath);

  contractFiles.forEach(file => {
    const contractFullPath = path.resolve(contractFolderPath, file);
    sources[file] = {
      content: fs.readFileSync(contractFullPath, 'utf8')
    };
  });

  return sources;
}

const input = {
  language: 'Solidity',
  sources: buildSources(),
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode']
      }
    }
  }
}

const compileContracts = () => {
  const compiledContracts = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

  for(let contract in compiledContracts) {
    for(let contractName in compiledContracts[contract]) {
      fs.outputJSONSync(
        path.resolve(buildPath, `${contractName}.json`),
        compiledContracts[contract][contractName],
        {
          spaces: 2
        }
      )
    }
  }
}

(function run() {
  createBuildFolder();
  compileContracts();
})();