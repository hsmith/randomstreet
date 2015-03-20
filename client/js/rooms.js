var Killers = Killers || {};

var Room = function( name, size, img, isStairs, exits ) {
	this.name = name;
	this.size = size;
	this.img = img;
	this.isStairs = isStairs;
	this.exits = exits;
}

Killers.Rooms = {};
Killers.Rooms.stairs = new Room( 'Stairwell'	, new PIXI.Point(1,1),	'img/debug/stairway.png', 	true,	[ Direction.EAST, Direction.NORTH ] );
Killers.Rooms.debugDefinitions = [
		new Room( 'Study'		, new PIXI.Point(1,1), 	'img/debug/1x1.png',		false,	[ Direction.EAST, Direction.WEST ] )
	  , new Room( 'EmptyRoom'	, new PIXI.Point(2,1),	'img/debug/2x1.png', 		false,	[ Direction.EAST, Direction.WEST ] )
	  , new Room( 'DiningRoom'	, new PIXI.Point(2,2),	'img/debug/2x2.png', 		false,	[ Direction.EAST, Direction.WEST ] )
	  , new Room( 'Bedroom'		, new PIXI.Point(3,2),	'img/debug/3x2.png', 		false,	[ Direction.EAST, Direction.WEST ] )
	];

Killers.Rooms.texturedDefinitions = [
		new Room( 'Study'		, new PIXI.Point(1,1), 	'img/rooms/1x1.png',		false,	[ Direction.EAST, Direction.WEST ] )
	  , new Room( 'EmptyRoom'	, new PIXI.Point(2,1),	'img/rooms/2x1.png', 		false,	[ Direction.EAST, Direction.WEST ] )
	  , new Room( 'DiningRoom'	, new PIXI.Point(2,2),	'img/rooms/2x2.png', 		false,	[ Direction.EAST, Direction.WEST ] )
	  , new Room( 'Bedroom'		, new PIXI.Point(3,2),	'img/rooms/3x2.png', 		false,	[ Direction.EAST, Direction.WEST ] )
	];

Killers.Rooms.definitions = Killers.Rooms.texturedDefinitions;


Killers.Rooms.getRandomDefinition = function() {
	var index = Math.randomRange( 0 , Killers.Rooms.definitions.length-1 );
	return Killers.Rooms.definitions[ index ];
}

Killers.Rooms.getRandomizedDefinitions = function() {
	var result = Killers.Rooms.definitions.slice(0);
	return Array.shuffle( result );
}

Killers.Rooms.getRandomizedSingleStoryDefinitions = function() {
	var result = [ Killers.Rooms.definitions[0], Killers.Rooms.definitions[1] ];
	return Array.shuffle( result );
}

Killers.Rooms.createRoomSprite = function( roomDef ) {
	var texture = PIXI.Texture.fromImage( roomDef.img );
	var sprite = new PIXI.Sprite( texture );
	return {
		texture: texture
	  , sprite: sprite
	  , definition: roomDef
	};
}

Killers.Rooms.usingDebugTextures = false;
Killers.Rooms.swapDefTextures = function() {
	Killers.Rooms.usingDebugTextures = !Killers.Rooms.usingDebugTextures;
	if( Killers.Rooms.usingDebugTextures ) {
		Killers.Rooms.definitions = Killers.Rooms.debugDefinitions;
	}
	else {
		Killers.Rooms.definitions = Killers.Rooms.texturedDefinitions;
	}
}
