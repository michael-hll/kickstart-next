const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");
const { writeFile } = require('../utils/write');

const buildPath = path.resolve(__dirname, "build");
let contractFileName = "Campaign.sol";

if (process.argv.length > 2 && process.argv[2].endsWith('.sol')) {
  contractFileName = process.argv[2];
}

// Delete the current build folder.
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, "contracts", contractFileName);
if (fs.existsSync(contractPath) === false) {
  console.log(`Contract path doesn't exist: ${contractPath}`);
  return;
}
const source = fs.readFileSync(contractPath, "utf8");

/***
 * The recommended way to interface with the Solidity compiler, especially for more
 * complex and automated setups is the so-called JSON-input-output interface.
 *
 * See https://docs.soliditylang.org/en/v0.8.6/using-the-compiler.html#compiler-input-and-output-json-description
 * for more details.
 */
const input = {
  language: "Solidity",
  sources: {
    [contractFileName]: {
      content: source,
    }
  },
  settings: {
    metadata: {
      useLiteralContent: true,
    },
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contracts = output.contracts[contractFileName];

// Create the build folder.
fs.ensureDirSync(buildPath);

// Extract and write the JSON representations of the contracts to the build folder.
for (let contract in contracts) {
  if (contracts.hasOwnProperty(contract)) {
    fs.outputJsonSync(path.resolve(buildPath, `${contract}.json`), contracts[contract]);
  }
}

// debug used
writeFile(path.resolve(buildPath, contractFileName) + '.debug.json', output);
