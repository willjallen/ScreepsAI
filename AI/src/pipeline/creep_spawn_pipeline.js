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

function addCreep(creepType){
  // Based on the type given, create the best possible creep given room extension energy
}

var creepSpawnPipeline = {
  run: function(){



  };
}
module.exports = creepSpawnPipeline
