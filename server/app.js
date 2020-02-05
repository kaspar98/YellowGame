var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

io.on('connection', function(socket){
  console.log('User has connected');
});

http.listen(14000, function(){
  console.log('Listening on *:14000');
});
