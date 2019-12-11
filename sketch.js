//Game Art
//by Eddson Jose
let peopleSprites = [];
let gameState, startButton;
let backgroundImage, gameScreenBackground, clouds_overlay, pause;
let gameScreen_x = 0, gameScreen_x2, scrollSpeed = 0.5, clouds_overlay_x = -1500;
let playerSprite, playerX = 100, playerY = 250, playerSpeed = 1;//1 original speed
let playerSpriteOpposite, playerSpriteOppositeX = 1400, playerSpriteOppositeY = 250;
let peopleSprite, peopleSprite2, peopleSprite3, peopleSprite4;
let people = [], peopleTwo = [], peopleThree = [], peopleFour = [];
let hit = false;
let counter = 0, counter2 = 0, counter3 = 0, toggle2 = 0;
let score = 0, score2 = 0;
let sky_0, sky_0_speed = 0.1, sky_0_x = 0, sky_0_x2;
let sky_1, sky_1_speed = 0.2, sky_1_x = 0, sky_1_x2;
let sky_2, sky_2_speed = 0.3, sky_2_x = 0, sky_2_x2;
let ground, ground_speed = 0.1, ground_x = 0, ground_x2;
let cloud_shadows, cloud_shadow_speed = 0.5, cloud_shadow_x = 0, cloud_shadow_x2;
let aerial_perspective, title;
let description_x = 1800; description_x2 = 1600; description_x3 = 1600;
// let playerSpeed2 = 5;
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
  playerSprite = loadImage("images/playerSprite.png");//gif = createImg
  playerSpriteOpposite = loadImage("images/playerSpriteOpposite.png");
  peopleSprite2 = loadImage('images/peopleSprite2.png');
  peopleSprite3 = loadImage('images/peopleSprite3.png');
  peopleSprite4 = loadImage('images/peopleSprite4.png');
  peopleSprite5 = loadImage('images/peopleSprite5.png');
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function setup() {
  createCanvas(1500, 500); background(50); titleScreen();
  for (let i = 0; i < 60; i++) {//200 = hard
    people.push(new peopleSpriteClass());
  }
  for (let i = 0; i < 80; i++) {//200 = hard
    peopleTwo.push(new peopleSpriteClassTwo());
  }
  for (let i = 0; i < 2; i++) {
    peopleThree.push(new peopleSpriteClassThree());
  }
  for (let i = 0; i < 2; i++) {
    peopleFour.push(new peopleSpriteClassThree());
  }
  // playerSprite.hide();
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
  clouds();//titleScreen
  if (gameState === 0) {image(title, 0, 0);}
  else if (gameState === 1) {gameScreen();}//gameScreen
  else if (gameState === 2) {gameScreen2();}//end scene
  else if (gameState === 3) {gameScreen3();}
  else if (gameState === 4) {gameScreen4();}
  if (keyIsDown(13)) {gameScreen();}//enter
  cloudShadows();
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function titleScreen() {
  gameState = 0;
  startButton = createButton('Press "Enter" to Play');
  startButton.size(200);
  startButton.style('width:800px');//original 800px
  startButton.class('blinking');
  startButton.position(width/4, height*0.56);
  startButton.mousePressed(gameScreen);
  }
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function gameScreen() {
  gameState = 1;
  startButton.hide();
  textStyle(BOLD);
  //display image of player sprite
  fill(0, 0);
  rect(playerX, playerY, 8, 16);
  image(playerSprite, playerX, playerY);
  //wasd controls
  if (keyIsDown(87)) {playerY -= playerSpeed - 0.6;}//w
  if (keyIsDown(65)) {playerX -= playerSpeed;}//a
  if (keyIsDown(83)) {playerY += playerSpeed - 0.6;}//s
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

  //score/nervousness/confidence
  score2 = score + playerX - 100
  fill(255); noStroke(); textSize(24); textAlign(RIGHT);
  if (score2 >= 0) {text(score2 + ' NERVOUSNESS', 1480, 25);}
  if (score2 < 0) {text(score2 * -1 + ' CONFIDENCE', 1480, 25);}
  counter++;
  if (counter === 60) {score += 10; counter = 0;}
  //collisions
  if(playerX <= 1) {playerX = 2;}
  else if (playerX >= 1490) {
    playerX = 100;
    playerY = height/2;
    gameScreen2();
  }
  else if (playerY <= 150) {playerY = 151;}
  else if (playerY >= 480) {playerY = 479;}
  //if player passes the boundaries
  fill('#33302a'); textAlign(CENTER);
  if (playerY < 70) {text('LIFE IS TOO PRECIOUS. DON\'T DREAM TOO LONG.', width/2, 150);}
  if (playerY > 550) {text('LIFE IS TOO PRECIOUS. DON\'T DREAM TOO LONG.', width/2, 150);}
  //scrolling description
  fill(255); textSize(72); textAlign(LEFT);
  text('MOST PEOPLE CAN GET THROUGH AN UNCOMFORTABLE SOCIAL SITUATION WITHOUT TOO MUCH STRESS.', description_x, 90);
  description_x -= 0.8;
  if (description_x < -7000) {description_x = 3000;}
  //player's speed doubles if nervousness is below -100
  textSize(24);
  if (score2 < -100) {text('CONFIDENCE IS GREATER THAN 100. SOCIAL INTERACTIONS ARE NOW EASIER.', 15, 25);playerSpeed = 2;}
  else {playerSpeed = 1;}
  //score does not go below -1000
  if (score2 <= -1000) {score += 100;}
  //directions
  counter2++;
  if (counter2 <= 450) {
    fill('#33302a');
    textSize(24);
    textAlign(CENTER);
    text('P R A C T I C E  E N G A G I N G  I N', width/2, height/2 - 50);
    text('S O C I A L  I N T E R A C T I O N S  T O', width/2, height/2);
    text('D E C R E A S E  T H E  F E E L I N G  O F', width/2, height/2 + 50);
    text('N E R V O U S N E S S .', width/2, height/2 + 100);
    text('A V O I D  S O C I A L  I N T E R A C T I O N S', width/2, height/2 + 150);
    text('T O  I N C R E A S E  N E R V O U S N E S S .', width/2, height/2 + 200);
  }
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function gameScreen2() {
  gameState = 2;
  startButton.hide();
  //player
  fill(0, 0);
  rect(playerX, playerY, 10, 16);
  image(playerSprite, playerX, playerY);
  //player opposite
  fill(0, 0);
  rect(playerSpriteOppositeX, playerSpriteOppositeY, 10, 16);
  image(playerSpriteOpposite, playerSpriteOppositeX, playerSpriteOppositeY);
  //wasd controls
  if (keyIsDown(87)) {playerY -= playerSpeed - 0.6; playerSpriteOppositeY -= playerSpeed - 0.6;}//w
  if (keyIsDown(65)) {playerX -= playerSpeed; playerSpriteOppositeX += playerSpeed;}//a
  if (keyIsDown(83)) {playerY += playerSpeed - 0.6; playerSpriteOppositeY += playerSpeed - 0.6;}//s
  if (keyIsDown(68)) {playerX += playerSpeed; playerSpriteOppositeX -= playerSpeed;}//d
  //hit event
  hit = collideRectRect(playerX, playerY, 10, 16, playerSpriteOppositeX, playerSpriteOppositeY, 10, 16);
  let toggle = 0;
  if(hit){playerSpeed = 0; toggle++;}
  else {playerSpeed = 1;}
  //collisions
  if(playerX <= 1) {playerX = 1;}
  else if (playerY <= 150) {playerY = 150;}
  else if (playerY >= 480) {playerY = 480;}
  if (playerSpriteOppositeX >= 1480) {playerSpriteOppositeX = 1480;}
  else if (playerSpriteOppositeY <= 150) {playerSpriteOppositeY = 151;}
  else if (playerSpriteOppositeY >= 480) {playerSpriteOppositeY = 479;}
  //opposite player collissions
  if(playerSpriteOppositeX <= 1) {gameScreen3();}
  else if (playerSpriteOppositeX >= 1490) {playerSpriteOppositeX = 1490;}
  else if (playerSpriteOppositeY <= 150) {playerSpriteOppositeY = 151;}
  else if (playerSpriteOppositeY >= 480) {playerSpriteOppositeY = 479;}
  //display image of people sprite
  if (toggle === 1) {toggle2++;}
  if (toggle2 >= 1) {
  for (let i = 0; i < peopleThree.length; i++) {
      peopleThree[i].move();
      peopleThree[i].display();
    }
  }
  //if player passes the boundaries
  textSize(24); fill('#33302a'); textAlign(CENTER);
  if (playerY < 70) {text('LIFE IS TOO PRECIOUS. DON\'T DREAM TOO LONG.', width/2, 150);}
  if (playerY > 550) {text('LIFE IS TOO PRECIOUS. DON\'T DREAM TOO LONG.', width/2, 150);}
  //scrolling description
  fill(255); textSize(72); textAlign(LEFT);
  text('IF THE SITUATION IS OFTEN TOO STRESSFUL AND IT BEGINS TO NEGATIVELY AFFECT YOUR LIFE, ASK FOR HELP.', description_x2, 90);
  description_x2 -= 0.8;
  if (description_x2 < -7000) {description_x2 = 3000;}
  //directions
  counter3++;
  if (counter3 <= 450) {
    fill('#33302a');
    textSize(24);
    textAlign(CENTER);
    text('D O N \' T  S L O W', width/2, height/2 - 50);
    text('Y O U R S E L F  D O W N .', width/2, height/2);
    text('', width/2, height/2 + 50);
    text('', width/2, height/2 + 100);
    text('A S K I N G  F O R  H E L P  I S', width/2, height/2 + 150);
    text('N E V E R  A  B A D  I D E A .', width/2, height/2 + 200);
  }
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function gameScreen3() {
  gameState = 3;
  startButton.hide();
  fill(0, 0);
  image(playerSpriteOpposite, playerSpriteOppositeX + 1300, playerSpriteOppositeY);
  //wasd controls
  if (keyIsDown(87)) {playerSpriteOppositeY -= playerSpeed - 0.6;}//w
  if (keyIsDown(65)) {playerSpriteOppositeX += playerSpeed;}//a
  if (keyIsDown(83)) {playerSpriteOppositeY += playerSpeed - 0.6;}//s
  if (keyIsDown(68)) {playerSpriteOppositeX -= playerSpeed;}//d
  //display image of people sprite
  for (let i = 0; i < people.length; i++) {
    people[i].move();
    people[i].display();
  }
  for (let i = 0; i < peopleTwo.length; i++) {
    peopleTwo[i].move();
    peopleTwo[i].display();
  }
  //collisions
  if(playerSpriteOppositeX <= -1300) {gameState = 4;}
  else if (playerSpriteOppositeX >= 190) {playerSpriteOppositeX = 190;}
  else if (playerSpriteOppositeY <= 150) {playerSpriteOppositeY = 151;}
  else if (playerSpriteOppositeY >= 480) {playerSpriteOppositeY = 479;}
  //if player passes the boundaries

  textSize(24); fill('#33302a'); textAlign(CENTER);
  if (playerY < 70) {text('LIFE IS TOO PRECIOUS. DON\'T DREAM TOO LONG.', width/2, 150);}
  if (playerY > 550) {text('LIFE IS TOO PRECIOUS. DON\'T DREAM TOO LONG.', width/2, 150);}
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
function gameScreen4() {
  gameState = 4;
  //scrolling description
  fill(255); textSize(72); textAlign(LEFT);
  text('GAME OVER. MADE BY EDDSON JOSE', description_x3, 90);
  description_x3 -= 0.8;
  if (description_x3 < -7000) {description_x3 = 3000;}

  fill('#33302a');
  textSize(14);
  textAlign(CENTER);
  text('A G A I N S T   T H E   C U R R E N T   I S   A   G A M E   A B O U T   S O C I A L   A N X I E T Y .', width/2, height/2 - 100);
  text('T H E   P L A Y E R   M U S T   T R A V E R S E   A N   E N D L E S S   C R O W D   O F   P E O P L E .', width/2, height/2 - 80);
  text('T H E   P L A Y E R   C A N   C H O O S E   T O   M O V E   F O R W A R D   ( A G A I N S T   T H E   C R O W D )', width/2, height/2 - 60);
  text('W H I L E   I N C R E A S I N G   T H E I R   F E E L I N G S   O F   N E R V O U S N E S S   O R', width/2, height/2 - 40);
  text('T H E   P L A Y E R   C A N   C H O O S E   T O   I N T E R A C T   W I T H   P E O P L E   T O   D E C R E A S E', width/2, height/2 - 20);
  text('T H E I R   N E R V O U S   F E E L I N G S   A N D   I N C R E A S E   T H E I R   C O N F I D E N C E .', width/2, height/2);
  text('T H E   P L A Y E R   M O V E S   T H R O U G H   T H E   C R O W D   E A S I E R / F A S T E R   I F   T H E Y', width/2, height/2 + 20);
  text('A R E   C O N F I D E N T .   I F   T H E   P L A Y E R   I S   N E R V O U S   T H E Y   M O V E   S L O W E R .', width/2, height/2 + 40);
  text('T H E   P L A Y E R   W I L L   A L S O   E N G A G E   I N   A   S I T U A T I O N   A G A I N S T   T H E M S E L F,', width/2, height/2 + 60);
  text('F O R C I N G   T H E   P L A Y E R   I N   A   S T A N D S T I L L .   I T   I S   A   P E R S O N \' S', width/2, height/2 + 80);
  text('O W N   J U D G E M E N T   A N D   W I L L I N G N E S S   T O   M O V E   A G A I N S T  T H E I R', width/2, height/2 + 100);
  text('A N X I E T Y   I N   O R D E R   T O   M A K E   I T   B E T T E R .   T O W A R D S   T H E   E N D ,', width/2, height/2 + 120);
  text('M E M O R I E S   O F   A N X I E T Y   C A N   N O T   B E   C O M P L E T E L Y   F O R G O T T E N   T H U S', width/2, height/2 + 140);
  text('T H E   P L A Y E R \' S   C O N T R O L S   R E M A I N   T H E   S A M E   B U T   M O V E   I N   T H E', width/2, height/2 + 160);
  text('O P P O S I T E   D I R E C T I O N .   N O N E T H E L E S S ,   T H E Y   A R E   D O I N G   B E T T E R .', width/2, height/2 + 180);
  text('T H E   G A M E   C O N C L U D E S   T H E   S A M E   W A Y   I T   B E G A N   -   T H I S   T I M E', width/2, height/2 + 200);
  text('M O V I N G   W I T H   T H E   C U R R E N T .', width/2, height/2 + 220);
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
  if (cloud_shadow_x > width) {cloud_shadow_x = -width;}
  if (cloud_shadow_x2 > width) {cloud_shadow_x2 = -width;}
  image(aerial_perspective, 0, 0);
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
