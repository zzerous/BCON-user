const ContentManagement = artifacts.require('./ContentManagement.sol')
const fs = require('fs')

module.exports = function (deployer) {
  deployer.deploy(ContentManagement)
    .then(() => {
    if (ContentManagement._json) {
      // 1. Record recently deployed contract's abi file to 'deployedABI'
      fs.writeFile(
        'deployedABI',
        JSON.stringify(ContentManagement._json.abi, 2),
        (err) => {
          if (err) throw err
          console.log(`The abi of ${ContentManagement._json.contractName} is recorded on deployedABI file`)
        })
    }

    // 2. Record recently deployed contract's address to 'deployedAddress'
    fs.writeFile(
      'deployedAddress',
      ContentManagement.address,
      (err) => {
        if (err) throw err
        console.log(`The deployed contract address * ${ContentManagement.address} * is recorded on deployedAddress file`)
    })
  })
}
