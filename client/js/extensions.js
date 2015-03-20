
Math.randomRange = function( min, max ) {
	return Math.round( Math.random() * (max-min) ) + min
}


Array.shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// the vector2 class is much more useful than the built in pixi point class
PIXI.Point = Vector2;

PIXI.Point.randomRange = function( min, max ) {
	return new PIXI.Point( Math.randomRange( min.x, max.x ), Math.randomRange( min.y, max.y ) );
}

var toPixelSize = function( x, y ) {
	if( y === undefined ) {
		y = x.y;
		x = x.x;
	}
	return new PIXI.Point( x * Killers.config.generator.tile.size.x, y * Killers.config.generator.tile.size.y );
}
