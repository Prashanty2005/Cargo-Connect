const ShipmentTracking = artifacts.require("ShipmentTracking");

module.exports = function(deployer) {
  deployer.deploy(ShipmentTracking);
}; 