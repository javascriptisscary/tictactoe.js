document.addEventListener("DOMContentLoaded", function() {
"use strict";


//real men use plain javascript with lame element names

var one   =   document.getElementById('one');
var two   =   document.getElementById('two');
var three =   document.getElementById('three'); 
var four  =   document.getElementById('four');
var five  =   document.getElementById('five');
var six   =   document.getElementById('six');
var seven =   document.getElementById('seven');
var eight =   document.getElementById('eight');
var nine  =   document.getElementById('nine');

var squareArray = [];

//add eventlistener to all elements with classname column
//for (var i=0; i < column.length; ++i) {
  //var letter = "O"; //make me dynamic
  //column[i].addEventListener('click', addLetter)
//}

//select random # and place letter
var rand = Math.floor(Math.random()*9+1);



function addLetter()
{
  if (this.innerHTML === "") {
    this.innerHTML = letter;
    addFilledSquare()
    computerChoice();
  }
}

function addFilledSquare(square) 
{
  Board.filledSquares.push(square); 
  
}

function computerChoice ()
{

}

function winOrBlock()
{
  // if board has two in a row, then we must go for a block
}

function Board(squares)
{
  this.squares = squares;
}

function Square(location, occupied, player)
{
  this.location = location;
  this.occupied = occupied;
  this.player = player;
}

function boardClick() {
    document.body.addEventListener('click', function(e) {
    var target = e.target;
    
      switch (target.id) {
        
        case "one":
          console.log("1");
          drawMark(target);
          break;
        case "two":
          console.log("2");
          drawMark(target);
          break;
        case "three":
          console.log("3");
          drawMark(target);
          break;
        case "four":
          console.log("4");
          drawMark(target);
          break;
        case "five":
          console.log("5");
          drawMark(target);
          break;
        case "six":
          console.log("6");
          drawMark(target);
          break;
        case "seven":
          console.log("7");
          drawMark(target);
          break;
        case "eight":
          console.log("8");
          drawMark(target);
          break;
        case "nine":
          console.log("9");
          drawMark(target);
          break;
      }
    });
  } //end of boardclick()
  
  function drawMark(square)
  {
    //square.innerHTML = "X";
    // https://stackoverflow.com/questions/29911143/how-can-i-animate-the-drawing-of-text-on-a-web-page
    // https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
    var ctx = square.getContext("2d"),
    dashLen = 100, dashOffset = dashLen, speed = 3,
    txt = "x", x = 25, i = 0; //make me dynamic

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
  

function init()
{
  // init squares
  for (var i=1; i < 10; ++i) {
    squareArray.push(new Square(i, false, false));
  }
  
  new Board(squareArray);
  boardClick();
  
  
    

}

init();

});