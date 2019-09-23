function initateEmpire(){

  //*************************
  //  General Empire Init  //
  //************************


  memory.empire.empireInitiated = true;

  // Init the empire memory
  memory.empire.rooms = {[]};
  memory.empire.resources = {[]};
  memory.empire.creeps = {[]};

  // Init the pipeline memory
  memory.pipeline.creep_spawn = {[]};
  memory.pipeline.resource_hauling = {[]}; //Computationally the most complex, paradigm everything is baked into memory except resource is dynamic
  memory.pipeline.construction = {[]};
  memory.pipeline.repair = {[]};

  //*************************
  //  General Empire Init  //
  //************************


}

function updateEmpireConstants(){




  //** Empire General Stats **//


  //** Empire Resource Stats **//


  //** Empire Creep Stats **//

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


  memory.empire.stats.creeps.total_workers = totalWorkers;
  memory.empire.stats.creeps.worker_energy_harvester = workerEnergyCollectors;
  memory.empire.stats.creeps.worker_builder = workerStockpileBuilders;
  memory.empire.stats.creeps.worker_room_upgrader = workerRoomUpgrader;
  memory.empire.stats.creeps.worker_structure_repairer = workerStructureRepairer;
  memory.empire.stats.creeps.worker_resource_hauler = workerResourceHauler;


}


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

    // HomeRoom needs to upgrade as fast as possible





  };
}
module.exports = empireTask
