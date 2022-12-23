const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")
const { developementChains } = require("../../helper-hardhat-config")

developementChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function() {
          let fundMe
          let deployer
          let MockV3Aggregator
          const sendValue = ethers.utils.parseEther("1") //1 eth
          beforeEach(async function() {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows people to fund and withdraw", async function() {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert.equal(endingBalance.toString(), "0")
          })
      })
