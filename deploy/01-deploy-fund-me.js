//import
// function deployFunc() {
//     console.log("HI")
// }
//module.exports.default = deployFunc

//const { networks } = require("../hardhat.config")
const {
    networkConfig,
    developementChains
} = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress
    if (developementChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    //well what happens when we want to change chains
    // when going for localhost or hardhat network we want to use mock

    const args = [ethUsdPriceFeedAddress]
    const FundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //put priceFeed Address,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })
    if (
        !developementChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(FundMe.address, args)
    }
    log("-------------------------------")
}

module.exports.tags = ["all", "fundme"]
