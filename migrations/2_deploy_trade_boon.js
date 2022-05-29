const temples = require("../src/data/temples.json");
const TradeBoon = artifacts.require("TradeBoon");

module.exports = function (deployer, networks, accounts) {
  deployer.deploy(TradeBoon).then((instance) => {
    temples.map(async (temple) => {
      const timestamp = Date.now();
      await instance.addTemple(
        temple.id,
        temple.name,
        temple.picture,
        temple.province,
        temple.region,
        temple.rating,
        timestamp,
        {
          from: accounts[0],
        }
      );
    });
  });
};
