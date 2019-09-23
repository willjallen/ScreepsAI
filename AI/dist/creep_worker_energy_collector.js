var roleEnergyCollector = {

  /** @param {Creep} creep **/
  run: function(creep) {


    /***********************/
    //   First time load   //
    /***********************/



    // Multi spot mining
    if (!creep.memory.energySourceID) {
      creep.memory.firstInit = true;
      var workerSpots = creep.room.memory.energySources.workerSpots;

      for (const i in workerSpots) {
        if (workerSpots[i].workerSpot == 'Open') {

          workerSpots[i].workerSpot = creep.name;
          creep.memory.energySourceID = workerSpots[i].energySourceID;
          return;
        }
      }
    }




    // If we have more to carry
    if (creep.carry[RESOURCE_ENERGY] < creep.carryCapacity) {
      creep.say("hv");
      if (creep.harvest(Game.getObjectById(creep.memory.energySourceID)) == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.getObjectById(creep.memory.energySourceID));
      }
    }
    // Can not carry any more
    else {

      // Find the closest storage depot with *remaining capacity* -> fix w transfer
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
