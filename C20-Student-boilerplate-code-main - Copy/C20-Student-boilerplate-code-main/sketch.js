var PLAY = 1
var END = 0
var WIN = 2
var gameState = PLAY
var zombie
var person
var jugle, invisiblejungle
var obstaclesGroup, obstacle1,obstacle2


var score=0

var gameOver, restart
function preload() {
  person = loadImage("./assests/personrunning.png")
  zombie = loadImage("./assests/zombie running.gif")
  gameOver  = loadImage("./assests/gameOver.png")
  restart  = loadImage("./assests/restartbutton.png")
  obstacles1 =loadImage("./assests/obstacle1.png")
  obstacle2 = loadImage("./assests/obstacle2.png")
  jugle = loadImage("./assests/jugle.jpg")
}

    function setup() {
    createCanvas(800, 400);
  
    jugle = createSprite(400,400,400,20);
    jugle.addImage("jungle",jungleImage);
    jugle.scale=0.3
    jugle.x = width /2;
  
    person = createSprite(50,200,20,50);
    person.addAnimation("running", person_running);
    person.addAnimation("collided", person_collided);
    person.scale = 0.15;
    person.setCollider("circle",0,0,300)
    zombie = createSprite(50,200,20,50);
    zombie.addAnimation("running",zombie_running);
   zombie.addAnimation("collided", zombie_collided);
    zombie.scale = 0.15;
    zombie.setCollider("circle",0,0,300)
      
    invisibleGround = createSprite(400,350,1600,10);
    invisibleGround.visible = false;
  
    gameOver = createSprite(400,100);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(550,140);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.5;
    restart.scale = 0.1;
  
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup = createGroup()
   
    
    score = 0;
  
  }




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




function draw() {
  background(255);
  
  
  if (gameState===PLAY){

    jugle.velocityX=-3

    if(jugle.x<100)
    {
       jugle.x=400
    }
   console.log(person.y)
    if(keyDown("space")&& person.y>270) {
      jumpSound.play();
      person.velocityY = -16;
    }
  
    person.velocityY = person.velocityY + 0.8
   
    spawnObstacles()

   person.collide(invisibleGround);
    
    if(zombie.isTouching(person)){
      collidedSound.play();
      gameState = END;
    }
      if(obstaclesGroup.isTouching(person)){
      collidedSound.play();
      gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.x=camera.position.x;
    restart.x=camera.position.x;
    gameOver.visible = true;
    restart.visible = true;
    person.velocityY = 0;
    jugle.velocityX = 0;
    zombie.velocityY = 0;

   person.changeAnimation("collided",person_collided);
    
   obstaclesGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
    
  }

  
  
  
  drawSprites();

  textSize(20);
  stroke(3);
  fill("black")
  text("Score: "+ score, camera.position.x,50);
  
  if(score >= 5){
    person.visible = false;
    textSize(30);
    stroke(3);
    fill("black");
    text("Congragulations!! You win the game!! ", 70,200);
    gameState = WIN;
  }
}



function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  jugle.visble = true
  person.visible = true;
  zombie.visble = true
  person.changeAnimation("running",
               person_running);
  obstaclesGroup.destroyEach();
  
  score = 0;
}
function spawnObstacles(){

  if (frameCount % 60 === 0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + score/100);
    
     
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       default:break
  }
  obstacle.scale = 0.5;
  obstacle.lifetime = 300;
  obstaclesGroup.add(obstacle);
 }
}