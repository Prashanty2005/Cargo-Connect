const { Web3 } = require('web3');
const ShipmentTracking = require('../../build/contracts/ShipmentTracking.json');

class BlockchainService {
    constructor() {
        // Use Web3's test provider instead of Ganache
        this.web3 = new Web3();
        this.web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
        
        // Create a new instance of the contract
        this.contract = new this.web3.eth.Contract(
            ShipmentTracking.abi,
            '0x0000000000000000000000000000000000000000' // Placeholder address
        );
    }

    async createLoad(weight, capacity) {
        try {
            const accounts = await this.web3.eth.getAccounts();
            const result = await this.contract.methods
                .createLoad(weight, capacity)
                .send({ from: accounts[0], gas: 200000 });

            return {
                loadId: result.events.LoadCreated.returnValues.loadId,
                transactionHash: result.transactionHash
            };
        } catch (error) {
            console.error('Error creating load on blockchain:', error);
            throw error;
        }
    }

    async updateLoad(loadId, weight, capacity) {
        try {
            const accounts = await this.web3.eth.getAccounts();
            const result = await this.contract.methods
                .updateLoad(loadId, weight, capacity)
                .send({ from: accounts[0], gas: 200000 });

            return {
                transactionHash: result.transactionHash
            };
        } catch (error) {
            console.error('Error updating load on blockchain:', error);
            throw error;
        }
    }

    async getLoad(loadId) {
        try {
            const result = await this.contract.methods
                .getLoad(loadId)
                .call();

            return {
                weight: result.weight,
                capacity: result.capacity,
                isActive: result.isActive
            };
        } catch (error) {
            console.error('Error getting load from blockchain:', error);
            throw error;
        }
    }
}

module.exports = new BlockchainService(); 