var roleStockpileBuilder = {
  /** @param {Creep} creep **/
  run: function(creep) {



    // Load up with energy
    if (creep.carry[RESOURCE_ENERGY] == 0) {
      creep.say("rt");
      // Find storage containers
      //const containers = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER, STRUCTURE_SPAWN}});

      // Move to storage containers and load up
      const containerWithEnergy = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (i) => (i.structureType == STRUCTURE_CONTAINER) && (i.store[RESOURCE_ENERGY] > 0)
      });
      if (creep.withdraw(containerWithEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(containerWithEnergy);
      }

    } else {
      creep.say("bld");
      var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
        filter: (i) => (i.structureType == STRUCTURE_CONTAINER)
      });
      if (!target) {
        target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
      }
      if (target) {
        if (creep.build(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
    }
  }
};

module.exports = roleStockpileBuilder
