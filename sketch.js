//Game Art
//by Eddson Jose
let description = [
  {
    text_1: "A person with social anxiety...",
    text_2: "may practice engaging in social interactions...",
    text_3: "to decrease their feelings of nervousness.",
    text_4: ".",
    text_5: "Without constant practice...",
    text_6: "social interactions become...",
    text_7: "something feared.",
    text_8: "Practice..."
  }
];
let gameState, startButton, gameReset, moveControls;
let backgroundImage, gameScreenBackground, clouds_overlay, pause;
let gameScreen_x = 0, gameScreen_x2, scrollSpeed = 0.5, clouds_overlay_x = -1500;
let playerSprite, playerX = 100, playerY = 250, playerSpeed = 1;//0.5 original speed
let peopleSprite, peopleSprite2, peopleSprite3;
let peopleSprite2Gif;
let peopleX = 0, peopleY = 0, peopleXX = 0, peopleYY = 0, people = [], peopleTwo = [];
let hit = false;
let counter = 0;
let score = 0, score2 = 0;
let sky_0, sky_0_speed = 0.1, sky_0_x = 0, sky_0_x2;
let sky_1, sky_1_speed = 0.2, sky_1_x = 0, sky_1_x2;
let sky_2, sky_2_speed = 0.3, sky_2_x = 0, sky_2_x2;
let ground, ground_speed = 0.1, ground_x = 0, ground_x2;
let cloud_shadows, cloud_shadow_speed = 0.5, cloud_shadow_x = 0, cloud_shadow_x2;
let aerial_perspective, title;
let description_x = 1800;
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function preload() {//createImg is for gif
  //background
  backgroundImage = loadImage('images/gameArt_background.png');
  gameScreenBackground = loadImage('images/gameScreen_background.png');
  pause = loadImage('images/pause.png');
  clouds_overlay = loadImage('images/clouds_overlay.png');
  sky_0 = loadImage('images/sky_0.png');
  sky_1 = loadImage('images/sky_1.png');
  sky_2 = loadImage('images/sky_2.png');
  ground = loadImage('images/ground.png');
  cloud_shadow = loadImage('images/cloud_shadows.png');
  aerial_perspective = loadImage('images/aerial_perspective.png');
  title = loadImage('images/title.png');
  //people & player
  playerSprite = createImg("images/playerSprite.gif");
  peopleSprite2 = loadImage('images/peopleSprite2.png');
  peopleSprite3 = loadImage('images/peopleSprite3.png');
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function setup() {
  createCanvas(1500, 500); background(50); titleScreen();
  for (let i = 0; i < 60; i++) {//80 = hard
    people.push(new peopleSpriteClass());
  }
  for (let i = 0; i < 150; i++) {//200 = hard
    peopleTwo.push(new peopleSpriteClassTwo());
  }
  playerSprite.hide();
  gameScreen_x2 = width;
  sky_0_x2 = width;
  sky_1_x2 = width;
  sky_2_x2 = width;
  ground_x2 = -width;
  cloud_shadow_x2 = width;
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function draw() {
  clouds();
  if (gameState === 0) {image(title, 0, 0);}//titleScreen
  if (gameState === 1) {gameScreen();}//gameScreen
  if (gameState === 2) {pauseScreen();}//pauseScreen
  if (keyIsDown(13)) {gameScreen();}//enter
  cloudShadows();
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function titleScreen() {
  gameState = 0;
  startButton = createButton('Press "Enter" to Play');
  startButton.size(200);
  startButton.style('width:800px');
  startButton.position(width/4, height*0.56);
  startButton.mousePressed(gameScreen);
  // gameReset = createButton('Press "F5" for Main Menu');
  // gameReset.size(200);
  // gameReset.style('width:800px');
  // gameReset.position(width/4, height*0.55);
  // moveControls = createButton('"WASD" to Move');
  // moveControls.size(200);
  // moveControls.position(width/2-80, height*0.99);
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function gameScreen() {
  gameState = 1;
  //hide buttons
  startButton.hide();
  // gameReset.hide();
  // moveControls.hide();
  //display image of player sprite
  fill(0, 0);
  rect(playerX, playerY, 8, 16);
  playerSprite.show();
  playerSprite.position(playerX + 16, playerY + 23);
  //wasd controls
  if (keyIsDown(87)) {playerY -= playerSpeed - 0.6;}//w
  if (keyIsDown(65)) {playerX -= playerSpeed;}//a
  if (keyIsDown(83)) {playerY += playerSpeed - 0.6;}//s
  if (keyIsDown(68)) {playerX += playerSpeed;}//d
  if (keyIsDown(80)) {//p, pauseScreen
    gameState = 2;
    startButton.show();
    // gameReset.show();
  }
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
  fill(255); noStroke(); textSize(24); textAlign(RIGHT);
  text(score + playerX - 100 + ' nervousness', 1480, 25);
  score2 = score + playerX - 100
  counter++;
  if (counter === 60) {score += 10; counter = 0;}
  //collisions
  if(playerX <= 1) {playerX = 2;}
  else if (playerX >= 1490) {playerX--; end();}
  else if (playerY <= 150) {playerY = 151;}
  else if (playerY >= 480) {playerY = 479;}
  //if player passes the boundaries
  if (playerY < 70) {
    fill(255);
    text('Life is too precious. Dont dream too long.', 460, 30);
  }
  if (playerY > 550) {
    fill(0);
    text('Life is too precious. Dont dream too long.', 460, 490);
  }
  //scrolling description
  fill(255); textSize(72); textAlign(LEFT);
  text('A person with social anxiety may practice engaging in social interactions to decrease their feelings of nervousness. Avoiding social interactions increases nervousness. The current is endless. Define your own goal.', description_x, 90);
  description_x -= 0.5;
  if (description_x < -8000) {description_x = 3000;}
  //player's speed doubles if nervousness is below -100
  textSize(24);
  if (score2 < -100) {
    text('Social interactions are now easier', 15, 25);
    playerSpeed = 2;
  } else {
    playerSpeed = 1;
  }
  //endgame
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
  if (ground_x < 0){ground_x = width;}
  if (ground_x2 < 0){ground_x2 = width;}
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function cloudShadows() {
  image(cloud_shadow, cloud_shadow_x, 0);
  image(cloud_shadow, cloud_shadow_x2, 0);

  cloud_shadow_x += cloud_shadow_speed;
  cloud_shadow_x2 += cloud_shadow_speed;

  if (cloud_shadow_x > width){
    cloud_shadow_x = -width;}
  if (cloud_shadow_x2 > width){
    cloud_shadow_x2 = -width;}

  image(aerial_perspective, 0, 0);
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function end() {

}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function pauseScreen() {
  image(pause, 0, 0);
  gameState = 2;
  // fill('#33302a'); textSize(42);
  // text('P A U S E', width/2 - 100, height/2 - 75);
  startButton.show();
  // gameReset.show();
  playerSprite.hide();
  // moveControls.show();
  //pause gameScreen
}
