var trex;
var trexanimation;
var edges;
var ground;
var groundimage;
var cloudimage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var cloudGroup;
var obstacleGroup;
var score = 0;
var restart;
var gameOver;
var restartimg;
var gameOverimg;
function preload(){
  trexanimation=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartimg = loadImage("restart.png");
  gameOverimg = loadImage("gameOver.png");
}


function setup() {
  createCanvas(600, 400);
  ground = createSprite(200,380,400,20);
  ground.addImage(groundimage);
  edges = createEdgeSprites()
  trex = createSprite(45,350,10,10);
  trex.addAnimation("running",trexanimation);
  trex.scale = 0.5;
  restart = createSprite(250,150,20,20);
  restart.addImage(restartimg);
  restart.scale = 0.6;
  gameOver = createSprite( 200,200,20,20);
  gameOver.addImage(gameOverimg);
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(180);
  text("Score: " + score ,380,50);
  if(gameState === PLAY){
    score = score + Math.round(frameRate() / 10);
  if(keyDown("space")){
    trex.velocityY = -10;
  }
  ground.velocityX = -10;
  trex.velocityY = trex.velocityY + 0.5;
  
  if(ground.x < 0){
    ground.x = ground.width/2;
    
  }
    if(obstacleGroup.isTouching(trex)){
      gameState = END;
}
    gameOver.visible = false;
    restart.visible = false;
  spawanClouds();
  spawanObstacles()
}
  else if(gameState === END){
    trex.velocityX = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-2);
    cloudGroup.setLifetimeEach(-2);
    gameOver.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart))
      {
        reset();
      }
  }
  trex.collide(ground);
  drawSprites();
}

function spawanClouds(){
  if(frameCount % 60 === 0)
    {
     var cloud=createSprite(600,Math.round(random(20,300)),20,20);
      cloud.addImage(cloudimage);
      cloud.velocityX = -2;
      cloud.lifetime = 300;
      cloud.scale = 0.8;
      cloudGroup.add(cloud);
    }
}

function spawanObstacles(){
  if(frameCount % 100 === 0){
    var obstacle = createSprite(600,380,20,20);
    obstacle.velocityX = -2;
    obstacle.lifetime = 300;
    var num = Math.round(random(1,6));
    switch(num){
      case 1: obstacle.addImage(obstacle1);
        break;
        case 2: obstacle.addImage(obstacle2);
        break;
        case 3: obstacle.addImage(obstacle3);
        break;
        case 4: obstacle.addImage(obstacle4);
        break;
        case 5: obstacle.addImage(obstacle5);
        break;
        case 6: obstacle.addImage(obstacle6);
        break;
        default :
        break;
        
        
    }
    obstacle.scale = 0.8;
    obstacleGroup.add(obstacle);
  }
}

function reset()
{
  score = 0;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  gameState = PLAY;
}

