/*
 * A simple test script for spritelib
 */

var game;
var rocket;
var dead = false;
var speed = 200;
var enemySpeed = 350;
var enemyCount = 5;
var score = 0;


function init() {

    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    game = new Game(canvas);

    var background_img = document.getElementById("background");
    var back = new Background(0,0,1280,720);
    back.setImage(background_img);
    game.setBackground(back);


    //Adds the helicopter images to the player object
    var pimg = document.getElementById("player");
    //var player = game.getPlayer();
    playerSprite = new Sprite(300,300,128,52);
    playerSprite.imageBase(pimg);
    playerSprite.addImage(2,28,128,52);
    playerSprite.addImage(134,28,128,52);
    playerSprite.addImage(266,28,128,52);
    playerSprite.addImage(398,28,128,52);
    playerSprite.addImage(2,160,128,52);
    playerSprite.flipx();
    playerSprite.addAnimation("fly",[3, 2, 1, 0]);
    playerSprite.addAnimation("dead",[4,0,0,2,2,3,4,4]);
    playerSprite.animate("fly");
    game.addSprite(playerSprite)
    playerSprite.setVelocity(0,speed);
    playerSprite.collideB = function(r){
      playerSprite.setVelocity(0,0);

    }
    //Adds the mouse controls to the playerSprite
    canvas.onmousedown = function(e){
      if(!dead){
        playerSprite.setVelocity(0,-speed);
        playerSprite.y = 50;
      }
    }
    canvas.onmouseup = function(e){
      if(!dead){
        playerSprite.setVelocity(0,speed)
      }
    }


    //Collision for top and bottom of canvas
    playerSprite.collideB = function(r){
      if(!dead){
        if(playerSprite.rect.y < 300){
          playerSprite.setVelocity(0,speed * 3);
        }
        else {
          playerSprite.setVelocity(0,0);
        }
        playerSprite.animate("dead");
        dead = true;
      }
    }

    //Sprite for enemies
    for (i = 0; i < enemyCount; i ++){
      var eimg = document.getElementById("enemy");
      var enemySprite = new Sprite(1400 + (600 * i),Math.random() * (525 - 75) + 75,208,92)
      enemySprite.imageBase(eimg);
      enemySprite.addImage(0,0,104,46);
      enemySprite.addImage(132,8,104,40);
      enemySprite.addImage(264,12,104,34);
      enemySprite.addImage(396,8,104,38);
      enemySprite.addImage(0,140,104,46);
      enemySprite.addImage(132,140,104,38);
      enemySprite.addAnimation("fly",[0,1,2,3,4,5]);
      enemySprite.animate("fly");
      enemySprite.setVelocity(-enemySpeed,0);
      enemySprite.collideB = function(r){
        //Enemy has hit back wall, spawn a new enemy
        if(this.rect.x < -200){
          height = Math.random() * (525 - 75) + 75;
          this.rect.y=height;
          this.rect.x=1400;
        }
      }
      enemySprite.collide = function(r){
        if(!dead){
          playerSprite.setVelocity(0,speed * 3);
          playerSprite.animate("dead");
          dead = true;
        }
      }
      game.addSprite(enemySprite)
    }


    game.start(0.1);
}

function increaseScore(){
  if (!dead){
    var scoreBoard = document.getElementById("score");
    score +=1;
    scoreBoard.innerHTML = score;
  }

}

function stopGame() {
    game.stop();
}

function startGame() {
    game.start(0.1);
}
