//Game Art
//by Eddson Jose
let gameState;
let startButton;
let gameReset;
let feeling = 'nervousness';
// let moveControls;
let backgroundImage;
let playerSprite, playerX = 100, playerY = 250, playerSpeed = 0.5;//0.5 original speed
let peopleSprite, peopleSprite2, peopleSprite3;
let peopleX = 0, peopleY = 0, peopleXX = 0, peopleYY = 0;
let people = [];
let hit = false;
let score = 0;
let counter = 0;
let timer = 0;
//-------------------------------------------------------------------------
function preload() {
  backgroundImage = loadImage('images/gameArt_background.png');
  // backgroundImage = createImg('images/gameArt_background.gif');
  playerSprite = createImg("images/playerSprite.gif");
  // peopleSprite = loadImage('images/peopleSprite.png');
  // peopleSprite2 = createImg('images/peopleSprite2.gif');
  // peopleSprite2 = loadImage('images/peopleSprite2.png');
  // peopleSprite3 = createImg('images/peopleSprite3.gif');
  peopleSprite3 = loadImage('images/peopleSprite3.png');
}
//-------------------------------------------------------------------------
function setup() {
  createCanvas(1500, 500);
  background(50);
  titleScreen();
  for (let i = 0; i < 400; i++) {//original is 400
    people.push(new peopleSpriteClass());
  }
  playerSprite.hide();
}
//-------------------------------------------------------------------------
function draw() {
  if (gameState === 1) {
    gameScreen();
  }
  if (keyIsDown(13)) {gameScreen();}//enter
}
//-------------------------------------------------------------------------
function titleScreen() {
  gameState = 0;
  image(backgroundImage, 0, 0);
  startButton = createButton('Press "Enter" to Play');
  startButton.size(200);
  startButton.style('width:300px');
  startButton.position(width/2-130, height/2.1);
  startButton.mousePressed(gameScreen);
  gameReset = createButton('Press "F5" to Reload');
  gameReset.size(200);
  gameReset.style('width:300px');
  gameReset.position(width/2-130, height*0.58);
  moveControls = createButton('"WASD" to Move');
  moveControls.size(200);
  moveControls.position(width/2-80, height*0.95);
}
//-------------------------------------------------------------------------
function gameScreen() {
  // image(backgroundImage, 0, 0);
  gameState = 1;
  background('#ffeed1');
  startButton.hide();
  gameReset.hide();
  moveControls.hide();
  //display image of player sprite
  fill(0, 0);
  rect(playerX, playerY, 8, 16);
  // image(playerSprite, playerX, playerY);
  playerSprite.show();
  playerSprite.position(playerX + 16, playerY + 23);//----------------------
  if (keyIsDown(87)) {playerY -= playerSpeed;}//w
  if (keyIsDown(65)) {playerX -= playerSpeed;}//a
  if (keyIsDown(83)) {playerY += playerSpeed;}//s
  if (keyIsDown(68)) {playerX += playerSpeed;}//d
  //display image of opposing people sprite
  for (let i = 0; i < people.length; i++) {
    people[i].move();
    people[i].display();
  }
  fill(0);
  noStroke();
  textSize(24);
  textAlign(RIGHT);
  // text(score + ' seconds', 1480, 45);
  text(timer + playerX - 100 + ' nervousness', 1480, 25);
  counter++;
  if (counter === 60) {
    // score++;
    timer++;
    counter = 0;
  }
}
//-------------------------------------------------------------------------
class peopleSpriteClass {
  constructor() {
    this.x = 1500 + random(0, 1500);
    this.y = random(0, height);
    this.speed = 1;
  }
  move() {
    this.x -= this.speed;
    if (this.x <= -10) {
      this.x = 1500;
      this.y = random(0, height);
    }
  }
  display() {
    fill(0, 0);
    noStroke();
    rect(this.x, this.y, 12, 20);
    image(peopleSprite3, this.x, this.y);
    // peopleSprite3.position(this.x, this.y);
    hit = collideRectRect(playerX, playerY, 8, 16, this.x, this.y, 12, 20);
    if(hit){
      this.speed = 0.5;
      playerX -= 1;
      timer -= 0.5;
      // console.log(hit);
    } else {
      this.speed = 1;
    }
    if(playerX <= 1) {
      playerX++;
    } else if (playerX >= 1490) {
      playerX--;
    } else if (playerY <= 1) {
      playerY++;
    } else if (playerY >= 480) {
      playerY--;
    }
  }
}
//-------------------------------------------------------------------------
function pauseScreen() {
  text('Pause', width/2, height/2);
  // moveControls.show();
  //pause gameScreen
}

// function soundToggle() {
//   //toggle volume 0 or 100
// }

// function exitGame() {
//   //exit game
// }
