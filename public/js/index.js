var socket = io();
socket.on('connect', function(){
  console.log('Connected to server');

  // socket.emit('createEmail',{
  //   to: 'John@example.com',
  //   text:'hey, what\'s up?'
  // });

  // socket.emit('createMessage',{
  //   to: 'Smith',
  //   text:'hi,how are you?'
  // });
});

// socket.on('welcomeMessage', function(message){
//   console.log('Message from Admin', message);
// });

socket.on('newMessage', function(message){
  console.log('New Message', message);
});


// socket.on('newEmail', function(email){
//   console.log('New email', email);
// });

socket.on('disconnect', function(){
  console.log('Disconnect from server');
});
