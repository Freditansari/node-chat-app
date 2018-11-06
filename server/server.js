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
io.on('connection', (socket)=>{
    console.log('new user connected');
    
    socket.on('disconnect', (socket)=>{
        console.log('a client disconnected from our server')
    });
});

//need to find the proper event
io.on('disconnect', (socket)=>{
    console.log('a user disconnected');
});
// app.listen(port, () => {
//   console.log(`Server is up on ${port}`);
// });
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});