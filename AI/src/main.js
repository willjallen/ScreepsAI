// CREEP ROLES //
var roleEnergyCollector = require('creep.worker.energy_collector');
var roleStockpileBuilder = require('creep.worker.stockpile_builder');
var roleRoomUpgrader = require('creep.worker.room_upgrader');
var roleStructureRepairer = require('creep.worker.structure_repair');
var roleResourceHauler = require('creep.worker.resource_hauler');

// ROOM TASKS //
var roomTask = require('room.room');

const currRoom = Game.rooms['E42N26'];

// IDEALLY: This file shouldnt really have any intrinsic function other than executing all the modules in the correct order



module.exports.loop = function() {


  // Update all the room constants
  // Update the empire Constants

  // Run empire decision maker

  // Update pipeline
  // Update rooms
  // Update creeps






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
