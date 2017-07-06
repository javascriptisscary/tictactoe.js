document.addEventListener("DOMContentLoaded", function() {
"use strict";
/*
var board = [ //array that is the "board" with Square objects
  new Square(document.getElementById('one'),   0),   // [0]
  new Square(document.getElementById('two'),   1),   // [1]
  new Square(document.getElementById('three'), 2), // [2]
  new Square(document.getElementById('four'),  3),  // [3]
  new Square(document.getElementById('five'),  4),  // [4]
  new Square(document.getElementById('six'),   5),   // [5]
  new Square(document.getElementById('seven'), 6), // [6]
  new Square(document.getElementById('eight'), 7), // [7]
  new Square(document.getElementById('nine'),  8)   // [8]
]; */

var board = [0,1,2,3,4,5,6,7,8];

var iteration = 0;
/* board is the tictactoe board
   0 | 1 | 2
   3 | 4 | 5
   6 | 7 | 8
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
function Square(domElement, position)
{
  this.letter = false;
  this.domElement = domElement;
  this.position = position;
  this.update = function (player) {
                  this.letter = player.letter;
                };
}

function Player(human,letter) //human or ai.
{
  this.letter = letter;
  this.human = human;
}


function computerMove() {
  var moveIndex;
  console.log(board);
  moveIndex = minimax(board, computer).index;
  board[moveIndex] = computer.letter;
  console.log(moveIndex);
  setTimeout(function(){ drawMark(moveIndex.toString(), computer, checkWin); }, 1500); //set timeout for more realistic computer timing
}

function humanMove(domid) {
  //square.update(human); //update square object
  drawMark(domid, human, checkWin);  //draw to square, use checkWin as a callback so that it checks for the win AFTER it finishes the drawing animation
  computerMove();
}  

function getSquareElement(id) {
  return document.getElementById(id);
}


function reset() {
  board.forEach(function(square) {
    var ctx = square.domElement.getContext("2d");
    
    ctx.clearRect(0,0,square.domElement.width, square.domElement.height); //clean canvas
    ctx.beginPath();
    square.letter = false;
    
  });
}



function checkWin(board, player)
{
  var letter = player.letter;
  //console.log(board);
  //console.log ("human: ", player.human, "letter: ", letter, " hi im inside the checkWin function");
  if (
    (board[0] == letter && board[1] == letter && board[2] == letter) ||
    (board[3] == letter && board[4] == letter && board[5] == letter) ||
    (board[6] == letter && board[7] == letter && board[8] == letter) ||
    (board[0] == letter && board[3] == letter && board[6] == letter) ||
    (board[1] == letter && board[4] == letter && board[7] == letter) ||
    (board[2] == letter && board[5] == letter && board[8] == letter) ||
    (board[0] == letter && board[4] == letter && board[8] == letter) ||
    (board[2] == letter && board[4] == letter && board[6] == letter) ) {
    
  //alert(letter + " wins!");
  //reset();
    return true;
  }
  //if (player.human) {
    //computerMove();
  //}
  return false;
}                                   

function onBoardClick() {
    document.body.addEventListener('click', function(e) {
      var target = e.target;
    
    //FIXME add a if statement so a player cannot click the same spot twice
      switch (target.id) {
        case "0":
          board[0] = human.letter;
          humanMove(target.id);
          break;
        case "1":
          board[1] = human.letter;
          humanMove(target.id);
          break;
        case "2":
          board[2] = human.letter;
          humanMove(target.id);
          break;
        case "3":
          board[3] = human.letter;
          humanMove(target.id);
          break;
        case "4":
          board[4] = human.letter;
          humanMove(target.id);
          break;
        case "5":
          board[5] = human.letter;
          humanMove(target.id);
          break;
        case "6":
          board[6] = human.letter;
          humanMove(target.id);
          break;
        case "7":
          board[7] = human.letter;
          humanMove(target.id);
          break;
        case "8":
          board[8] = human.letter;
          humanMove(target.id);
          break;
      }
    });
  } //end of onboardclick()
  
  function drawMark(domid, player, callback)
  {
    console.log(domid);
    //var square = ; //grab dom element
    var ctx = document.getElementById(domid).getContext("2d");    //get ready for canvas animations
    var letter = player.letter;
    var dashLen = 100, dashOffset = dashLen, speed = 3;
    var txt = letter,  x = 25, i = 0;
    var won;
    
    ctx.font = "100px Chewy, cursive";
    //ctx.globalAlpha = 0.95;
    ctx.strokeStyle = ctx.fillStyle = "white";
    
    function loop() {
      ctx.clearRect(x, 0, 60, 150);
      ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
      dashOffset -= speed;                                         // reduce dash length
      ctx.strokeText(txt[i], x, 80);                               // stroke letter
      //console.log("dashoffset: ", dashOffset);

      if (dashOffset > 0) requestAnimationFrame(loop);             // animate (requestAnimationFrame, call it once to kick it off, and your function recursively calls itself)
      else {
        ctx.fillText(txt[i], x, 80);                               // fill final letter
        //if (callback(board, player)) {        //callback so checkWin() runs AFTER the animation finishes
          //alert(player.letter+ " wins");
          //reset();
        //}
      }
    }
    loop();
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
  
  function findEmpty(reboard) {
    var emptySquares =[];
    
    //find empty squares on board by testing whether they are integers
    for (var i=0; i<reboard.length; ++i) {
      if ( Number.isInteger(reboard[i]) ) {
        emptySquares.push(reboard[i]);
      }
    }
    return emptySquares;
  }
  
  
  // algorithm for computer ai
  function minimax(reboard, player)
  {
    //console.log("i am reboard ", reboard);
    var emptySquares = findEmpty(reboard); //available spots on board
    
    ++iteration;
    //if (iteration > 10) {
      //return;
    //}
    //console.log(iteration);
    // win, lose, and tie 
    if (checkWin(reboard, human)) {
     // console.log("checkwin: human, return -10");
      return {score:-10};
    }
	  else if (checkWin(reboard, computer)) {
      //console.log("checkwin: computer, return + 10");
      return {score:10};
	  }
    else if (emptySquares.length === 0) {
  	  //console.log("emptysquares: ", emptySquares);
      return {score:0};
    }
    
    var moves = [];
    
    for (var i = 0; i < emptySquares.length; i++) { // loop through available spots
      //create an object for each and store the index of that spot
      
     // if (i ===5) {
       // return;
      //}
      
      //if (i > 0) {
        //console.log(i);
     // }
     // console.log("emptysquares: ", emptySquares);
      var move = {}, result, g;
      move.index = reboard[emptySquares[i]];
      reboard[emptySquares[i]] = player.letter;
  	  //console.log("i: ", i, "reboard : ", reboard[emptySquares[i]]);
      //console.log(reboard);
      //console.log("move.index: ",move.index);
      //console.log("player letter: ",reboard[emptySquares[i]]);
      //console.log("player.human :", player.human); 
       
      // set the empty spot to the current player
      if (player.human) {
        //console.log("human");
        g = minimax(reboard, computer);
        move.score = g.score;
      } else {
        //console.log("pc");
        g = minimax(reboard, human);
        move.score = g.score;
      }
      //console.log("i got out of the recursion");
      // reset the spot to empty
      reboard[emptySquares[i]] = move.index;
      // push the object to the array
      moves.push(move);
    } //end emptySquares loop
    
    
      // if it is the computer's turn loop over the moves and choose the move with the highest score
    var bestMove;
    var bestScore;
    
    if (!player.human) {
      bestScore = -5000;
      //console.log("player computer bestscore");
      
      for (var i = 0; i < moves.length; ++i) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      // else loop over the moves and choose the move with the lowest score
      bestScore = 5000;
      //console.log("player human bestscore");
      for (var i = 0; i < moves.length; ++i) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
  
    // return the chosen move (object) from the moves array
    return moves[bestMove];
  }
    
    
  
  
  

  function init()
  {
    document.getElementById('x').addEventListener('click', chooseXorO);
    document.getElementById('o').addEventListener('click', chooseXorO);
  }

init();

});