const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
res.sendFile('index.html');
});

io.on('connection', (socket) => {
  console.log('new user connected');


socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome new user to join the chat room',
    createdAt: new Date().getTime()
  })
  

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

  socket.on('createMessage',(message) => {
    console.log('Message created',message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

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
