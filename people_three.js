//this is also inefficient
class peopleSpriteClassThree {
  constructor() {
    this.x1 = 1503 + random(0, 1503);
    this.y1 = random(147, height - 3);
    this.speed1 = random(0.8, 2.2);

    this.x2 = 1500 + random(0, 1500);
    this.y2 = random(150, height);
    this.speed2 = random(0.5, 2);

    this.x3 = 1501 + random(0, 1501);
    this.y3 = random(149, height - 1);
    this.speed3 = random(0.6, 2.1);

    this.x4 = 1502 + random(0, 1502);
    this.y4 = random(148, height - 2);
    this.speed4 = random(0.7, 1.9);
  }
  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  move() {
    this.x1 -= this.speed1;
    if (this.x1 <= -13) {
      this.x1 = 1503;
      this.y1 = random(147, height - 3);
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

    this.x4 -= this.speed4;
    if (this.x4 <= -12) {
      this.x4 = 1502;
      this.y4 = random(148, height - 2);
    }
  }
  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  display() {
    fill(0, 0); noStroke();
    rect(this.x1, this.y1, 12, 20);
    image(peopleSprite3, this.x1, this.y1);
    hit = collideRectRect(playerX, playerY, 8, 16, this.x1, this.y1, 12, 20);
    //hit event
    if(hit) {this.speed1 = 0.5; playerX = 3000;}
    else {this.speed1 = random(0.8, 2.2);}

    fill(0, 0); noStroke();
    rect(this.x2, this.y2, 12, 20);
    image(peopleSprite4, this.x2, this.y2);
    hit = collideRectRect(playerX, playerY, 8, 16, this.x2, this.y2, 12, 20);
    //hit event
    if(hit) {this.speed2 = 0.5; playerX = 3000;}
    else {this.speed2 = random(0.5, 2);}

    fill(0, 0); noStroke();
    rect(this.x3, this.y3, 12, 20);
    image(peopleSprite5, this.x3, this.y3);
    hit = collideRectRect(playerX, playerY, 8, 16, this.x3, this.y3, 12, 20);
    //hit event
    if(hit) {this.speed3 = 0.5; playerX = 3000;}
    else {this.speed3 = random(0.6, 2.1);}

    fill(0, 0); noStroke();
    rect(this.x4, this.y4, 12, 20);
    image(peopleSprite2, this.x4, this.y4);
    hit = collideRectRect(playerX, playerY, 8, 16, this.x4, this.y4, 12, 20);
    //hit event
    if(hit) {this.speed4 = 0.5; playerX = 3000;}
    else {this.speed4 = random(0.7, 1.9);}
  }

}
