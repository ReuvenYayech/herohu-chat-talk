var express = require('express');
var socket = require('socket.io');
var msgService = require('./msg_service.js');
// App setup
var app = express();

// setup ports
app.set('port', (process.env.PORT || 5000));

// server listens in on port
var server = app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

  socket.on('notify', function(data){
        socket.broadcast.emit('notify', data);
    });
    // Handle chat event
    socket.on('chat', function(data){
        data.socket_id = socket.id;
    msgService.postMsg(data,function(listMsg){
       data = JSON.parse(listMsg);
        io.sockets.emit('chat', data);
      });
    });

 // Handle load event
  socket.on('loadmsg', function(){
       msgService.getMsg(function(listMsg){
        io.sockets.emit('loadmsg', JSON.parse(listMsg));
      });
    });

});