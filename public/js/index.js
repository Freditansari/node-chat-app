
var socket = io();
socket.on('connect', function () {


    socket.emit('newUserLoggedIn', {
        userName: Math.random().toString(36).substr(2, 9)
    });
    // socket.emit('createMessage',
    // {
    //     from: 'frank', 
    //     message: 'Hi'
    // },
    // function (data) {
    //     console.log('got it ', data);
    // });

//   socket.emit('createEmail',{
//       to: 'jen@example.vom',
//       text: 'hey this is fredy'
//   });
//   socket.emit('createMessage', {
//       "from":"client@gmail.com",
//       "message":"Hello there, I need a refund on my purchase of how to do socket.io book"
//     });
})

socket.on('disconnect',function (){
  console.log('a client is disconnected from server');
});



//listener
// socket.on('newEmail', function(email){
//     console.log('new email',email);
//   });

socket.on('newMessage', function(receivedMessage){
    console.log(receivedMessage);
    var li = jQuery('<li></li>');
    li.text(`${receivedMessage.from}: ${receivedMessage.text}`);

    jQuery('#messages').append(li);
});

socket.on('welcomeMessage', function(receivedWelcomeMessage){
    console.log(receivedWelcomeMessage);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage',
    {
        from: 'User', 
        text: jQuery('[name=message').val()
    },
    function (data) {
        console.log('got it ', data);
    });

});

    var locationButton = jQuery('#send-location');
    locationButton.on('click', function(){
        // debugger
        
        if (!navigator.geolocation){
            return alert('geolocation is not supported')
        }
    
        navigator.geolocation.getCurrentPosition(function(position){
                console.log(position);
                // socket.emit('createMessage', {
                //     text: `your position is at : lat : ${position.coords.latitude}, lon : ${position.coords.longitude}`,
                //     from: 'Server'
                // }, function(response){
                //     console.log(response);
                // });
                 socket.emit('createLocationMessage', {
                     lat : position.coords.latitude,
                     lon : position.coords.longitude,
                     from: 'Server'
                }, function(response){
                    console.log(response);
                });

            },
        function(){
            alert('unable to fetch location')
        });
    });


