var roleEnergyCollector = {

  /** @param {Creep} creep **/
  run: function(creep) {

    // Creep will be assigned an energy source on birth & a baked path to the source
    /***********************/
    //   First time load   //
    /***********************/


    /***********************/
    //     Regular Loop     //
    /***********************/

    //** Capacity Check **//
    if (creep.carry[RESOURCE_ENERGY] < creep.carryCapacity) {
      creep.say("hv");
      if (creep.harvest(Game.getObjectById(creep.memory.energySourceID)) == ERR_NOT_IN_RANGE) {
        //TODO: Pre baked path spawn -> energy source
        creep.moveTo(Game.getObjectById(creep.memory.energySourceID));
      }
    }

    //** Capacity Full **//
    else {

      // TODO: Assigned container & path, if no assigned container then auto find (for now)
      const containersWithRoom = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (i) => (i.structureType == STRUCTURE_CONTAINER) && i.store[RESOURCE_ENERGY] < i.storeCapacity
      });
      if (creep.transfer(containersWithRoom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(containersWithRoom);
        creep.say("rt");
      }
    }
  }
};

module.exports = roleEnergyCollector;
