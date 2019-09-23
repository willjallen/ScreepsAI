var roleResourceHauler = {
  /** @param {Creep} creep **/
  run: function(creep) {


    // V 1.0

    // Load up with energy
    if (creep.carry[RESOURCE_ENERGY] == 0) {
      creep.say("rt");
      // Find storage containers

      // Move to storage containers and load up
      const containerWithEnergy = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (i) => (i.structureType == STRUCTURE_CONTAINER) && (i.store[RESOURCE_ENERGY] > 0)
      });

      if (creep.withdraw(containerWithEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(containerWithEnergy);

      }

    } else {
      creep.say("haul");
      const extensionWithRoom = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (i) => ((i.structureType == STRUCTURE_EXTENSION || i.structureType == STRUCTURE_SPAWN) && i.energy < i.energyCapacity)
      });

      if (extensionWithRoom) {
        if (creep.transfer(extensionWithRoom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(extensionWithRoom);
        }
      } else {
        creep.say("idle");
      }
    }
  }
};

module.exports = roleResourceHauler
