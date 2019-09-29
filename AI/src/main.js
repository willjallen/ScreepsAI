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
