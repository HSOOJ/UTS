import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
const fs = require("fs");
const pvKey = fs.readFileSync(".secret").toString().trim();

dotenv.config();
const Görli_URL =
  "https://goerli.infura.io/v3/ec7c811a20a64a52b385a3003b40621b";
const INFURA_URL =
  "https://ropsten.infura.io/v3/851bad79e47b4833a7c082d66c2bc4ab";
const MUMBAI_URL =
  "https://polygon-mumbai.infura.io/v3/ec7c811a20a64a52b385a3003b40621b";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: INFURA_URL,
      accounts: [`0x${pvKey}`],
    },
    goerli: {
      url: Görli_URL,
      accounts: [`0x${pvKey}`],
    },
    mumbai: {
      url: MUMBAI_URL,
      accounts: [`0x${pvKey}`],
    },
    // ssafy: {
    //   url: "http://20.196.209.2:8545",
    //   accounts: [
    //     "0x35b05a7f844aa479bb37db4988aa4746eac0c7c29a2606f7cfa5383424351ac3",
    //   ],
    // },
  },
};

export default config;
