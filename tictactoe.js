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

var human;
var computer;

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

function Player(letter) //human or ai.
{
  this.letter = letter;
}


function computerChoice()
{
  two.update(computer);
  setTimeout(function(){ drawMark(two, checkWin); }, 1500); //set timeout for more realistic computer timing
}


function reset()
{
  
}



function checkWin(player)
{
  var letter = player.letter;
  console.log (letter, " hi im inside the checkWin function");
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
  }
  return false;
}

function winOrBlock()
{
  // if board has two in a row, then we must go for a block
}




function onBoardClick() {
    document.body.addEventListener('click', function(e) {
    var target = e.target;
    
      switch (target.id) {
        
        case "one":
          one.update(human); //update square object
          drawMark(one, checkWin); //draw to square
          computerChoice();
          break;
        case "two":
          two.update(human);
          drawMark(two, checkWin);
          computerChoice();
          break;
        case "three":
          three.update(human);
          drawMark(three, checkWin);
          computerChoice();
          break;
        case "four":
          four.update(human);
          drawMark(four, checkWin);
          computerChoice();
          break;
        case "five":
          five.update(human);
          drawMark(five, checkWin);
          computerChoice();
          break;
        case "six":
          six.update(human);
          drawMark(six, checkWin);
          computerChoice();
          break;
        case "seven":
          seven.update(human);
          drawMark(seven, checkWin);
          computerChoice();
          break;
        case "eight":
          eight.update(human);
          drawMark(eight, checkWin);
          computerChoice();
          break;
        case "nine":
          nine.update(human);
          drawMark(nine, checkWin);
          computerChoice();
          break;
      }
    });
  } //end of onboardclick()
  
  function drawMark(square,callback)
  {
    var ctx = square.domElement.getContext("2d");
    var letter = square.letter;
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
      callback(human);                                           //callback so checkWin() runs AFTER the animation finishes
    }
   })();
    
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

    human = new Player(humanLetter);
    computer = new Player(computerLetter);
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