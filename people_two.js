class peopleSpriteClassTwo {
  constructor() {
    this.x2 = 1500 + random(0, 1500);
    this.y2 = random(150, height);
    this.speed = random(1, 2);
  }
  move() {
    this.x2 -= this.speed;
    if (this.x2 <= -10) {
      this.x2 = 1500;
      this.y2 = random(150, height);
    }
  }
  display() {
    fill(0, 0); noStroke();
    rect(this.x2, this.y2, 12, 20);
    image(peopleSprite2, this.x2, this.y2);
    hit = collideRectRect(playerX, playerY, 8, 16, this.x2, this.y2, 12, 20);
    //hit event
    if(hit){this.speed = 1; playerX -= 3; score -= 1;}
    else {this.speed = random(1, 2);}
    //collisions
    if(playerX <= 1) {playerX++;}
    else if (playerX >= 1490) {playerX--;}
    else if (playerY <= 150) {playerY++;}
    else if (playerY >= 480) {playerY--;}
  }
}
