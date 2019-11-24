//Game Art
//by Eddson Jose
let gameState;
let startButton;
let toggleSound;
let exitButton;
let backgroundImage;
let playerSprite, playerX = 100, playerY = 250, playerSpeed = 0.5;
let peopleSprite, peopleX = 0, peopleY = 0, peopleXX = 0, peopleYY = 0, peopleSprites;
let people = [];
let hit = false;
let score = 0;
//-------------------------------------------------------------------------
function preload() {
  backgroundImage = loadImage('images/background.png');
  playerSprite = loadImage('images/playerSprite.png');
  peopleSprite = loadImage('images/peopleSprite.png');
}
//-------------------------------------------------------------------------
function setup() {
  createCanvas(1500, 500);
  background(50);
  titleScreen();
  for (let i = 0; i < 400; i++) {
    people.push(new peopleSpriteClass());
  }
}
//-------------------------------------------------------------------------
function draw() {
  if (gameState === 1) {
    gameScreen();
  }
}
//-------------------------------------------------------------------------
function titleScreen() {
  gameState = 0;
  image(backgroundImage, 0, 0);
  startButton = createButton('Play Game');
  startButton.size(200);
  startButton.position(width/2-100, height/2);
  startButton.mousePressed(gameScreen);
  toggleSound = createButton('Sound');
  toggleSound.size(200);
  toggleSound.position(width/2-100, height*0.6);
  toggleSound.mousePressed(soundToggle);
  // exitButton = createButton('Exit Game');
  // exitButton.size(200);
  // exitButton.position(width/2-100, height*0.7);
  // exitButton.mousePressed(exitGame);
}
//-------------------------------------------------------------------------
function gameScreen() {
  // image(backgroundImage, 0, 0);
  gameState = 1;
  background(200);
  startButton.hide();
  toggleSound.hide();
  // exitButton.hide();
  //display image of player sprite
  fill(0, 0);
  rect(playerX, playerY, 12, 20);
  image(playerSprite, playerX, playerY);
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
  text(score + playerX, 1480, 25);
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
    image(peopleSprite, this.x, this.y);
    hit = collideRectRect(playerX, playerY, 12, 20, this.x, this.y, 12, 20);
    if(hit){
      this.speed = 0.5;
      playerX -= 1;
      // console.log(hit);
    } else {
      this.speed = 1;
    }
  }
}
//-------------------------------------------------------------------------
function pauseScreen() {
  text('Pause', width/2, height/2);
  exitButton.show();
  //pause gameScreen
}

function soundToggle() {
  //toggle volume 0 or 100
}

// function exitGame() {
//   //exit game
// }
