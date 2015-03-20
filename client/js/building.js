
var Building = function() {
	this.sprite = new PIXI.DisplayObjectContainer();
	Killers.app.stage.addChild( this.sprite );

	this.tiles = [];
	this.rooms = [];
}

Building.prototype.generate = function( startingSide ) {
	console.log( 'generate building' );
	var curpos = new PIXI.Point(0,0);

	// initialize the tiles //
	this.size = Killers.config.generator.building.randomBuildingSize();
	this.tiles = [];
	this.rooms = [];

	for( var x = 0; x < this.size.x; ++x ) {
		this.tiles[x] = [];
	}

	// completely fill the building //
	while( curpos.y < this.size.y ) {
		while( curpos.x < this.size.x ) {
			var roomplaced = false;

			var placedRoom = this.tryPlaceRandomRoom( curpos );
			if( placedRoom != null ) {
				roomplaced = true;
				curpos.x += placedRoom.size.x;
			}

			if( !roomplaced )
			{
				curpos.x++;
			}
		}

		curpos.y++;
		curpos.x = 0;
	}

	// create stairs for each floor except the top floor //
	for( var y = 0; y < this.size.y-1; ++y ) {
		var numStairs = Math.randomRange( Killers.config.generator.building.minStairPerFloor, Killers.config.generator.building.maxStairPerFloor );
		for( var i = 0; i < numStairs; ++i ) {
			var stairPos = new PIXI.Point( Math.randomRange( 0, this.size.x-1 ), y );
			var deadroom = this.tiles[stairPos.x][stairPos.y];

			this.removeRoom( deadroom );

			this.placeRoom( Killers.Rooms.stairs, stairPos );

			if( deadroom !== undefined ) {
				var startPos = deadroom.pos;
				var roomDef = deadroom.definition;

				for( var roomy = startPos.y; roomy < startPos.y + roomDef.size.y; ++roomy ) {
					for( var roomx = startPos.x; roomx < startPos.x + roomDef.size.x; ++roomx ) {
						var placePos = new PIXI.Point( roomx, roomy );
						this.tryPlaceRandomRoom( placePos );
					}
				}
			}
		}
	}

	// for all the rooms create their sprites and add them to the stage //
	for( var i = 0; i < this.rooms.length; ++i ) {
		var room = this.rooms[i];
		this.addSpritesForRoom( room );
	}
}

Building.prototype.addSpritesForRoom = function( room ) {
	room.texture = PIXI.Texture.fromImage( room.definition.img );
	room.sprite = new PIXI.Sprite( room.texture );
	room.sprite.anchor = new PIXI.Point( 0, 1 );
	var xpos = room.pos.x * Killers.config.generator.tile.size.x;
	var ypos = Killers.config.stageSize.y - ( room.pos.y * Killers.config.generator.tile.size.y );
	room.sprite.position = new PIXI.Point( xpos, ypos );
	this.sprite.addChild( room.sprite );
}

Building.prototype.tryPlaceRandomRoom = function( pos ) {
	var availRooms = Killers.Rooms.getRandomizedDefinitions();
	for( var i = 0; i < availRooms.length; i++ ) {
		var tryRoom = availRooms[i];
		if( this.tryPlaceRoom( tryRoom, pos ) ) {
			return tryRoom;
		}
	}

	return null;
}

Building.prototype.tryPlaceRoom = function( roomDef, pos ) {
	if( this.canPlaceRoom( roomDef, pos ) ) {
		this.placeRoom( roomDef, pos );
		return true;
	}

	return false;
}

Building.prototype.canPlaceRoom = function( roomDef, pos ) {
	if( pos.x + roomDef.size.x > this.size.x ) return false;
	if( pos.y + roomDef.size.y > this.size.y ) return false;


	var self = this;

	for( var y = pos.y; y < pos.y + roomDef.size.y; ++y) {
		for( var x = pos.x; x < pos.x + roomDef.size.x; ++x ) {
			if( y < this.size.y && x < this.size.x ) {
				if( self.tiles[x][y] !== undefined ) return false;
			}
		}
	}

	return true;
}

Building.prototype.placeRoom = function( roomDef, pos ) {
	var roomInstance = { definition: roomDef, pos: pos.clone() };

	var self = this;
	for( var y = pos.y; y < pos.y + roomDef.size.y; ++y) {
		for( var x = pos.x; x < pos.x + roomDef.size.x; ++x ) {
			if( y < this.size.y && x < this.size.x ) {
				self.setTile( roomInstance, x, y );
			}
		}
	};

	this.rooms.push( roomInstance );
	this.addSpritesForRoom( roomInstance );
}

Building.prototype.removeRoom = function( room ) {
	if( room !== undefined ) {
		for( var i = 0; i < this.rooms.length; ++i ) {
			if( this.rooms[i].pos == room.pos ) {
				this.rooms.splice( i, 1 );
				break;
			}
		}

		var startPos = room.pos;
		for( var y = startPos.y; y < startPos.y + room.definition.size.y; ++y) {
			for( var x = startPos.x; x < startPos.x + room.definition.size.x; ++x ) {
				if( y < this.size.y && x < this.size.x ) {
					this.setTile( undefined, x, y );
				}
			}
		};

		this.sprite.removeChild( room.sprite );
	}
}

Building.prototype.setTile = function( roomDef, x, y ) {
	this.tiles[x][y] = roomDef;
}

Building.prototype.destroy = function() {
	Killers.app.stage.removeChild( this.sprite );
}

Building.prototype.update = function() {
	// return true if this building is off screen
	this.sprite.position.x--;
	return this.sprite.position.x < ((this.size.x * Killers.config.generator.tile.size.x)+100) * -1;
}
