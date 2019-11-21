//Game Art
//by Eddson Jose

//declare variables for:
//game state
//time score
//buttons
let startButton;
let toggleSound;
let exitButton;
let backgroundImage;

function preload() {
  backgroundImage = loadImage('images/background.png');
}

function setup() {
  createCanvas(1500, 500);
  background(50);
  titleScreen();
}

function draw() {
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
  background(200);
  text('gameScreen', width/2, height/3);
  startButton.hide();
  toggleSound.hide();
  exitButton.hide();
  //display image of player sprite
  //display image of opposing people sprite
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
