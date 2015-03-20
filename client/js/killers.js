
var Killers = Killers || {};

Killers.App = function() {
	this.stage = new PIXI.Stage();
	this.generator = new Generator();
}

Killers.App.prototype.start = function() {
	Killers.app = this;
	this.setupRenderer();

	this.generator.start();
}

Killers.App.prototype.setupRenderer = function() {
	this.renderer = new PIXI.autoDetectRenderer( Killers.config.stageSize.x, Killers.config.stageSize.y );
	this.renderer.view.id = 'view';
	$('#stage').append( this.renderer.view );

	var _this = this;
	var animate = function() {
		requestAnimFrame( animate );
		_this.update();
		_this.renderer.render( _this.stage );
	}

	requestAnimFrame( animate );
}

Killers.App.prototype.DEBUG_ForceDraw = function() {
	this.renderer.render( this.stage );
}

Killers.App.prototype.update = function() {
	this.generator.update();
}

Killers.App.prototype.swapTextures = function() {
	Killers.Rooms.swapDefTextures();
	this.generator.swapTextures();
}
