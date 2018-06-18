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

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })


});




server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})
