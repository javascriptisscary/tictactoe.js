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

//select random # and place letter
var rand = Math.floor(Math.random()*9+1);

//Square Object
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





function computerChoice()
{
  drawMark(one, "computer");
}

function winOrBlock()
{
  // if board has two in a row, then we must go for a block
}

function Board(squares, playerLetter)
{
  this.squares = squares;
  this.playerLetter = playerLetter; // "x" or "o"
}



function boardClick() {
    document.body.addEventListener('click', function(e) {
    var target = e.target;
    var player = "player";
    
      switch (target.id) {
        
        case "one":
          drawMark(target, player);
          one.update(true);
          break;
        case "two":
          drawMark(target, player);
          two.update(true);
          break;
        case "three":
          drawMark(target, player);
          three.update(true);
          break;
        case "four":
          drawMark(target, player);
          four.update(true);
          break;
        case "five":
          drawMark(target, player);
          five.update(true);
          break;
        case "six":
          drawMark(target, player);
          six.update(true);
          break;
        case "seven":
          drawMark(target, player);
          seven.update(true);
          break;
        case "eight":
          drawMark(target, player);
          eight.update(true)
          break;
        case "nine":
          drawMark(target, player);
          nine.update(true);
          break;
      }
    });
  } //end of boardclick()
  
  function drawMark(square)
  {
    // https://stackoverflow.com/questions/29911143/how-can-i-animate-the-drawing-of-text-on-a-web-page
    // https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
    var ctx = square.getContext("2d"),
    dashLen = 100, dashOffset = dashLen, speed = 3,
    txt = board.playerLetter, x = 25, i = 0; //make me dynamic

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
    var playerLetter;
    
    modal.style.display = "none"; //remove modal and onClicks
    removeHandler(spanX, "click", chooseXorO);
    removeHandler(spanO, "click", chooseXorO);
    
    playerLetter = this.id ==="x" ? "x" : "o";
    board = new Board(squareArray, playerLetter); //make new board object
    boardClick(); //setup board to be clicked 
  }
  
  function removeHandler(handler, event, functionName) {
    handler.removeEventListener(event, functionName );
  }

  function init()
  {
    // init squares
    for (var i=1; i < 10; ++i) {
      squareArray.push(new Square(i, false, false));
    }
    document.getElementById('x').addEventListener('click', chooseXorO);
    document.getElementById('o').addEventListener('click', chooseXorO);
  }

init();

});