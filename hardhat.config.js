require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("@nomiclabs/hardhat-waffle")
require("hardhat-deploy")

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "http//example.com"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "eky1"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key1"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    //solidity: "0.8.8",
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }]
    },
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6
        }
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD"
    },
    namedAccounts: {
        deployer: {
            default: 0
        },
        user: {
            default: 1
        }
    }
}
