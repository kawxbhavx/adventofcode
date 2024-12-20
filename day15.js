//part1
let patternInput = document.querySelector('pre').innerText;
let warehouse=patternInput.substring(0,patternInput.lastIndexOf("#")+1);
let moves=patternInput.substring(patternInput.lastIndexOf("#")+1);

let movesElement=document.createElement("span");
document.querySelector('pre').before(movesElement);
movesElement.innerText="Current Move:     Next Move:";

//let warehouse="##########"+
"\n#..O..O.O#"+
"\n#......O.#"+
"\n#.OO..O.O#"+
"\n#..O@..O.#"+
"\n#O#..O...#"+
"\n#O..O..O.#"+
"\n#.OO.O.OO#"+
"\n#....O...#"+
"\n##########";

//let moves="<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^"+
"\nvvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v"+
"\n><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<"+
"\n<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^"+
"\n^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><"+
"\n^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^"+
"\n>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^"+
"\n<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>"+
"\n^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>"+
"\nv^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^\n";

//let warehouse="########"+
"\n#..O.O.#"+
"\n##@.O..#"+
"\n#...O..#"+
"\n#.#.O..#"+
"\n#...O..#"+
"\n#......#"+
"\n########";

//let moves="<^^>>>vv<v>>v<<\n";
moves=">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";

moves=moves.replaceAll("\n","");

let warehousePattern=[];
warehouse.split("\n").forEach(function(warehouseRow) {
  warehousePattern.push(warehouseRow.split(""));
});

let startRow=0;
let startCol=0;
let rows=warehousePattern.length;
let cols=warehousePattern[0].length;

let robot="@";
let wall="#";
let imaginaryWall="I";
let box="O";
let space=".";

for(startRow=0;startRow<rows;startRow++) {
  let rowFound=false;
  for(startCol=0;startCol<cols;startCol++) {
    if(warehousePattern[startRow][startCol]===robot) {
      rowFound=true;      
      break;
    }
  }
  if(rowFound) {
    break;
  }
}

let moveNumber=0;
let cntr=setInterval(function() {
  //performNthMove(moveNumber);
  performNthScaledMove(moveNumber);
}, 100);

function performNthMove() {
//for(let moveNumber=0;moveNumber<moves.length;moveNumber++) {
  if(moveNumber<moves.length-1) {
    movesElement.innerText="Total Moves:" + moves.length + "     Current Move(" + (moveNumber+1) + "):" + moves[moveNumber] + "     Next Move:" + moves[moveNumber+1];
  } else {
    movesElement.innerText="Total Moves:" + moves.length + "     Current Move(" + (moveNumber+1) + "):" + moves[moveNumber];
  }
  
  if(moves[moveNumber]==="<") {
    let warehouseRow=[...warehousePattern[startRow]];
    generateMove(warehouseRow);
    warehouseRow.forEach(function(element,index) {
      warehousePattern[startRow][index]=element;
    });
    startCol=warehouseRow.indexOf(robot);
  } else if(moves[moveNumber]==="^") {
    let warehouseRow=[];
    for(let row=0;row<rows;row++) {
      warehouseRow.push(warehousePattern[row][startCol]);
    }
    generateMove(warehouseRow);
    warehouseRow.forEach(function(element,index) {
      warehousePattern[index][startCol]=element;
    });
    startRow=warehouseRow.indexOf(robot);
  } else if(moves[moveNumber]===">") {
    let warehouseRow=[...warehousePattern[startRow]];
    warehouseRow.reverse();
    generateMove(warehouseRow);
    warehouseRow.reverse();
    warehouseRow.forEach(function(element,index) {
      warehousePattern[startRow][index]=element;
    });
    startCol=warehouseRow.indexOf(robot);
  } else if(moves[moveNumber]==="v") {
    let warehouseRow=[];
    for(let row=0;row<rows;row++) {
      warehouseRow.push(warehousePattern[row][startCol]);
    }
    warehouseRow.reverse();
    generateMove(warehouseRow);
    warehouseRow.reverse();
    warehouseRow.forEach(function(element,index) {
      warehousePattern[index][startCol]=element;
    });
    startRow=warehouseRow.indexOf(robot);
  }
  drawPattern();
  if(moveNumber===moves.length) {
    clearInterval(cntr);
    let gpsSum=0;
    for(let row=1;row<rows-1;row++) {
      for(let col=1;col<cols-1;col++) {
        if(warehousePattern[row][col]===box) {
          gpsSum=gpsSum+((row*100) + col);
        }
      }
    }
    console.log(gpsSum);
  } else {
    moveNumber++;
  }
}

function generateMove(patternRow) {
  let nearestWallIndex=patternRow.lastIndexOf(wall,patternRow.lastIndexOf(robot)-1);
  for(let col=0;col<nearestWallIndex;col++) {
    if(patternRow[col]===space) {
      patternRow[col]=imaginaryWall;
    }
  }
  let nearestSpaceIndex=patternRow.lastIndexOf(space,patternRow.lastIndexOf(robot)-1);
  if(nearestSpaceIndex>0) {
    let hasBox=false;
    let robotCol=patternRow.indexOf(robot);
    for(let col=nearestSpaceIndex;col<robotCol;col++) {
      if(patternRow[col]===box) {
        hasBox=true;
        break;
      }
    }
    if(hasBox) {
      patternRow[nearestSpaceIndex]=box;
    }
    patternRow[robotCol]=space;
    robotCol--;    
    patternRow[robotCol]=robot;
  }
  for(let col=0;col<cols;col++) {
    if(patternRow[col]===imaginaryWall) {
      patternRow[col]=space;
    }
  }
}

