
var Killers = Killers || {};

var GeneratorConfig = function() {
	this.tile = {
		size: new PIXI.Point( 50, 50 )
	};

	this.building = {
		minSize: new PIXI.Point( 4, 8 )
	  , maxSize: new PIXI.Point( 8, 12 )
	  , minStairPerFloor: 1
	  , maxStairPerFloor: 2
	  , randomBuildingSize: function() {
			var self = Killers.config.generator.building;
			return new PIXI.Point( Math.randomRange( self.minSize.x, self.maxSize.x ), Math.randomRange( self.minSize.y, self.maxSize.y ) );
		}
	};

	this.alley = {
		minSize: 1
	  , maxSize: 3
	  , randomAlleySize: function() {
			var self = Killers.config.generator.alley;
			var result = Math.randomRange( self.minSize, self.maxSize );
			return result;
		}
	  , randomAlleySizeInPixels: function() {
			var self = Killers.config.generator.alley;
			var result = self.randomAlleySize() * Killers.config.generator.tile.size.x;
			return result;
		}
	};

	this.maxActiveBuildings = 20;
}


Killers.ConfigData = function() {
	this.stageSize = new PIXI.Point( 800, 600 );
	this.generator = new GeneratorConfig();
}

Direction = {
	NORTH: 0
  , EAST: 1
  , SOUTH: 2
  , WEST: 3
}


Killers.config = new Killers.ConfigData();
