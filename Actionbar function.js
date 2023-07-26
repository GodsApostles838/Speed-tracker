
function calculateDistance(loc1, loc2) {
    const dx = loc1.x - loc2.x;
    const dy = loc1.y - loc2.y;
    const dz = loc1.z - loc2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
  
  function calculateSpeed(loc1, loc2, tickRate) {
    const distanceInBlocks = calculateDistance(loc1, loc2);
    const secondsPerTick = 1 / 20; 
    const speedBlocksPerSecond = distanceInBlocks / (tickRate * secondsPerTick);
    return speedBlocksPerSecond;
  }
  
  const playerLastPositions = new Map();
  
  system.runInterval(() => {
    const players = world.getPlayers();
  
    for (let player of players) {
      const lastPosition = playerLastPositions.get(player);
      const currentPosition = player.location;
  
      if (!lastPosition) {
        playerLastPositions.set(player, currentPosition);
        player.onScreenDisplay.setActionBar("Speed: 0 blocks per second\n");
        continue;
      }
  
      const tickRate = 10; 
      const speed = calculateSpeed(lastPosition, currentPosition, tickRate);
      let speedDisplay = ""; 
  
      
      if (speed < 10) {
        if (speed > 6) {
          speedDisplay = `Speed: §aFast §b${speed.toFixed(2)}§r blocks per second\n`;
        } else if (speed > 3) {
          speedDisplay = `Speed: §eAverage: §b${speed.toFixed(2)}§r blocks per second\n`;
        } else {
          speedDisplay = `Speed: §cSlow: §b${speed.toFixed(2)}§r blocks per second\n`;
        }
      } else if (speed >= 10 && speed <= 15) {
        speedDisplay = `Speed: §5Super Fast: §b${speed.toFixed(2)}§r blocks per second\n`;
      } else if (speed > 15 && speed <= 25) {
        speedDisplay = `Speed: §6God Speed: §b${speed.toFixed(2)}§r blocks per second\n`;
      } else {
        speedDisplay = `Speed: §cRidiculously Fast: §b${speed.toFixed(2)}§r blocks per second\n`;
      }
  
      player.onScreenDisplay.setActionBar(speedDisplay);
      playerLastPositions.set(player, currentPosition);
    }
  }, 10); 
  
