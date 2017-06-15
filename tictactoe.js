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
          target.innerHTML ="X";
          break;
        case "two":
          console.log("2");
          break;
        case "three":
          console.log("3");
          break;
        case "four":
          console.log("4");
          break;
        case "five":
          console.log("5");
          break;
        case "six":
          console.log("6");
          break;
        case "seven":
          console.log("7");
          break;
        case "eight":
          console.log("8");
          break;
        case "nine":
          console.log("9");
          break;
      }
    });
  } //end of boardclick()

function init()
{
    
    console.log("running");
  // init squares
  for (var i=1; i < 10; ++i) {
    squareArray.push(new Square(i, false, false));
  }
  
  
  console.log(squareArray);
  new Board(squareArray);
  boardClick();
  
  
    

}

init();

});