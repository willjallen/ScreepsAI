function initateEmpire(){

  //*************************
  //  General Empire Init  //
  //************************


  memory.empire.empireInitiated = true;


  //*************************
  //   Empire Memory Init  //
  //************************

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




  //*************************
  //  Starting Room Init  //
  //************************
  // Find our starting room, multi room mode is not unlocked until a threshold is met
  startingRoom = Game.rooms[0];
  memory.empire.multiRoom = false;

  return startingRoom

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
  run: function(){
    // This is the heart of the whole thing
    // Depending on reources available & progression, make decisions about spawning, harvesting, hauling, expanding & reparing
    // Sub room-modules will take care of details, empire is for designation only
    //
    //


    if(memory.empire.multiRoom){

    }else{

      //Empire initiated?
      var startingRoom;
      if(!Game.rooms[homeRoom].memory.empire.empireInitiated){
        startingRoom = initiateEmpire(homeRoom);
      }

      //Maybe \/ \/ \/ ????
      // ** This mode of empire is structurally different to facilitate the fastest route to a multi room economy ** //
      // ** A dedicated conversion will take place to handle the transition, once it happens  ** //

      // HomeRoom needs to upgrade as fast as possible

      // ** SPAWNING ** //
      // Spawn with precedent if constants for room are not met
      // ## SPAWNER
     if (startingRoom.memory.totalWorkers < MAX_WORKERS) {
       if(startingRoom.memory.workerEnergyCollectors < MAX_ENERGY_COLLECTORS){
         Pipeline.creep_spawn_pipeline
       } else if(currRoom.memory.workerResourceHaulers < MAX_RESOURCE_HAULER){
         Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], genWorkerName("ResourceHauler"), {memory: {type: 'worker', role: 'resource_hauler'}});
       } else if(currRoom.memory.workerStockpileBuilders < MAX_STOCKPILE_BUILDER){
         Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], genWorkerName("Builder"), {memory: {type: 'worker', role: 'stockpile_builder'}});
       } else if(currRoom.memory.workerRoomUpgraders < MAX_ROOM_UPGRADER){
         Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], genWorkerName("RoomUpgrader"), {memory: {type: 'worker', role: 'room_upgrader'}});
       }  else if(currRoom.memory.workerStructureRepairers < MAX_STRUCTURE_REPAIRER){
         Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], genWorkerName("StructureRepairer"), {memory: {type: 'worker', role: 'structure_repairer'}});
       }



     }
    }




  };
}
module.exports = empireTask
