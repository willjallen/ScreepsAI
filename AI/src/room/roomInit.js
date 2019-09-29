// 1. Starter room init (if starter room)
// 2. Room infastructure init [roomType] (Resources, baked paths, roads, collectors, storages)

  // ## Resources ##
    // (1). Find all sources ✓
      // (1a). Find maximum number of workers & destination of each worker spot ✓

  // ## Main Highway & Path Baking ##
    // (1). Resource Path Baking
      // (1a). Save pathway between energy sources to room.memory.mapStorage.interResourcePath
    // (2). Hauler Path Baking
      // (2a).  Save pathway between energy sources & designated storage to room.memory.mapStorage.haulerResourcePath
    // (3). Save pathway between exits to room.memory.mapStorage.highway [highway.E.W = East -> West]


    var roomInitTask = {
      /** @param {Room} room **/
      run: function(room) {

        // ## Resources ##

        room.memory.energySources = [{}];

        // Find each source
        sources = room.find(FIND_SOURCES);
        for(energySource in sources){
          // For every source find the maximum harvesting tiles
          // ###
          // #0# Check Tiles around source
          // ###

          harvestingTiles = [];

          roomTerrain = room.getTerrain();
          // Pictures will be removed later, here for understanding.
          // X##
          // #0#
          // ###
          if(roomTerrain.get(energySource.pos.x, energySource.pos.y) != TERRAIN_MASK_WALL) harvestingTiles.push((energySource.pos.x-1, energySource.pos.y-1));

          // #X#
          // #0#
          // ###
          if(roomTerrain.get(energySource.pos.x, energySource.pos.y) != TERRAIN_MASK_WALL) harvestingTiles.push((energySource.pos.x, energySource.pos.y-1));

          // ##X
          // #0#
          // ###
          if(roomTerrain.get(energySource.pos.x, energySource.pos.y) != TERRAIN_MASK_WALL) harvestingTiles.push((energySource.pos.x+1, energySource.pos.y-1));

          // ###
          // #0X
          // ###
          if(roomTerrain.get(energySource.pos.x, energySource.pos.y) != TERRAIN_MASK_WALL) harvestingTiles.push((energySource.pos.x+1, energySource.pos.y));

          // ###
          // #0#
          // ##X
          if(roomTerrain.get(energySource.pos.x, energySource.pos.y) != TERRAIN_MASK_WALL) harvestingTiles.push((energySource.pos.x+1, energySource.pos.y+1));

          // ###
          // #0#
          // #X#
          if(roomTerrain.get(energySource.pos.x, energySource.pos.y) != TERRAIN_MASK_WALL) harvestingTiles.push((energySource.pos.x, energySource.pos.y+1));

          // ###
          // #0#
          // X##
          if(roomTerrain.get(energySource.pos.x, energySource.pos.y) != TERRAIN_MASK_WALL) harvestingTiles.push((energySource.pos.x-1, energySource.pos.y-1));

          // ###
          // X0#
          // ###
          if(roomTerrain.get(energySource.pos.x, energySource.pos.y) != TERRAIN_MASK_WALL) harvestingTiles.push((energySource.pos.x-1, energySource.pos.y));


          // For every source, count the available harvesting tiles and add worker spots
          availableSpots = harvestingTiles.length;

          var workerSpots = new Array();
          for(var i = 0; i < availableSpots; i++){
            jsons.push({workerSpot: 'Open', tile: harvestingTiles[i]});
          }


          room.memory.energySources.push({source: energySource.id, workers: workerSpots})

        }



    };

    module.exports = roomInitTask
