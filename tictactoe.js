document.addEventListener("DOMContentLoaded", function() {
"use strict";



//square objects
var one   =   new Square(1, document.getElementById('one'));
var two   =   new Square(2, document.getElementById('two'));
var three =   new Square(3, document.getElementById('three'));
var four  =   new Square(4, document.getElementById('four'));
var five  =   new Square(5, document.getElementById('five'));
var six   =   new Square(6, document.getElementById('six'));
var seven =   new Square(7, document.getElementById('seven'));
var eight =   new Square(8, document.getElementById('eight'));
var nine  =   new Square(9, document.getElementById('nine'));

var squareArray = [];
var board; //board object
var spanX = document.getElementById('x');
var spanO = document.getElementById('o');

var player;
var computer;

//select random # and place letter
var rand = Math.floor(Math.random()*9+1);

//Object representing a square on the board
function Square(location, domElement)
{
  this.location = location;
  this.occupied = false;
  this.player = false;
  this.domElement = domElement;
  this.update = function (player) {
                  this.occupied = true;
                  this.player = player;
                };
}

function Player(letter)
{
  this.letter = letter;
}

function Computer(letter)
{
  this.letter = letter;
}



function computerChoice()
{
  drawMark(one, "computer");
}

function winOrBlock()
{
  // if board has two in a row, then we must go for a block
}




function boardClick() {
    document.body.addEventListener('click', function(e) {
    var target = e.target;
    var player = "player";
    
      switch (target.id) {
        
        case "one":
          one.update(true); //update square object
          drawMark(one); //draw to square
          break;
        case "two":
          two.update(true);
          drawMark(two);
          break;
        case "three":
          three.update(true);
          drawMark(three);
          break;
        case "four":
          four.update(true);
          drawMark(four);
          break;
        case "five":
          five.update(true);
          drawMark(five);
          break;
        case "six":
          six.update(true);
          drawMark(six);
          break;
        case "seven":
          seven.update(true);
          drawMark(seven);
          break;
        case "eight":
          eight.update(true);
          drawMark(eight);
          break;
        case "nine":
          nine.update(true);
          drawMark(nine);
          break;
      }
    });
  } //end of boardclick()
  
  function drawMark(square)
  {
    var ctx = square.domElement.getContext("2d");
    var letter = square.player ? player.letter : computer.letter;
    var dashLen = 100, dashOffset = dashLen, speed = 3;
    var txt = letter,  x = 25, i = 0; //make me dynamic

    ctx.font = "100px Chewy, cursive";
    //ctx.globalAlpha = 0.95;
    ctx.strokeStyle = ctx.fillStyle = "white";

    (function loop() {
      ctx.clearRect(x, 0, 60, 150);
      ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
      dashOffset -= speed;                                         // reduce dash length
      ctx.strokeText(txt[i], x, 80);                               // stroke letter

    if (dashOffset > 0) requestAnimationFrame(loop);             // animate
    else {
      ctx.fillText(txt[i], x, 80);                               // fill final letter
      
    }
   })();
    
  }
  
  function chooseXorO()
  {
    var modal = document.getElementById('modal');
    var container = document.getElementById('container');
    var playerLetter, computerLetter;
    
    modal.style.display = "none"; //remove modal and onClicks
    removeHandler(spanX, "click", chooseXorO);
    removeHandler(spanO, "click", chooseXorO);
    playerLetter = this.id === "x" ? "x" : "o";
    computerLetter = this.id === "x" ? "o" : "x";    
    player = new Player(playerLetter);
    computer = new Computer(computerLetter);
    console.log(player.letter, computer.letter);
    boardClick(); //setup board to be clicked 
  }
  
  function removeHandler(handler, event, functionName) {
    handler.removeEventListener(event, functionName );
  }

  function init()
  {
    
    document.getElementById('x').addEventListener('click', chooseXorO);
    document.getElementById('o').addEventListener('click', chooseXorO);
  }

init();

});