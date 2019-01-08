var x;
var bot;
var flag = false;
var Quest , socket;

var audio = new Audio();
audio.src = "sound/notification.mp3";

function myFunction() {
  var x = document.getElementsByClassName("Application-Box");
  for (var i=0;i<x.length;i++){
    if (x[i].style.display === "none") {
      x[i].style.display = "block";
    } else {
      x[i].style.display = "none";
    }
  }
}

function createBot() {
  socket = io.connect('https://kitcoek-bot.herokuapp.com/');
  document.body.style.zoom="75%";
}

function EnterPressed() {
  Quest = document.getElementById("QuestionText").value;
  if(Quest == "") {return;}
  document.getElementById("QuestionText").value = "";
  var para = document.createElement("p1");
  para.appendChild(document.createTextNode(Quest));
  x = document.getElementById("MiddleBox");
  x.appendChild(para);
  x.scrollTop = x.scrollHeight;
  reply();
}

function reply() {

    socket.emit('Quest', Quest, function(replyFromBot) {
        console.log("hi");
        var para = document.createElement("p2");
        x = document.getElementById("MiddleBox");
        para.appendChild(document.createTextNode(replyFromBot));
        x.appendChild(para);
        audio.play();
        x.scrollTop = x.scrollHeight;
    });
}
