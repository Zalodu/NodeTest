var io;

function init(ioModule){
    io = ioModule;
    
    io.on("connection", connection);
    
}

function connection(socket)
{
    console.log("User connected");
    io.emit("eventmessage", {"color":"green", "message":"User connected"});
	
	socket.on("message", message);
	socket.on("ping", function() {ping(socket);});
    socket.on("disconnect", disconnection);
}
function disconnection(socket)
{
    console.log("User disconnected");
    io.emit("eventmessage", {"color":"red", "message":"User disconnected"});
}
function message(data)
{
	io.emit("message", {"message":data.message, "name":data.name});
}
function ping(socket)
{
	console.log("pingtest");
	socket.emit("ping", {});
}

module.exports.init = init;