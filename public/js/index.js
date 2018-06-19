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
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.emit('createMessage',{
  from: 'Andrew',
  text: 'hi, what\'s up?'
},function(data){
  console.log('Got it!', data);
})

// socket.on('newEmail', function(email){
//   console.log('New email', email);
// });

socket.on('disconnect', function(){
  console.log('Disconnect from server');
});

jQuery('#msgform').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'user',
    text: jQuery('#m').val()
  }, function(){

  })
})
