
var Killers = Killers || {};

var Generator = function() {
	this.reset();
}

Generator.prototype.reset = function() {
	this.activeBuildings = [];
	this.latestBuilding = null;
}

Generator.prototype.start = function() {
	this.reset();
}

Generator.prototype.update = function() {
	var numBuildings = Killers.config.generator.maxActiveBuildings - this.activeBuildings.length;
	for( var i = 0; i < numBuildings; ++i ) {
		var building = new Building();
		building.generate();
		this.activeBuildings.push( building );
		console.log( this.activeBuildings.length );

		if( this.latestBuilding !== null ) {
			var alleySize = Killers.config.generator.alley.randomAlleySizeInPixels();
			building.sprite.position.x = this.latestBuilding.sprite.position.x + this.latestBuilding.size.x * Killers.config.generator.tile.size.x + alleySize;
		}
		else {
			console.log( 'zed' );
			building.sprite.position.x = 0;
		}

		this.latestBuilding = building;
	}

	var i = this.activeBuildings.length;
	while( --i >= 0 ) {
		var building = this.activeBuildings[i];
		if( building.update() ) {
			this.activeBuildings.splice(i,1);
		}
	}
}

Generator.prototype.swapTextures = function() {
	for( var i = 0; i < this.activeBuildings.length; ++i ) {
		var building = this.activeBuildings[i];
		building.destroy();
	}

	this.reset();
}
