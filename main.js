var x = 0;
var y = 0;
var screenWidth = 0;
var screenHeight = 0;
var apple = "";
var speakData = "";
var toNumber = "";
var drawApple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();
function preload(){
  apple = loadImage("apple.png");
}
function start()
{
  document.getElementById("status").innerHTML = "O sistema está ouvindo. Por favor, fale.";  
  recognition.start();
} 
 
recognition.onresult = function(event) {
  content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "A fala foi reconhecida: " + content; 
  console.log(event); 
  toNumber = Number(content);
  if(Number.isInteger(toNumber)){
    console.log("A maçã começou a ser desenhada!");
    document.getElementById("status").innerHTML = "A maçã começou a ser desenhada!"
    drawApple = "set";
  }
  else{
    console.log("Não reconhecido...");
    document.getElementById("status").innerHTML = "Não reconhecido...";
  }
}

function setup() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  var canvas =  createCanvas(screenWidth, screenHeight-150);
  canvas.position(0, 150);
}

function draw() {
  if(drawApple == "set")
  {
    for(
      var i = 1;
      i <= toNumber;
      i++){x = Math.floor(Math.random()*700);
      y = Math.floor(Math.random()*400);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = toNumber + " maçãs desenhadas";
    drawApple = "";
    speakData = toNumber+" maçãs desenhadas";
    speak();
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speakData);

    synth.speak(utterThis);

    speakData = "";
}