//part2
let scaledWarehouse=warehouse.replaceAll("#","##");
scaledWarehouse=scaledWarehouse.replaceAll("O","[]");
scaledWarehouse=scaledWarehouse.replaceAll(".","..");
scaledWarehouse=scaledWarehouse.replaceAll("@","@.");
document.querySelector('pre').innerText=scaledWarehouse;

let scaledWarehousePattern=[];
scaledWarehouse.split("\n").forEach(function(scaledWarehouseRow) {
  scaledWarehousePattern.push(scaledWarehouseRow.split(""));
});

function drawPattern() {
  let patternOutput="";
  //warehousePattern.forEach(function(patternRow) {
  scaledWarehousePattern.forEach(function(patternRow) {
    patternOutput = patternOutput + patternRow.join("") + "\n";
  });
  document.querySelector('pre').innerText=patternOutput;
}

let scaledStartRow=0;
let scaledStartCol=0;
let scaledRows=scaledWarehousePattern.length;
let scaledCols=scaledWarehousePattern[0].length;

let boxStart="[";
let boxEnd="]";

for(scaledStartRow=0;scaledStartRow<scaledRows;scaledStartRow++) {
  let rowFound=false;
  for(scaledStartCol=0;scaledStartCol<scaledCols;scaledStartCol++) {
    if(scaledWarehousePattern[scaledStartRow][scaledStartCol]===robot) {
      rowFound=true;      
      break;
    }
  }
  if(rowFound) {
    break;
  }
}


function performNthScaledMove() {
//for(let i=0;i<moves.length;i++) {
  if(moveNumber<moves.length-1) {
    movesElement.innerText="Total Moves:" + moves.length + "     Current Move(" + (moveNumber+1) + "):" + moves[moveNumber] + "     Next Move:" + moves[moveNumber+1];
  } else {
    movesElement.innerText="Total Moves:" + moves.length + "     Current Move(" + (moveNumber+1) + "):" + moves[moveNumber];
  }
  
  if(moves[moveNumber]==="<") {
    let scaledWarehouseRow=[...scaledWarehousePattern[scaledStartRow]];
    generateHMove(scaledWarehouseRow);
    scaledWarehouseRow.forEach(function(element,index) {
      scaledWarehousePattern[scaledStartRow][index]=element;
    });
    scaledStartCol=scaledWarehouseRow.indexOf(robot);
  } else if(moves[moveNumber]==="^") {
    let scaledWarehouseRow=[];
    for(let row=0;row<rows;row++) {
      scaledWarehouseRow.push(scaledWarehousePattern[row][scaledStartCol]);
    }
    generateMove(scaledWarehouseRow);
    scaledWarehouseRow.forEach(function(element,index) {
      scaledWarehousePattern[index][scaledStartCol]=element;
    });
    scaledStartRow=scaledWarehouseRow.indexOf(robot);
  } else if(moves[moveNumber]===">") {
    let scaledWarehouseRow=[...scaledWarehousePattern[scaledStartRow]];
    scaledWarehouseRow.reverse();
    generateHMove(scaledWarehouseRow);
    scaledWarehouseRow.reverse();
    scaledWarehouseRow.forEach(function(element,index) {
      scaledWarehousePattern[scaledStartRow][index]=element;
    });
    scaledStartCol=scaledWarehouseRow.indexOf(robot);
  } else if(moves[moveNumber]==="v") {
    let scaledWarehouseRow=[];
    for(let row=0;row<rows;row++) {
      scaledWarehouseRow.push(scaledWarehousePattern[row][scaledStartCol]);
    }
    scaledWarehouseRow.reverse();
    generateMove(scaledWarehouseRow);
    scaledWarehouseRow.reverse();
    scaledWarehouseRow.forEach(function(element,index) {
      scaledWarehousePattern[index][scaledStartCol]=element;
    });
    scaledStartRow=scaledWarehouseRow.indexOf(robot);
  }
  drawPattern();
  if(moveNumber===moves.length) {
    clearInterval(cntr);
    let scaledGpsSum=0;
    for(let row=1;row<scaledRows-1;row++) {
      for(let col=1;col<scaledCols-1;col++) {
        if(scaledWarehousePattern[row][col]===box) {
          scaledGpsSum=scaledGpsSum+((row*100) + col);
        }
      }
    }
    console.log(scaledGpsSum);
  } else {
    moveNumber++;
  }
}

function generateHMove(patternRow) {
  let nearestWallIndex=patternRow.lastIndexOf(wall,patternRow.lastIndexOf(robot)-1);
  for(let col=0;col<nearestWallIndex;col++) {
    if(patternRow[col]===space) {
      patternRow[col]=imaginaryWall;
    }
  }
  let nearestSpaceIndex=patternRow.lastIndexOf(space,patternRow.lastIndexOf(robot)-1);
  if(nearestSpaceIndex>0) {
    let robotCol=patternRow.indexOf(robot);
    patternRow.splice(nearestSpaceIndex,1);
    patternRow.splice(robotCol,0,space);
  }
  for(let col=0;col<cols;col++) {
    if(patternRow[col]===imaginaryWall) {
      patternRow[col]=space;
    }
  }
}
