//////////////////////////////// WEB SERVER SETUP ////////////////////////////////

// Include static file webserver library...
var _mStatic = require('node-static');

// Include HTTP server library...
var _mHTTP = require('http');

// Assume we're running on the Heroku Cloud...
var _mPort = process.env.PORT;
var _mDirectory = __dirname + '/public';

// If we're NOT on Heroku, readjust Port/Directory for localhost...
if (typeof _mPort === undefined || !_mPort) {
    _mPort = 8080;
    _mDirectory = './public';
}

// Set up a static webserver that will delivery files from the filesystem
var _mFileServer = new _mStatic.Server(_mDirectory);

// Construct an HTTP server that gets files from the fileserver
var _mApp = _mHTTP.createServer(function (request, response) {
                                    request.addListener('end',
                                        function () {
                                            _mFileServer.serve(request, response);
                                        }
                                    ).resume();
                                }
                             ).listen(_mPort);

console.log('SERVER IS RUNNING...');



//////////////////////////////// WEB SOCKET SETUP ////////////////////////////////

var _mIO = require('socket.io').listen(_mApp);

_mIO.sockets.on('connection', function (_Socket) {
    function log() {
        var _Array = ['*** Server Log Message: '];
        for (var i = 0; i < arguments.length; i++) {
            _Array.push(arguments[i]);
            console.log(arguments[i]);
        }
        _Socket.emit('log', _Array);
        _Socket.broadcast.emit('log', _Array);
    }

    log('A website CONNECTED to the server.');

    _Socket.on('disconnect', function () {
        log('A website DISconnected from the server.');
    });
});