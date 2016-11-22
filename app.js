var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/client/production'));
var main = require('./server/app');

app.use('/server',main);

io.sockets.on('connection',function(socket){
    socket.on("send_user",function(data){
        socket.user_name = data;
    });
    socket.on("send_message",function(data){
        io.sockets.emit("res_chat",{
            _user : socket.user_name,
            _msgContent : data
        });
    });
});
app.set('port',(process.env.PORT || 3000));
app.listen(app.get('port'),function(){
    console.log("Server is running at :", app.get('port'));
})
