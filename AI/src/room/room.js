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

function clearDeadCreeps(){

  for(const creepMem in Memory.creeps){

    if(Game.creeps[creepMem] === undefined){
      // empire clear or something to clear worker spots
     delete Memory.creeps[creepMem];

     var workerSpots = room.memory.energySources.workerSpots;
     for (const i in workerSpots) {
        if(workerSpots[i].workerSpot == creepMem){

          workerSpots[i].workerSpot = 'Open';
        }

       }
    }

  }
}

function updateRoomConstants(room){
  // Update constants for room
  var roomEnergySources;
  var roomMineralSources;
  var roomCreeps;

  roomEnergySources = room.find(FIND_SOURCES);
  roomMineralSources = room.find(FIND_MINERALS);

  roomCreeps = room.find(FIND_CREEPS);

  room.memory.energy_sources = roomEnergySources;
  room.memory.mineral_sources = roomMineralSources;
  room.memory.creeps = roomCreeps;

}


var roomTask = {
  /** @param {Room} room **/
  run: function(room) {

    /***********************/
    //   First time load   //
    /***********************/

    // Each room will get an ideal construction layout, based on pre computations

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


     // CREEP_DEATH
     clearDeadCreeps();


};

module.exports = roomTask
