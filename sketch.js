//Game Art
//by Eddson Jose
let gameState, startButton, gameReset, moveControls;
let backgroundImage, gameScreenBackground, clouds_overlay;
let gameScreen_x = 0, gameScreen_x2, scrollSpeed = 0.5, clouds_overlay_x = -1500;
let playerSprite, playerX = 100, playerY = 250, playerSpeed = 1;//0.5 original speed
let peopleSprite, peopleSprite2, peopleSprite3;
let peopleX = 0, peopleY = 0, peopleXX = 0, peopleYY = 0, people = [], peopleTwo = [];
let hit = false;
let counter = 0;
let score = 0;
let sky_0, sky_0_speed = 0.1, sky_0_x = 0, sky_0_x2;
let sky_1, sky_1_speed = 0.2, sky_1_x = 0, sky_1_x2;
let sky_2, sky_2_speed = 0.3, sky_2_x = 0, sky_2_x2;
let ground, ground_speed = 0.1, ground_x = 0, ground_x2;
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function preload() {//createImg is for gif
  //background
  backgroundImage = loadImage('images/gameArt_background.png');
  gameScreenBackground = loadImage('images/gameScreen_background.png');
  clouds_overlay = loadImage('images/clouds_overlay.png');
  sky_0 = loadImage('images/sky_0.png');
  sky_1 = loadImage('images/sky_1.png');
  sky_2 = loadImage('images/sky_2.png');
  ground = loadImage('images/ground.png');
  //people & player
  playerSprite = createImg("images/playerSprite.gif");
  peopleSprite2 = loadImage('images/peopleSprite2.png');
  peopleSprite3 = loadImage('images/peopleSprite3.png');
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function setup() {
  createCanvas(1500, 500); background(50); titleScreen();
  for (let i = 0; i < 150; i++) {
    people.push(new peopleSpriteClass());
  }
  for (let i = 0; i < 150; i++) {
    peopleTwo.push(new peopleSpriteClassTwo());
  }
  playerSprite.hide();
  gameScreen_x2 = width;
  sky_0_x2 = width;
  sky_1_x2 = width;
  sky_2_x2 = width;
  ground_x2 = -width;
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function draw() {
  clouds();

  if (gameState === 1) {gameScreen();}//gameScreen
  if (keyIsDown(13)) {gameScreen();}//enter
}
//-------------------------------------------------------------------------
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
//-------------------------------------------------------------------------
function gameScreen() {
  gameState = 1;

  // image(gameScreenBackground, gameScreen_x, 0);
  // image(gameScreenBackground, gameScreen_x2, 0);
  //
  // gameScreen_x -= scrollSpeed;
  // gameScreen_x2 -= scrollSpeed;
  //
  // if (gameScreen_x < -width){
  //   gameScreen_x = width;
  // }
  // if (gameScreen_x2 < -width){
  //   gameScreen_x2 = width;
  // }

  clouds();


  // background('#ffeed1');
  //hide buttons
  startButton.hide(); gameReset.hide(); moveControls.hide();
  //display image of player sprite
  fill(0, 0);
  rect(playerX, playerY, 8, 16);
  playerSprite.show();
  playerSprite.position(playerX + 16, playerY + 23);
  //wasd controls
  if (keyIsDown(87)) {playerY -= playerSpeed;}//w
  if (keyIsDown(65)) {playerX -= playerSpeed;}//a
  if (keyIsDown(83)) {playerY += playerSpeed;}//s
  if (keyIsDown(68)) {playerX += playerSpeed;}//d
  //display image of people sprite
  for (let i = 0; i < people.length; i++) {
    people[i].move();
    people[i].display();
  }
  for (let i = 0; i < peopleTwo.length; i++) {
    peopleTwo[i].move();
    peopleTwo[i].display();
  }
  //score/nervousness
  fill(0); noStroke(); textSize(24); textAlign(RIGHT);
  text(score + playerX - 100 + ' nervousness', 1480, 25);
  counter++;
  if (counter === 60) {score++; counter = 0;}

}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function clouds() {
  image(sky_0, sky_0_x, 0);
  image(sky_0, sky_0_x2, 0);
  image(sky_1, sky_1_x, 0);
  image(sky_1, sky_1_x2, 0);
  image(sky_2, sky_2_x, 0);
  image(sky_2, sky_2_x2, 0);
  image(ground, ground_x - 1500, 0);
  image(ground, ground_x2 - 1, 0);

  sky_0_x += sky_0_speed;
  sky_0_x2 += sky_0_speed;
  sky_1_x += sky_1_speed;
  sky_1_x2 += sky_1_speed;
  sky_2_x += sky_2_speed;
  sky_2_x2 += sky_2_speed;
  ground_x -= ground_speed;
  ground_x2 -= ground_speed;

  if (sky_0_x > width){sky_0_x = -width;}
  if (sky_0_x2 > width){sky_0_x2 = -width;}
  if (sky_1_x > width){sky_1_x = -width;}
  if (sky_1_x2 > width){sky_1_x2 = -width;}
  if (sky_2_x > width){sky_2_x = -width;}
  if (sky_2_x2 > width){sky_2_x2 = -width;}
  if (ground_x < 0){
    ground_x = width;}
  if (ground_x2 < 0){
    ground_x2 = width;}
}
//-------------------------------------------------------------------------
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
