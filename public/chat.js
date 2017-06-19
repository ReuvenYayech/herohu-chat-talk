// Make connection
var socket = io.connect();

// Query DOM
var message = document.getElementById('message'),
      userName = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');
      notify = document.getElementById('notify');

// Emit events
window.addEventListener("load", function() { 
    //your code to run since DOM is loaded and ready


    socket.emit('loadmsg');
},false);

btn.addEventListener('click', function(){
var param = {
        message: message.value,
        userName: userName.value
    };

    socket.emit('chat', param);
    socket.emit('notify',param);

    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', userName.value);
});

// Listen for events
socket.on('loadmsg', function(data){
    output.innerHTML = ""; 
     for (var key in data) {
         if (data.hasOwnProperty(key)) {
             var element = data[key];
              output.innerHTML += '<p><strong>' + element.UserName + ': </strong>' + element.MessageText + '</p>';
         }
     }
});

socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.UserName + ': </strong>' + data.MessageText+ '</p>';

});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('notify', function(notify){
    notifyMe(notify);
});

function notifyMe(notify) { 

var current = 'User: ' +notify.userName +' Send : '+ notify.message;

  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check if the user is okay to get some notification
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(current);
  }

  // Otherwise, we need to ask the user for permission
  // Note, Chrome does not implement the permission static property
  // So we have to check for NOT 'denied' instead of 'default'
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {

      // Whatever the user answers, we make sure we store the information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }

      // If the user is okay, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(current);
      }
    });
  }

  // At last, if the user already denied any notification, and you 
  // want to be respectful there is no need to bother him any more.
}