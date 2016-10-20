var useColor = "gray";

var topSide = 0;
var leftSide = 0;

var cellHTML = "";
var cellArr = clearCells();
var pinArr = clearPins();
var sequence = [0,0,0,0];
var combinations = [];  // An array of sequences
var S = [];  // An array of sequences
var done;
var guessNr = 0;
var guess = "";

var iwon = new Audio("audio/iwon.mp3");
var youwon = new Audio("audio/youwon.mp3");

var iAmCodeMaker = true;
var codeIndex = -1;
var codeSet = false;

function clearCells() {
  return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
}

function clearPins() {
  return [new Outcome(0,0),new Outcome(0,0),new Outcome(0,0),
          new Outcome(0,0),new Outcome(0,0),new Outcome(0,0),
          new Outcome(0,0),new Outcome(0,0),new Outcome(0,0),
          new Outcome(0,0),new Outcome(0,0),new Outcome(0,0)]
}

function Outcome(black, white) {
  this.white = white;
  this.black = black;
}

outcomes = [new Outcome(0,0),new Outcome(0,1),new Outcome(0,2),
            new Outcome(0,3),new Outcome(0,4),new Outcome(1,0),
            new Outcome(1,1),new Outcome(1,2),new Outcome(1,3),
            new Outcome(2,0),new Outcome(2,1),new Outcome(2,2),
            new Outcome(3,0),new Outcome(4,0)]

function Check(guess, solution) {
  var black = 0;
  var white = 0;
  var sequenceDone = [0,0,0,0];
  var guessDone = [0,0,0,0];
  
  for (let i = 0; i < 4; i++) {
    if (guess[i] === solution[i]) {
      black++;
      sequenceDone[i] = 1;
      guessDone[i] = 1;
    }
  }

  if (black < 3) {
    for (let j = 0; j < 4; j++) {
      if (guessDone[j] === 0) {
        for (let k = 0; k < 4; k++) {
          if (sequenceDone[k] === 0) {
            if (guess[j] === solution[k]) {
              white++;
              guessDone[j] = 1;
              sequenceDone[k] = 1;
            }
          }
        }
      }
    }     
  }

  return new Outcome(black, white);
}

function getNextGuess() {
  // assume we have some list of combinations
  var min = 2147483647;
  var minCombination = null;

  for (let i = 0; i < S.length; i++) {
    var guess = S[i];
    var max = 0;

    for (let j = 0; j < outcomes.length; j++) {
      var desiredOutcome = outcomes[j];
      var count = 0;

      for (let k = 0; k < S.length; k++) {
        var solution = S[k];
        var outcome = Check(guess, solution);

        if (outcome.black === desiredOutcome.black && outcome.white === desiredOutcome.white) {
          count++;
        }
      }
      if (count > max)
        max = count;
    }
    if (max < min) {
      min = max;
      minCombination = guess;
    }
  }

  return minCombination;
}

