var io;

function init(ioModule){
    io = ioModule;
    
    io.on("connection", connection);
    
}

function connection(socket)
{
    console.log("User connected");
    io.emit("eventmessage", {"color":"green", "message":"User connected"});
	
	socket.on("input", input);
    socket.on("disconnect", disconnection);
}
function disconnection(socket)
{
    console.log("User disconnected");
    io.emit("eventmessage", {"color":"red", "message":"User disconnected"});
}
function input(data)
{
	io.emit("input", {"x1":data.x1, "y1":data.y1, "x2":data.x2, "y2":data.y2, "arm":data.arm});
}


module.exports.init = init;