var socket = io();
socket.on('connect', function(){
  console.log('Connected to server');

  socket.emit('createEmail',{
    to: 'John@example.com',
    text:'hey, what\'s up?'
  });

  socket.emit('createMessage',{
    to: 'Smith',
    text:'hi,how are you?'
  });
});

socket.on('newMessage', function(newMessage){
  console.log('New Message', newMessage);
});


socket.on('newEmail', function(email){
  console.log('New email', email);
});

socket.on('disconnect', function(){
  console.log('Disconnect from server');
});
