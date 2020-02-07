var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const MESSAGE_TYPES = [
  'playerJoin',
  'playerList',
  'gameState',
  'countdown',
  'guessSubmitted'
];

const broadcastMessage = (messageType, socket) => {
  return message => {
    socket.broadcast.emit(messageType, message);
    if (messageType !== 'drawBoard') {
      console.log(messageType + ':', message);
    }
  }
};

const registerMessageHandlers = socket => {
  for (let i = 0; i < MESSAGE_TYPES.length; i++) {
    const messageType = MESSAGE_TYPES[i];
    console.log('Registering message type', messageType);
    socket.on(messageType, broadcastMessage(messageType, socket));
  }
};

app.use(express.static('react-app'))

io.on('connection', socket => {
  console.log('User has connected');

  registerMessageHandlers(socket);

  socket.on('hostGame', () => {
    socket.join('hostGame');
  });

  socket.on('drawBoard', message => {
    io.to('hostGame').emit('drawBoard', message);
  });
});

http.listen(14000, function(){
  console.log('Listening on *:14000');
});
