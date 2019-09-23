// 1. Starter room init (if starter room)
// 2. Room infastructure init [roomType] (Resources, baked paths, roads, collectors & storages)

  // ## Resources ##
    // (1). Find all sources
      // (1a). Find maximum number of workers & destination of each worker spot

  // ## Main Highway & Path Baking ##
    // (1). Resource Path Baking
      // (1a). Save pathway between energy sources to room.memory.mapStorage.interResourcePath
    // (2). Hauler Path Baking
      // (2a).  Save pathway between energy sources & designated storage to room.memory.mapStorage.haulerResourcePath
    // (3). Save pathway between exits to room.memory.mapStorage.highway [highway.E.W = East -> West]
