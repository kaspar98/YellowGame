var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const MESSAGE_TYPES = [
  'playerJoin',
  'playerList',
  'gameState',
  'drawBoard',
  'countdown',
  'guessSubmitted'
];

const broadcastMessage = (messageType, socket) => {
  return message => {
    socket.broadcast.emit(messageType, message);
    // console.log(messageType + ':', message);
  }
};

const registerMessageHandlers = socket => {
  for (let i = 0; i < MESSAGE_TYPES.length; i++) {
    const messageType = MESSAGE_TYPES[i];
    console.log('Registering message type', messageType);
    socket.on(messageType, broadcastMessage(messageType, socket));
  }
};

app.get('/', (req, res) => {
  res.send('Server is running!');
});

io.on('connection', socket => {
  console.log('User has connected');

  registerMessageHandlers(socket);
});

http.listen(14000, function(){
  console.log('Listening on *:14000');
});
