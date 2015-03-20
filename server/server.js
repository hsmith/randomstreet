var express = require('express')
  , app = express()
  , port = 9090

var staticDir = __dirname + '/../client/';
console.log( 'serving static dir: ' + staticDir );

app.use( express.static( staticDir ) );
app.get( '/', function (req, res) {
        res.redirect("/index.html");
});

app.listen( port );

console.log( 'listening on port ' + port );
