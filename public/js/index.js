var socket = io();
socket.on('connect', function(){
  console.log('Connected to server');
});

socket.on('newMessage', function(message){
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('ul#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url)
  li.append(a);
  jQuery('ul#messages').append(li);
})

socket.on('disconnect', function(){
  console.log('Disconnect from server');
});

jQuery('#msgform').on('submit',function(e){
  e.preventDefault();
  var msgInput = jQuery('#m');
  socket.emit('createMessage', {
    from: 'user',
    text: msgInput.val()
  }, function(){
    msgInput.val('');

  })
})

var locationBtn = jQuery('#geolocation');
locationBtn.on('click', function(){
  if(!navigator.geolocation){
    return alert('geolocation not supported by your browser');
  }
  locationBtn.attr('disabled','disabled').text('Share location...');
  navigator.geolocation.getCurrentPosition(function(position){
    locationBtn.removeAttr('disabled','disabled').text('Share location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    console.log(position);
  }, function(){
    locationBtn.removeAttr('disabled','disabled').text('Share location');
    alert('Unable to get your location');
  })
})
