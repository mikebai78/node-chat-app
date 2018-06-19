const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

const {generateMessage, generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
res.sendFile('index.html');
});

io.on('connection', (socket) => {
  console.log('new user connected');


socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat message'));

socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));

socket.on('createMessage',(message, callback) => {
    io.emit('newMessage', generateMessage(message.from,message.text));
    callback('this is from server');
  });

socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})
