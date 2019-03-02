
var grid;
var fps = 60;
var g = 6;

function setup () {
  createCanvas(400, 400);
  
  grid = new Grid(20);
  grid.randomize();
  frameRate(15);
  print("I don't think the customization was really challenging, but putting loop() and noLoop() at the right spots was the most time consuming ");
  print("I could have pushed myself to do more of the challenges but unfornatuely I have a physics lab report due")
  print("I would be happy to add it to my portfolio because this is the first game ever i have created an interactive game and I also wanna come back to it in a few years and compare it to my work in the future")

}

function draw () {
  
  background(250);
  grid.updateNeighborCounts();
  grid.updatePopulation();
  grid.draw();
  //shows a text for the number of living cells 
  var livingCells = grid.getLiveCells();
  fill(100,230,100);
  textSize(20);
  text("Live cells: "+livingCells,10,20);

  }

class Cell{
  constructor(column, row, size){
    this.column = column;
    this.row = row;
    this.size = size;
    this.isAlive = false;
    this.liveNeighborCount = 0;
  }
  liveOrDie(){
    if(!this.isAlive && this.liveNeighborCount == 3){
      this.isAlive = true;
    }else if(this.isAlive && (this.liveNeighborCount<2 || this.liveNeighborCount>3)){
      this.isAlive = false;
    }else{
      this.isAlive = this.isAlive;
    }
  }
  draw(){
    if(this.isAlive === true){
      fill(200,0,200);
    }else{
      fill(240);
    }
        noStroke();
        rect(this.column * this.size + 1, this.row * this.size + 1, this.size - 1, this.size - 1);
    
  }
  setIsAlive(value){
    if(value == 1){
      this.isAlive = true;
    }else{
      this.isAlive = false;
    }
    
  }
}

class Grid {
  constructor (cellSize) {
    // update the contructor to take cellSize as a parameter
    // use cellSize to calculate and assign values for numberOfColumns and numberOfRows
    this.cellSize = cellSize;
    this.numberOfRows = width/this.cellSize;
    this.numberOfColumns = height/this.cellSize;
    this.cells = new Array(this.numberOfColumns);
    for (var i = 0; i<this.cells.length; i++){
      this.cells[i] = new Array(this.numberOfRows);
    }
    for (var column = 0; column < this.numberOfColumns; column ++) {
  for (var row = 0; row < this.numberOfRows; row++) {
    this.cells[column][row] = new Cell(column, row, this.cellSize);
  }
}
    print(this.cells);
    
  }

  draw () {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
            this.cells[column][row].draw();
      }
    }
  }
  randomize(){
    for (var column = 0; column < this.numberOfColumns; column ++){
      for (var row = 0; row < this.numberOfRows; row++){
        this.cells[column][row].setIsAlive(floor(random(2)));
      }
    }
  }
  updatePopulation(){
    for (var column = 0; column < this.numberOfColumns; column ++){
      for (var row = 0; row < this.numberOfRows; row++){
        this.cells[column][row].liveOrDie();
      }
    }
  }
  getNeighbors(currentCell){
    var neighbors= [];
    for (var xOffset = -1; xOffset <= 1; xOffset++) {
     for (var yOffset = -1; yOffset <= 1; yOffset++) {
      var neighborColumn = currentCell.column + xOffset;
      var neighborRow = currentCell.row + yOffset;
      if(this.isValidPosition(neighborColumn,neighborRow)){
       append(neighbors,this.cells[neighborColumn][neighborRow]);// do something with neighborColumn and neighborRow
    }
  }
}
for(var i = 0; i<neighbors.length; i++){
  if (neighbors[i] == this.cells[currentCell.column][currentCell.row]){
    neighbors.splice(i,1);
  }
}
    return neighbors;
  }
  isValidPosition (column, row) {
  // add logic that checks if the column and row exist in the grid
  // return true if they are valid and false if they are not
  if(column<0 || column>this.numberOfColumns-1 || row<0 || row>this.numberOfRows-1 ){
    return false;
  }else{
    return true;
  }
}
updateNeighborCounts(){
  for (var column = 0; column < this.numberOfColumns; column ++){
      for (var row = 0; row < this.numberOfRows; row++){
        this.cells[column][row].liveNeighborCount = 0;
        var neighborsList = this.getNeighbors(this.cells[column][row]);
        for(var i = 0; i<neighborsList.length; i++){
          if(neighborsList[i].isAlive){
            this.cells[column][row].liveNeighborCount++;
          }
        }
      }
    }
}
//counts the number of living cells
getLiveCells(){
  var liveCells = 0;
  for (var column = 0; column < this.numberOfColumns; column ++){
      for (var row = 0; row < this.numberOfRows; row++){
        if(this.cells[row][column].isAlive){
          liveCells++;
        }
        
      }
    }
    return liveCells;
  }
 
}


function mousePressed(){

//rerandmozie
grid.randomize();
loop();

  
}
//pause and continue
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    noLoop();
  } else if(keyCode === RIGHT_ARROW){
    loop();
  }
}
