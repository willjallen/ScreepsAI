var roleRoomUpgrader = {
  /** @param {Creep} creep **/
  run: function(creep) {



    // Load up with energy
    if (creep.carry[RESOURCE_ENERGY] == 0) {
      creep.say("rt");
      // Find storage container
      const containerWithEnergy = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (i) => (i.structureType == STRUCTURE_CONTAINER) && (i.store[RESOURCE_ENERGY] > 0)
      });

      // Move to storage containers and load up
      if (creep.withdraw(containerWithEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(containerWithEnergy);
      }

    } else {
      creep.say("up");
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
  }

};

module.exports = roleRoomUpgrader
