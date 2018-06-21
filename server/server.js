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
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

let users = new Users();

app.use(express.static(publicPath));

app.get('/', (req, res) => {
res.sendFile('index.html');
});

io.on('connection', (socket) => {
  console.log('new user connected');

socket.on('join', (params, callback) => {
  if(!isRealString(params.name) || !isRealString(params.room)){
    return callback('Name and room are required.');
  }
  socket.join(params.room);
  users.removeUser(socket.id);
  users.addUser(socket.id, params.name, params.room);
  io.to(params.room).emit('updateUserList', users.getUsersList(params.room));
  socket.emit('newMessage', generateMessage('Admin', `${params.name}, Welcome to ${params.room} chat room`));
  socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined the chat.`));
  callback();
})

socket.on('createMessage',(message, callback) => {
    io.emit('newMessage', generateMessage(message.from,message.text));
  });

socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUsersList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});


server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})
