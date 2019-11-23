//Game Art
//by Eddson Jose

//declare variables for:
//game state
//time score
//buttons
let gameState;
let startButton;
let toggleSound;
let exitButton;
let backgroundImage;
let playerSprite, playerX = 100, playerY = 250, playerSpeed = 1;
let peopleSprite, peopleX, peopleY, peopleSprites;
let people = [];
let hit = false;

function preload() {
  backgroundImage = loadImage('images/background.png');
  playerSprite = loadImage('images/playerSprite.png');
  peopleSprite = loadImage('images/peopleSprite.png');
}

function setup() {
  createCanvas(1500, 500);
  background(50);
  titleScreen();
  for (let i = 0; i < 400; i++) {
    people.push(new peopleSpriteClass());
  }
}

function draw() {
  if (gameState === 1) {
    gameScreen();
  }



  //if game state is "titlescreen"
  //then execute the titlescreen function

  //if game state is "gamescreen"
  //then execute the gamescreen function

  //if player presses "escape" key
  //change game state to "pausescreen"
  //then execute the pausescreen function

  //if player presses "return to game" button
  //change game state to "gamescreen"
  //then execute the gamescreen function

  //if player presses "leave game" button
  //change game state to "titlescreen"
  //then execute the titlescreen function
}

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
  exitButton = createButton('Exit Game');
  exitButton.size(200);
  exitButton.position(width/2-100, height*0.7);
  exitButton.mousePressed(exitGame);
  //display custom background
  //display game title
  //display button for "play game"
  //display button for "leave game"
  //display toggle for "sound"
  //display diagram for controls
}

function gameScreen() {
  gameState = 1;
  background(200);
  text('gameScreen', width/2, height/3);
  startButton.hide();
  toggleSound.hide();
  exitButton.hide();
  //display image of player sprite
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
}

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
    image(peopleSprite, this.x, this.y);
  }
}
















function pauseScreen() {
  text('Pause', width/2, height/2);
  exitButton.show();
  //pause gameScreen
}

function soundToggle() {
  //toggle volume 0 or 100
}

function exitGame() {
  //exit game
}
