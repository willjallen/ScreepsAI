function initateEmpire(homeRoom){

  //*************************
  //  General Empire Init  //
  //************************

  memoryObj = Game.rooms[homeRoom].memory;
  memoryObj.empire.empireInitiated = true;

  // Init the empire memory
  memoryObj.empire.rooms = {[]};
  memoryObj.empire.resources = {[]};
  memoryObj.empire.creeps = {[]};

  // Init the pipeline memory
  memoryObj.pipeline.creep_spawn = {[]};
  memoryObj.pipeline.resource_hauling = {[]}; //Computationally the most complex, paradigm everything is baked into memory except resource is dynamic
  memoryObj.pipeline.construction = {[]};
  memoryObj.pipeline.repair = {[]};

  //*************************
  //  General Empire Init  //
  //************************


}

//empire constants or something
var totalWorkers = 0;
var workerEnergyCollectors = 0;
var workerStockpileBuilders = 0;
var workerRoomUpgrader = 0;
var workerStructureRepairer = 0;
var workerResourceHauler = 0;

for(const name in Game.creeps) {
      var creep = Game.creeps[name];
      if (creep.memory.type == 'worker'){
        totalWorkers++;
        if(creep.memory.role == 'energy_collector'){
          workerEnergyCollectors++;
        }
        if(creep.memory.role == 'stockpile_builder'){
          workerStockpileBuilders++;
        }
        if(creep.memory.role == 'room_upgrader'){
          workerRoomUpgrader++;
        }
        if(creep.memory.role == 'structure_repairer'){
          workerStructureRepairer++;
        }
        if(creep.memory.role == 'resource_hauler'){
          workerResourceHauler++;
        }
      }

}


room.memory.totalWorkers = totalWorkers;
room.memory.workerEnergyCollectors = workerEnergyCollectors;
room.memory.workerStockpileBuilders = workerStockpileBuilders;
room.memory.workerRoomUpgraders = workerRoomUpgrader;
room.memory.workerStructureRepairers = workerStructureRepairer;
room.memory.workerResourceHaulers = workerResourceHauler;



var empireTask = {
  run: function(homeRoom){
    // This is the heart of the whole thing
    // Depending on reources available & progression, make decisions about spawning, harvesting, hauling, expanding & reparing
    // Sub room-modules will take care of details, empire is for designation only
    //
    //

    //Empire initiated?
    if(!Game.rooms[homeRoom].memory.empire.empireInitiated){
      initiateEmpire(homeRoom);
    }


  };
}
module.exports = empireTask
