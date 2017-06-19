var http = require("http");
    
  var getMsg = function (callback){

     // do the GET request
var req = http.request({
  "method": "GET",
   "hostname": "chatsocket.somee.com",
   "port": null,
    "path": "/api/chat",
  "headers": {
     "accept": 'application/json'
  }
}, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
   callback(body.toString());
  });
});

req.end();

req.on('error', function(e) {
    console.error(e);
}); 
    };

//post
 var postMsg = function (data,callback){
var req =  http.request({
  "method": "POST",
   "hostname": "chatsocket.somee.com",
   "port": null,
    "path": "/api/chat",
  "headers": {
    "content-type": "application/json"
  }
}, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    callback(body.toString());
  });
});

req.write(JSON.stringify({ user_name: data.userName, message_text: data.message,socket_id: data.socket_id }));
req.end();
 };

module.exports = {
getMsg:getMsg,
postMsg:postMsg
};