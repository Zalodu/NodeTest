var http = require("http");
var fs = require("fs");
var io = require("socket.io");
var chat = require("./htdocs/chat.js");
var controller = require("./htdocs/controller.js");

var prePath = "htdocs";
var port = 20000;

console.log("Server started");

function serverCode(request,response)
{
    console.log("Client connected");
    
    var successFunc = function(data,type)
    {
        response.writeHead(200,{ "Content-Type":type });
        response.write(data);
        response.end();
    };
    
    var errorFunc = function(data)
    {
        response.writeHead(404,{ "Content-Type":"text/html" });
        response.write("File not found");
        response.end();
    };
    if (request.url == "/")
        getFile("/index.html", successFunc, errorFunc);
    else
        getFile(request.url, successFunc, errorFunc);
}

function getFile(url, success, error)
{
    url = prePath + url;
    console.log(url);
    fs.exists(url,function(exists){
        if (exists)
        fs.readFile(url,function (err,data) {
            if (err)
                error(err);
            else
            {
                var type = "text/html";
				var ext = url.split(".").pop();
				
                if (ext == "css")
                    type = "text/css";
				
				else if (ext == "js")
                    type = "text/javascript";
				
                success(data, type);
            }
        });
        else{
            console.error("File not found: " + url);
            error(404);
        }
    });
}

var server = http.createServer( serverCode );

server.listen(port);
var socketServer = io.listen(server);
chat.init(socketServer);