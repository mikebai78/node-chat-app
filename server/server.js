const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

const {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
res.sendFile('index.html');
});

io.on('connection', (socket) => {
  console.log('new user connected');


socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat message'));

socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));

  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text:'hey, what\'s up?',
  //   createdAt: 12354
  // });
  //
  // socket.emit('newMessage', {
  //   from: 'sara',
  //   text:'great day',
  //   createdAt: 1235666
  // });

  // socket.on('createEmail',(newEmail) => {
  //   console.log('Email created',newEmail);
  // });

  socket.on('createMessage',(message, callback) => {
    console.log('Message created',message);
    io.emit('newMessage', generateMessage(message.from,message.text));
    callback('this is from server');
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})
