var roleStructureRepairer = {
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

      const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: object => (object.hits < (object.hitsMax > 1000000 ? 100000 : object.hitsMax))
      });



      if (target) {
        creep.say("rp")
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
    }
  }
};

module.exports = roleStructureRepairer
