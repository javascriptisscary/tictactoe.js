document.addEventListener("DOMContentLoaded", function() {
"use strict";



//squares on the board
var one   =   new Square(document.getElementById('one'));
var two   =   new Square(document.getElementById('two'));
var three =   new Square(document.getElementById('three'));
var four  =   new Square(document.getElementById('four'));
var five  =   new Square(document.getElementById('five'));
var six   =   new Square(document.getElementById('six'));
var seven =   new Square(document.getElementById('seven'));
var eight =   new Square(document.getElementById('eight'));
var nine  =   new Square(document.getElementById('nine'));

var board = [one, two, three, four, five, six, seven, eight, nine];



/* board is the tictactoe board
   1 | 2 | 3
   4 | 5 | 6
   7 | 8 | 9
*/

var yourTurn = document.getElementById('yourturn');
var computerTurn = document.getElementById('computerturn');
var spanX = document.getElementById('x');
var spanO = document.getElementById('o');

var human = {};
var computer = {};

//select random # and place letter
var rand = Math.floor(Math.random()*9+1);

//Object representing a square on the board
function Square(domElement)
{
  this.occupied = false;
  this.letter = false;
  this.domElement = domElement;
  this.update = function (player) {
                  this.occupied = true;
                  this.letter = player.letter;
                };
}

function Player(human,letter) //human or ai.
{
  this.letter = letter;
  this.human = human;
}


function computerChoice()
{
  two.update(computer);
  setTimeout(function(){ drawMark(two, computer, checkWin); }, 1500); //set timeout for more realistic computer timing
}


function reset()
{
  board.forEach(function(square) {
    var ctx = square.domElement.getContext("2d");
    
    ctx.clearRect(0,0,square.domElement.width, square.domElement.height); //clean canvas
    ctx.beginPath();
    
    square.occupied = false;
    square.letter = false;
    
  });
}



function checkWin(player)
{
  var letter = player.letter;
  console.log ("human: ", player.human, "letter: ", letter, " hi im inside the checkWin function");
  if (
    (board[0].letter == letter && board[1].letter == letter && board[2].letter == letter) ||
    (board[3].letter == letter && board[4].letter == letter && board[5].letter == letter) ||
    (board[6].letter == letter && board[7].letter == letter && board[8].letter == letter) ||
    (board[0].letter == letter && board[3].letter == letter && board[6].letter == letter) ||
    (board[1].letter == letter && board[4].letter == letter && board[7].letter == letter) ||
    (board[2].letter == letter && board[5].letter == letter && board[8].letter == letter) ||
    (board[0].letter == letter && board[4].letter == letter && board[8].letter == letter) ||
    (board[2].letter == letter && board[4].letter == letter && board[6].letter == letter) ) {
    
  alert(letter + " wins!");
  reset();
  return true;
  }
  if (player.human) {
    computerChoice();
  }
  return false;
}

function winOrBlock()
{
  // if board has two in a row, then we must go for a block
}

function humanMove(square)
{
  console.log(square.domElement.id);
  square.update(human); //update square object
  
  drawMark(square, human, checkWin);  //draw to square, use checkWin as a callback so that it checks for the win AFTER it finishes the drawing animation
                                      // if players wins, returns true
}                                     


function onBoardClick() {
    document.body.addEventListener('click', function(e) {
      var target = e.target;
      var win = false;
    
      switch (target.id) {
        
        case "one":
          humanMove(one);
          break;
        case "two":
          humanMove(two);
          break;
        case "three":
          humanMove(three);
          break;
        case "four":
          humanMove(four);
          break;
        case "five":
          humanMove(five);
          break;
        case "six":
          humanMove(six);
          break;
        case "seven":
          humanMove(seven);
          break;
        case "eight":
          humanMove(eight);
          break;
        case "nine":
          humanMove(nine);
          break;
      }
    });
  } //end of onboardclick()
  
  function drawMark(square, player, callback)
  {
    var ctx = square.domElement.getContext("2d");
    var letter = player.letter;
    var dashLen = 100, dashOffset = dashLen, speed = 3;
    var txt = letter,  x = 25, i = 0; //make me dynamic
    var reset = false;

    ctx.font = "100px Chewy, cursive";
    //ctx.globalAlpha = 0.95;
    ctx.strokeStyle = ctx.fillStyle = "white";
    
  
    function loop() {
      ctx.clearRect(x, 0, 60, 150);
      ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
      dashOffset -= speed;                                         // reduce dash length
      ctx.strokeText(txt[i], x, 80);                               // stroke letter
      console.log("dashoffset: ", dashOffset);

      if (dashOffset > 0) requestAnimationFrame(loop);             // animate (requestAnimationFrame, call it once to kick it off, and your function recursively calls itself)
      else {
        ctx.fillText(txt[i], x, 80);                               // fill final letter
        reset = callback(player); //callback so checkWin() runs AFTER the animation finishes
        console.log("Im reset in the loop:", reset);
        return reset;
      }
    }
    loop();
   // console.log("i'm the value of reset outside of the loop: ", reset);
   // return reset;
  }
  
  function chooseXorO()
  {
    var modal = document.getElementById('modal');
    var container = document.getElementById('container');
    var humanLetter, computerLetter;
    
    modal.style.display = "none"; //remove modal and onClicks
    removeHandler(spanX, "click", chooseXorO);
    removeHandler(spanO, "click", chooseXorO);
    
    humanLetter = this.id === "x" ? "x" : "o";
    computerLetter = this.id === "x" ? "o" : "x";

    human = new Player(true, humanLetter);
    computer = new Player(false, computerLetter);
    onBoardClick(); //setups up board 
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