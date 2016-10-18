var useColor = "gray";

var topSide = 0;
var leftSide = 0;

var cellHTML = "";
var cellArr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var pinArr = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
var sequence = [0,0,0,0];
var done;
var guess = 0;

var sndBeep = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
var sndBeep = new Audio("BeepTone.mp3");  

var iwin = new Audio("audio/iwin.mp3");
var youwon = new Audio("audio/youwon.mp3");


// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setColor(color) {
  useColor = color;
}

function setPinColor(obj, r, c) {
  if (r === guess) {
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
    pinCode = pinArr[r][0]*10 + pinArr[r][1];

    if (pinCode === 40) {
      youwon.play();
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

  displayBoard();

  $("#btnReset").on("click", function() {
    cellArr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    pinArr = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    sequence = [0,0,0,0];
    guess = 0;

    $("#code1").css('background-color', 'gray');
    $("#code2").css('background-color', 'gray');
    $("#code3").css('background-color', 'gray');
    $("#code4").css('background-color', 'gray');

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

    displayBoard();
  });

  $("#btnCheck").on("click", function() {
    var black = 0;
    var white = 0;
    var sequenceDone = [0,0,0,0];
    var guessDone = [0,0,0,0];
    
    if (cellArr[guess][0] > 0 && cellArr[guess][1] > 0 && cellArr[guess][2] > 0 && cellArr[guess][3] > 0) {
      for (let i = 0; i < 4; i++) {
        if (sequence[i] === cellArr[guess][i]) {
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
                if (cellArr[guess][j] === sequence[k]) {
                  white++;
                  guessDone[j] = 1;
                  sequenceDone[k] = 1;
                }
              }
            }
          }
        } 
        
      }
      
      pinArr[guess][0] = black;
      pinArr[guess][1] = white;
      
      displayBoard();

      if (black === 4 || guess === 11) {
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
      
      guess++;

      if (guess === 12) {
        iwin.play();
        displayBoard();
      }
    }
  });
});
