var roleEnergyCollector = require('roles/role.worker/energy_collector');
var roleStockpileBuilder = require('role.worker.stockpile_builder');
var roleRoomUpgrader = require('role.worker.room_upgrader');
var roleStructureRepairer = require('role.worker.structure_repair');
var roleResourceHauler = require('role.worker.resource_hauler');

const currRoom = Game.rooms['E42N26'];

// Constants
const MAX_WORKERS = 30;
const MAX_ENERGY_COLLECTORS = 7;
const MAX_RESOURCE_HAULER = 3;
const MAX_STOCKPILE_BUILDER = 2;
const MAX_ROOM_UPGRADER = 4;
const MAX_STRUCTURE_REPAIRER = 2;

function genWorkerName(role){
  return "Worker-" + role + "-" + Math.floor(Math.random() * 1000)
}

function clearDeadCreeps(){


  for(const creepMem in Memory.creeps){

    if(Game.creeps[creepMem] === undefined){

     delete Memory.creeps[creepMem];

     var workerSpots = Game.rooms['E42N26'].memory.energySources.workerSpots;
     for (const i in workerSpots) {
        if(workerSpots[i].workerSpot == creepMem){

          workerSpots[i].workerSpot = 'Open';
        }

       }
    }

  }
}

function updateRoomConstants(){
  // Update constants for room

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


  Game.rooms['E42N26'].memory.totalWorkers = totalWorkers;
  Game.rooms['E42N26'].memory.workerEnergyCollectors = workerEnergyCollectors;
  Game.rooms['E42N26'].memory.workerStockpileBuilders = workerStockpileBuilders;
  Game.rooms['E42N26'].memory.workerRoomUpgraders = workerRoomUpgrader;
  Game.rooms['E42N26'].memory.workerStructureRepairers = workerStructureRepairer;
  Game.rooms['E42N26'].memory.workerResourceHaulers = workerResourceHauler;

}

function setEnergyNetwork(room){

  // For every energy source, assign 3 harvesters to it & a nearby container

  var energySources = room.find(FIND_SOURCES);


  var jsons = new Array();
  for (const source in energySources){
    for(var i = 0; i < 4; i++){
      jsons.push({workerSpot: 'Open', energySourceID: energySources[source].id});
    }
  }
  room.memory.energySources = {sources: energySources, workerSpots: jsons};
}





module.exports.loop = function() {

  /***********************/
  //   First time load   //
  /***********************/

  // Per room
  for(const room in Game.rooms){
    if(!Game.rooms[room].memory.energy_collector_network_set){
      Game.rooms[room].memory.energy_collector_network_set = true;
      setEnergyNetwork(Game.rooms[room])
    }
  }


  /***********************/
  //   Regular Loop      //
  /***********************/



   // ROOM_CONSTANTS
   updateRoomConstants();
   // RESOURCE_TRACKING
   updateResourceConstants();

   // CREEP_DEATH
   clearDeadCreeps();


   // If we have room for more workers, spawn the collectors first then the builders 550
   // ## SPAWNER
  if (currRoom.memory.totalWorkers < MAX_WORKERS) {
    if(currRoom.memory.workerEnergyCollectors < MAX_ENERGY_COLLECTORS){
      Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], genWorkerName("EnergyCollector"), {memory: {type: 'worker', role: 'energy_collector'}});
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

 //
  for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.type == 'worker'){
          if(creep.memory.role == 'energy_collector'){
            roleEnergyCollector.run(creep);
          }
          if(creep.memory.role == 'stockpile_builder'){
            roleStockpileBuilder.run(creep);
          }
          if(creep.memory.role == 'room_upgrader'){
            roleRoomUpgrader.run(creep);
          }
          if(creep.memory.role == 'structure_repairer'){
            roleStructureRepairer.run(creep);
          }
          if(creep.memory.role == 'resource_hauler'){
            roleResourceHauler.run(creep);
          }
        }


    }
}
