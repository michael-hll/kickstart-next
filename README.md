This repository is a workable source code of a UDEMY course with latest Nextjs and Solidity (Only the kickstart project, for the others please refer to my another reposioty: etherstudy):

## Ethereum and Solidity The Complete Developers Guide by Stephen

Since the original course source code is not available or using older version of Next.js, I created this repository fixed the issues when using Next.js 14 with a semantic UI and a basic Ethereum smart contract.

The overall strucutre of the code is similar to the author's original course, you can just watching the author's video and looking at this source code.

Some key steps to get started:

- Clone of download this project to your local pc
- Go to the root directory of this project from terminal
- Install dependencies: `npm install`
- Compile the smart contract:`npm run compile`
- Deploy the smart contract to a blockchain: `npm run deploy` (make sure fill out the blockchain network and your metamask account in .env file, see example of .env file from below)
- Start the Next.js app: `npm run dev`
  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## .env Example

Create the .env file in the root directory of the project:

```
SEPOLIA_ENDPOINT=https://sepolia.infura.io/v3/<private key>
ACCOUNT_MNEMONIC=<your mnemonic>
```
