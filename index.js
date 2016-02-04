'use strict';

var express = require('express');

var http = require('http');

var socketIO = require('socket.io');

var app = express();

var server = http.Server(app);

var io = socketIO(server);

app.get('/', function(req, res) {
	// res.sendFile(__dirname + '/index.html');
	res.sendfile('index.html');
});

io.on('connection', function (socket) {
	socket.broadcast.emit('hi');
	console.log('a user connected.');

	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function() {
		console.log('user disconnected.');
	});
})

server.listen(3000, function() {
	console.log('listening on 0.0.0.0:3000 ...');
});