//nodejs path
const path = require('path');
const express = require('express');
const socketio = require('socket.io');

//requried to serve socket
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

//needed for socket
var server = http.createServer(app);
var io= socketio(server);

//to serve public path html pages
app.use(express.static(publicPath));

/**this shows a connection on server
 * the event is built in from socket.io
 */

 //this is a listener exampple
io.on('connection', (socket)=>{
    console.log('new user connected');


 



    socket.emit('newMessage', 
    {
        "from": "admin@babu.com",
         "text":"hi you\'re connected to support @babu.com, what can I help you with?",
         "createdAt":Date.now()
    });

    socket.on('newUserLoggedIn',(welcomeMessage)=>{
        console.log(welcomeMessage);
        socket.broadcast.emit('welcomeMessage',{
            userName: "welcome to chat room "+ welcomeMessage.userName
        });

        //these lines is for broadcasting messages. the drawback is that the message are broadcasted to everyone including sender
        // io.emit('newMessage', {
        //    from: createdMessage.from,
        //    text: createdMessage.message,
        //     createdAt: Date.now()
        // });

        //this one broadcast to everyone but the sender
        // socket.broadcast.emit('newMessage',{
        //     from: createdMessage.from,
        //     text: createdMessage.message,
        //     createdAt: Date.now()
        // })
    });



    //event acknowledgement examples
    // socket.on('createMessage', (createdMessage,)=>{
    //     console.log(createdMessage);
    // });
    //from these lines to below lines

    socket.on('createMessage', (createdMessage,callback)=>{
        io.emit('newMessage', createdMessage);
        callback('received at: '+ Date.now());
        
    });
    



    //listen to disconnect built in event and write down what's happening
    socket.on('disconnect', (socket)=>{
        console.log('a client disconnected from our server')
    });
});

//need to find the proper event
// io.on('disconnect', (socket)=>{
//     console.log('a user disconnected');
// });
// app.listen(port, () => {
//   console.log(`Server is up on ${port}`);
// });
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});