//this is inefficent
class peopleSpriteClassTwo {
  constructor() {
    this.x1 = 1502 + random(2, 1502);
    this.y1 = random(148, height - 2);
    this.speed1 = random(0.5, 2);

    this.x2 = 1500 + random(0, 1500);
    this.y2 = random(150, height);
    this.speed2 = random(0.5, 2);

    this.x3 = 1501 + random(1, 1501);
    this.y3 = random(149, height - 1);
    this.speed3 = random(0.6, 1.9);
  }
  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  move() {
    this.x1 -= this.speed1;
    if (this.x1 <= -12) {
      this.x1 = 1502;
      this.y1 = random(148, height - 2);
    }

    this.x2 -= this.speed2;
    if (this.x2 <= -10) {
      this.x2 = 1500;
      this.y2 = random(150, height);
    }

    this.x3 -= this.speed3;
    if (this.x3 <= -11) {
      this.x3 = 1501;
      this.y3 = random(149, height - 1);
    }
  }
  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  display() {
    fill(0, 0); noStroke();
    rect(this.x1, this.y1, 12, 20);
    image(peopleSprite5, this.x1, this.y1);
    hit = collideRectRect(playerX, playerY, 8, 16, this.x1, this.y1, 12, 20);
    //hit event
    if(hit){this.speed1 = 0.1; playerX -= 3; score -= 1;}
    else {this.speed1 = random(0.7, 2.1);}

    fill(0, 0); noStroke();
    rect(this.x2, this.y2, 12, 20);
    image(peopleSprite2, this.x2, this.y2);
    hit = collideRectRect(playerX, playerY, 8, 16, this.x2, this.y2, 12, 20);
    //hit event
    if(hit){this.speed2 = 0.1; playerX -= 3; score -= 1;}
    else {this.speed2 = random(0.5, 2);}

    fill(0, 0); noStroke();
    rect(this.x3, this.y3, 12, 20);
    image(peopleSprite4, this.x3, this.y3);
    hit = collideRectRect(playerX, playerY, 8, 16, this.x3, this.y3, 12, 20);
    //hit event
    if(hit){this.speed3 = 0.1; playerX -= 3; score -= 1;}
    else {this.speed3 = random(0.6, 1.9);}
  }
}
