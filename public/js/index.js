var socket = io();

function scrollToBottom(){
  var messages = jQuery('ul#messages');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function(){
  console.log('Connected to server');
});

socket.on('newMessage', function(message){
  var timestamp = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: timestamp
  });
  jQuery('ul#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message){
  var timestamp = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-template').html();
  var html = Mustache.render(template,{
    url: message.url,
    from: message.from,
    createdAt: timestamp
  });
  jQuery('ul#messages').append(html);
  scrollToBottom();
});

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
    msgInput.val();
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
    });
  }, function(){
    locationBtn.removeAttr('disabled','disabled').text('Share location');
    alert('Unable to get your location');
  })
})
