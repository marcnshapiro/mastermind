var useColor = "gray";

var topSide = 0;
var leftSide = 0;

var cellHTML = "";
var cellArr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var pinArr = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
var sequence = [0,0,0,0];
var done;
var guess = 0;

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

    switch (pinArr[r][0]*10 + pinArr[r][1]) {
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

  topSide += 58; cellHTML += "<button id='btnCheck' class='btn btn-custom'><img src='ok-icon.png' style='width: 30px; height: 30px'></button>";

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

  $("#btnCheck").on("click", function() {
  });

  displayBoard();
});