function reduceS() {
  var desiredOutcome = pinArr[guessNr];
  guess = cellArr[guessNr];

  for (let i = S.length - 1; i >= 0; i--) {
    var solution = S[i];
    var outcome = Check(guess, solution);
    
    if (outcome.black != desiredOutcome.black || outcome.white != desiredOutcome.white) {
      S.splice(i, 1);
    }
  }
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setColor(color) {
  var c = 0;

  if (iAmCodeMaker) {
    useColor = color;

    for (c = 0; c < 4; c++) {
      if (cellArr[guessNr][c] === 0) break;
    }

    if (c < 4) {
      switch (useColor) {
        case "red": cellArr[guessNr][c] = 1; break;
        case "green": cellArr[guessNr][c] = 2; break;
        case "blue": cellArr[guessNr][c] = 3; break;
        case "orange": cellArr[guessNr][c] = 4; break;
        case "black": cellArr[guessNr][c] = 5; break;
        case "white": cellArr[guessNr][c] = 6; break;
      }
    }
    displayBoard();
  } else {
    codeIndex++;

    switch (color) {
      case "red": sequence[codeIndex] = 1; break;
      case "green": sequence[codeIndex] = 2; break;
      case "blue": sequence[codeIndex] = 3; break;
      case "orange": sequence[codeIndex] = 4; break;
      case "black": sequence[codeIndex] = 5; break;
      case "white": sequence[codeIndex] = 6; break;
    }

    switch(codeIndex) {
      case 0: $("#code1").css("background-color", color); break;
      case 1: $("#code2").css("background-color", color); break;
      case 2: $("#code3").css("background-color", color); break;
      case 3: $("#code4").css("background-color", color); break;
    }
  }
}

function setPinColor(obj, r, c) {
  if (r === guessNr) {
    switch (useColor) {
      case "red": cellArr[r][c] = 1; break;
      case "green": cellArr[r][c] = 2; break;
      case "blue": cellArr[r][c] = 3; break;
      case "orange": cellArr[r][c] = 4; break;
      case "black": cellArr[r][c] = 5; break;
      case "white": cellArr[r][c] = 6; break;
    }

    displayBoard();
  }
}

function displayBoard() {
  var pinCode = 0;

  cellHTML = "";  

  for (let r = 0; r < cellArr.length; r++) {
    topSide = r * 29;

    for (let c = 0; c < cellArr[0].length; c++) {
      leftSide = c * 29 + 5;

      cellHTML += "<div class='cell' style='top: " + topSide + "px; left: " + leftSide + "px;' onclick='setPinColor(this, " + r + ", " + c + ")'>"

      switch (cellArr[r][c]) {
        case 0: cellHTML += "<div class='pin empty' onclick='setPinColor(this, " + r + ", " + c + ")'></div>"; break;
        case 1: cellHTML += "<div class='pin red' onclick='setPinColor(this, " + r + ", " + c + ")'></div>"; break;
        case 2: cellHTML += "<div class='pin green' onclick='setPinColor(this, " + r + ", " + c + ")'></div>"; break;
        case 3: cellHTML += "<div class='pin blue' onclick='setPinColor(this, " + r + ", " + c + ")'></div>"; break;
        case 4: cellHTML += "<div class='pin orange' onclick='setPinColor(this, " + r + ", " + c + ")'></div>"; break;
        case 5: cellHTML += "<div class='pin black' onclick='setPinColor(this, " + r + ", " + c + ")'></div>"; break;
        case 6: cellHTML += "<div class='pin white' onclick='setPinColor(this, " + r + ", " + c + ")'></div>"; break;
      }
    
      cellHTML += "</div>";
    }

    leftSide = 135;

    cellHTML += "<div class='cell' style='top: " + topSide + "px; left: " + leftSide + "px;'>"
    pinCode = pinArr[r].black*10 + pinArr[r].white;

    if (pinCode === 40) {
      if (iAmCodeMaker) {
        youwon.play();
      } else {
        iwon.play();
      }
    }

    switch (pinCode) {
      case 40:
        cellHTML += "<div class='pin1 black'></div>";
        cellHTML += "<div class='pin2 black'></div>";
        cellHTML += "<div class='pin3 black'></div>";
        cellHTML += "<div class='pin4 black'></div>";
        break;
      case 30:
        cellHTML += "<div class='pin1 black'></div>";
        cellHTML += "<div class='pin2 black'></div>";
        cellHTML += "<div class='pin3 black'></div>";
        cellHTML += "<div class='pin4 gray'></div>";
        break;
      case 22:
        cellHTML += "<div class='pin1 black'></div>";
        cellHTML += "<div class='pin2 black'></div>";
        cellHTML += "<div class='pin3 white'></div>";
        cellHTML += "<div class='pin4 white'></div>";
        break;
      case 21:
        cellHTML += "<div class='pin1 black'></div>";
        cellHTML += "<div class='pin2 black'></div>";
        cellHTML += "<div class='pin3 white'></div>";
        cellHTML += "<div class='pin4 gray'></div>";
        break;
      case 20:
        cellHTML += "<div class='pin1 black'></div>";
        cellHTML += "<div class='pin2 black'></div>";
        cellHTML += "<div class='pin3 gray'></div>";
        cellHTML += "<div class='pin4 gray'></div>";
        break;
      case 13:
        cellHTML += "<div class='pin1 black'></div>";
        cellHTML += "<div class='pin2 white'></div>";
        cellHTML += "<div class='pin3 white'></div>";
        cellHTML += "<div class='pin4 white'></div>";
        break;
      case 12:
        cellHTML += "<div class='pin1 black'></div>";
        cellHTML += "<div class='pin2 white'></div>";
        cellHTML += "<div class='pin3 white'></div>";
        cellHTML += "<div class='pin4 gray'></div>";
        break;
      case 11:
        cellHTML += "<div class='pin1 black'></div>";
        cellHTML += "<div class='pin2 white'></div>";
        cellHTML += "<div class='pin3 gray'></div>";
        cellHTML += "<div class='pin4 gray'></div>";
        break;
      case 10:
        cellHTML += "<div class='pin1 black'></div>";
        cellHTML += "<div class='pin2 gray'></div>";
        cellHTML += "<div class='pin3 gray'></div>";
        cellHTML += "<div class='pin4 gray'></div>";
        break;
      case 4:
        cellHTML += "<div class='pin1 white'></div>";
        cellHTML += "<div class='pin2 white'></div>";
        cellHTML += "<div class='pin3 white'></div>";
        cellHTML += "<div class='pin4 white'></div>";
        break;
      case 3:
        cellHTML += "<div class='pin1 white'></div>";
        cellHTML += "<div class='pin2 white'></div>";
        cellHTML += "<div class='pin3 white'></div>";
        cellHTML += "<div class='pin4 gray'></div>";
        break;
      case 2:
        cellHTML += "<div class='pin1 white'></div>";
        cellHTML += "<div class='pin2 white'></div>";
        cellHTML += "<div class='pin3 gray'></div>";
        cellHTML += "<div class='pin4 gray'></div>";
        break;
      case 1:
        cellHTML += "<div class='pin1 white'></div>";
        cellHTML += "<div class='pin2 gray'></div>";
        cellHTML += "<div class='pin3 gray'></div>";
        cellHTML += "<div class='pin4 gray'></div>";
        break;
      case 0:
        cellHTML += "<div class='pin1 gray'></div>";
        cellHTML += "<div class='pin2 gray'></div>";
        cellHTML += "<div class='pin3 gray'></div>";
        cellHTML += "<div class='pin4 gray'></div>";
        break;
    }

    cellHTML += "</div>";    
  }

  leftSide = 180;
  
  topSide = 0; cellHTML += "<div onclick='setColor(" + '"red"' + ")' class='cell' style='top: " + topSide + "px; left: " + leftSide + "px;'><div class='pin red'></div></div>";
  topSide += 29; cellHTML += "<div onclick='setColor(" + '"green"' + ")' class='cell' style='top: " + topSide + "px; left: " + leftSide + "px;'><div class='pin green'></div></div>";
  topSide += 29; cellHTML += "<div onclick='setColor(" + '"blue"' + ")' class='cell' style='top: " + topSide + "px; left: " + leftSide + "px;'><div class='pin blue'></div></div>";
  topSide += 29; cellHTML += "<div onclick='setColor(" + '"orange"' + ")' class='cell' style='top: " + topSide + "px; left: " + leftSide + "px;'><div class='pin orange'></div></div>";
  topSide += 29; cellHTML += "<div onclick='setColor(" + '"black"' + ")' class='cell' style='top: " + topSide + "px; left: " + leftSide + "px;'><div class='pin black'></div></div>";
  topSide += 29; cellHTML += "<div onclick='setColor(" + '"white"' + ")' class='cell' style='top: " + topSide + "px; left: " + leftSide + "px;'><div class='pin white'></div></div>";

  $("#board").html(cellHTML);
  $('#btnCheck').mouseup();
  $('#btnReset').mouseup();
  $('#btnSwitch').mouseup();
}

function codeBreaker() {
  var index = -1;

  if (guess === "") {
    guess = [1,1,2,2];  // Initial guess
  } else {
    guess = getNextGuess();
  }

  for (i = 0; i < combinations.length; i++) {
    if (combinations[i][0] === guess[0] && combinations[i][1] === guess[1] && combinations[i][2] === guess[2] && combinations[i][3] === guess[3]) {
      index = i;
      break;
    }
  }

  if (index > -1) {
    combinations.splice(index, 1);
  }

    cellArr[guessNr][0] = guess[0];
    cellArr[guessNr][1] = guess[1];
    cellArr[guessNr][2] = guess[2];
    cellArr[guessNr][3] = guess[3];

    pinArr[guessNr] = Check(cellArr[guessNr], sequence);
   
    displayBoard();

    if (pinArr[guessNr].black === 4 || guessNr === 11) {
      switch (sequence[0]) {
        case 1: $("#code1").css('background-color', 'red');break;
        case 2: $("#code1").css('background-color', 'green');break;
        case 3: $("#code1").css('background-color', 'blue');break;
        case 4: $("#code1").css('background-color', 'orange');break;
        case 5: $("#code1").css('background-color', 'black');break;
        case 6: $("#code1").css('background-color', 'white');break;
      }
      switch (sequence[1]) {
        case 1: $("#code2").css('background-color', 'red');break;
        case 2: $("#code2").css('background-color', 'green');break;
        case 3: $("#code2").css('background-color', 'blue');break;
        case 4: $("#code2").css('background-color', 'orange');break;
        case 5: $("#code2").css('background-color', 'black');break;
        case 6: $("#code2").css('background-color', 'white');break;
      }
      switch (sequence[2]) {
        case 1: $("#code3").css('background-color', 'red');break;
        case 2: $("#code3").css('background-color', 'green');break;
        case 3: $("#code3").css('background-color', 'blue');break;
        case 4: $("#code3").css('background-color', 'orange');break;
        case 5: $("#code3").css('background-color', 'black');break;
        case 6: $("#code3").css('background-color', 'white');break;
      }
      switch (sequence[3]) {
        case 1: $("#code4").css('background-color', 'red');break;
        case 2: $("#code4").css('background-color', 'green');break;
        case 3: $("#code4").css('background-color', 'blue');break;
        case 4: $("#code4").css('background-color', 'orange');break;
        case 5: $("#code4").css('background-color', 'black');break;
        case 6: $("#code4").css('background-color', 'white');break;
      }
    }

    reduceS();
    
    guessNr++;

    if (guessNr === 12) {
      if (iAmCodeMaker) {
        iwin.play();
      } else {
        youwon.play();
      }

      displayBoard();
    }

}

$(document).ready( function() {
  "use strict";

  for (let i = 0; i < 4; i++) {
    done = false;
    while (!done) {
      done = true;
      sequence[i] = getRandomIntInclusive(1, 6);
      for (let j = 0; j < i; j++) {
        if (sequence[i] === sequence[j]) done = false;
      }
    }
  }

  $('#btnCheck').on("mousedown", function() {
    $("#btnCheck").css("background-image", "url(images/check_border.png)").css("background-size", "29px 29px");
  }).on("mouseup", function(){
    $("#btnCheck").css("background-image", "url(images/check.png)").css("background-size", "29px 29px");
  });

  $('#btnReset').on("mousedown", function() {
    $("#btnReset").css("background-image", "url(images/reset_border.png)").css("background-size", "29px 29px");
  }).on("mouseup", function(){
    $("#btnReset").css("background-image", "url(images/reset.png)").css("background-size", "29px 29px");
  });

  $('#btnSwitch').on("mousedown", function() {
    $("#btnSwitch").css("background-image", "url(images/double_arrow_border.png)").css("background-size", "29px 29px");
  }).on("mouseup", function(){
    $("#btnSwitch").css("background-image", "url(images/double_arrow.png)").css("background-size", "29px 29px");
  });

  displayBoard();

  $("#btnReset").on("click", function() {
    cellArr = clearCells();
    pinArr = clearPins();
    sequence = [0,0,0,0];
    guessNr = 0;
    guess = "";
    codeIndex = -1;
    codeSet = false;

    $("#code1").css('background-color', 'gray');
    $("#code2").css('background-color', 'gray');
    $("#code3").css('background-color', 'gray');
    $("#code4").css('background-color', 'gray');

    if (iAmCodeMaker) {
      for (let i = 0; i < 4; i++) {
        done = false;
        while (!done) {
          done = true;
          sequence[i] = getRandomIntInclusive(1, 6);
          for (let j = 0; j < i; j++) {
            if (sequence[i] === sequence[j]) done = false;
          }
        }
      }
    } else {
      for (var i = 1; i <= 6; i++) {
        for (var j = 1; j <= 6; j++) {
          for (var k = 1; k <= 6; k++) {
            for (var l = 1; l <= 6; l++) {
              combinations.push([i,j,k,l]);             
              S.push([i,j,k,l]); 
            }
          }        
        }        
      }
    }

    displayBoard();
  });

  $("#btnCheck").on("click", function() {
    if (!iAmCodeMaker
    && $("#code1").css('background-color') != "rgb(128, 128, 128)" 
    && $("#code2").css('background-color') != "rgb(128, 128, 128)" 
    && $("#code3").css('background-color') != "rgb(128, 128, 128)" 
    && $("#code4").css('background-color') != "rgb(128, 128, 128)") {
      codeBreaker();
      return;
    }

    if (cellArr[guessNr][0] > 0 && cellArr[guessNr][1] > 0 && cellArr[guessNr][2] > 0 && cellArr[guessNr][3] > 0) {

      pinArr[guessNr] = Check(cellArr[guessNr], sequence);

      displayBoard();

      if (pinArr[guessNr].black === 4 || guessNr === 11) {
        switch (sequence[0]) {
          case 1: $("#code1").css('background-color', 'red');break;
          case 2: $("#code1").css('background-color', 'green');break;
          case 3: $("#code1").css('background-color', 'blue');break;
          case 4: $("#code1").css('background-color', 'orange');break;
          case 5: $("#code1").css('background-color', 'black');break;
          case 6: $("#code1").css('background-color', 'white');break;
        }
        switch (sequence[1]) {
          case 1: $("#code2").css('background-color', 'red');break;
          case 2: $("#code2").css('background-color', 'green');break;
          case 3: $("#code2").css('background-color', 'blue');break;
          case 4: $("#code2").css('background-color', 'orange');break;
          case 5: $("#code2").css('background-color', 'black');break;
          case 6: $("#code2").css('background-color', 'white');break;
        }
        switch (sequence[2]) {
          case 1: $("#code3").css('background-color', 'red');break;
          case 2: $("#code3").css('background-color', 'green');break;
          case 3: $("#code3").css('background-color', 'blue');break;
          case 4: $("#code3").css('background-color', 'orange');break;
          case 5: $("#code3").css('background-color', 'black');break;
          case 6: $("#code3").css('background-color', 'white');break;
        }
        switch (sequence[3]) {
          case 1: $("#code4").css('background-color', 'red');break;
          case 2: $("#code4").css('background-color', 'green');break;
          case 3: $("#code4").css('background-color', 'blue');break;
          case 4: $("#code4").css('background-color', 'orange');break;
          case 5: $("#code4").css('background-color', 'black');break;
          case 6: $("#code4").css('background-color', 'white');break;
        }
      }
      
      guessNr++;

      if (guessNr === 12) {
        if (iAmCodeMaker) {
          iwon.play();
        } else {
          youwon.play();
        }

        displayBoard();
      }
    }
  });

  $("#btnSwitch").on("click", function() {
    iAmCodeMaker = !iAmCodeMaker;
    $("#btnReset").click();
  });
});
