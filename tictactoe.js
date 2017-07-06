document.addEventListener("DOMContentLoaded", function() {
"use strict";

var board = [0,1,2,3,4,5,6,7,8];

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

function Player(human,letter) //human or ai.
{
  this.letter = letter;
  this.human = human;
}

function computerMove() {
  var moveIndex;
  moveIndex = minimax(board, computer).index;
  board[moveIndex] = computer.letter;
  setTimeout(function(){ drawMark(moveIndex.toString(), computer, checkWin); }, 1500); //set timeout for more realistic computer timing
}

function humanMove(domid) {
  drawMark(domid, human, checkWin);  //draw to square, use checkWin as a callback so that it checks for the win AFTER it finishes the drawing animation
  computerMove();
}  

function reset() {
  board = [0,1,2,3,4,5,6,7,8];
  
  for (var x = 0; x < board.length; ++x) {
    var element = document.getElementById(x.toString());
    var ctx = element.getContext("2d");
    
    ctx.clearRect(0,0,element.width, element.height); //clean canvas
    ctx.beginPath();
  }
}

function checkWin(board, player, finalcheck) {
  var letter = player.letter;
  
  if (
    (board[0] == letter && board[1] == letter && board[2] == letter) ||
    (board[3] == letter && board[4] == letter && board[5] == letter) ||
    (board[6] == letter && board[7] == letter && board[8] == letter) ||
    (board[0] == letter && board[3] == letter && board[6] == letter) ||
    (board[1] == letter && board[4] == letter && board[7] == letter) ||
    (board[2] == letter && board[5] == letter && board[8] == letter) ||
    (board[0] == letter && board[4] == letter && board[8] == letter) ||
    (board[2] == letter && board[4] == letter && board[6] == letter) ) {
    
    if (finalcheck) {
      if (player.human) {
        alert("You Wins!");
      } else {
        alert("Computer Wins!");
      }
      reset();
    }
    return true;
  }

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
    ctx.strokeStyle = ctx.fillStyle = "white";
    
    function loop() {
      ctx.clearRect(x, 0, 60, 150);
      ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
      dashOffset -= speed;                                         // reduce dash length
      ctx.strokeText(txt[i], x, 80);                               // stroke letter

      if (dashOffset > 0) requestAnimationFrame(loop);             // animate (requestAnimationFrame, call it once to kick it off, and your function recursively calls itself)
      else {
        ctx.fillText(txt[i], x, 80);                               // fill final letter
        callback(board,player,true);                               // run callback checkWin, so it runs after animation finishes
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
  
  function findEmpty(board) {
    var emptySquares =[];
    
    //find empty squares on board by testing whether they are integers
    for (var i=0; i<board.length; ++i) {
      if ( Number.isInteger(board[i]) ) {
        emptySquares.push(board[i]);
      }
    }
    return emptySquares;
  }
  
  
  // recursive algorithm for computer ai
  function minimax(reboard, player)
  {
    var emptySquares = findEmpty(reboard); //available spots on board
    
    // each move is assigned a score by the resulting outcome. if there is not yet an outcome, continue on with recursion
    if (checkWin(reboard, human, false)) {
      return {score:-10};
    }
	  else if (checkWin(reboard, computer, false)) {
      return {score:10};
	  }
    else if (emptySquares.length === 0) {
      return {score:0};
    }
    
    var moves = [];
    
    for (var i = 0; i < emptySquares.length; i++) { // loop through available spots
      //create an object for each and store the index of that spot
      var move = {};
      var game;
      
      move.index = reboard[emptySquares[i]];
      reboard[emptySquares[i]] = player.letter; // set the empty spot to the current player letter
  	  
      if (player.human) {
        game = minimax(reboard, computer);
        move.score = game.score;
      } else {
        game = minimax(reboard, human);
        move.score = game.score;
      }
      
      reboard[emptySquares[i]] = move.index; // reset the spot to empty when completed
      moves.push(move); // push the object to the moves array
    } //end emptySquares loop
    
    var bestMove;
    var bestScore;
    
    // if it is the computer's turn loop over the moves and choose the move with the highest score
    if (!player.human) {
      bestScore = -8000;
      for (var i = 0; i < moves.length; ++i) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      // else loop over the moves and choose the move with the lowest score
      bestScore = 8000;
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