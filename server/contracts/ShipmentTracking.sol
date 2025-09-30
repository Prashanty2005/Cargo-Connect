// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ShipmentTracking {
    struct Load {
        uint256 weight;
        uint256 capacity;
        bool isActive;
    }

    mapping(uint256 => Load) public loads;
    uint256 public loadCount;

    event LoadCreated(uint256 indexed loadId, uint256 weight, uint256 capacity);
    event LoadUpdated(uint256 indexed loadId, uint256 weight, uint256 capacity);

    function createLoad(uint256 _weight, uint256 _capacity) public {
        loadCount++;
        loads[loadCount] = Load({
            weight: _weight,
            capacity: _capacity,
            isActive: true
        });

        emit LoadCreated(loadCount, _weight, _capacity);
    }

    function updateLoad(uint256 _loadId, uint256 _weight, uint256 _capacity) public {
        require(loads[_loadId].isActive, "Load does not exist");
        
        loads[_loadId].weight = _weight;
        loads[_loadId].capacity = _capacity;

        emit LoadUpdated(_loadId, _weight, _capacity);
    }

    function getLoad(uint256 _loadId) public view returns (uint256 weight, uint256 capacity, bool isActive) {
        Load memory load = loads[_loadId];
        return (load.weight, load.capacity, load.isActive);
    }
} 