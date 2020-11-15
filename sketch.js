const PLAY =1;
const END = 0;

var gameState = PLAY;

var gameover,restart,gameoverimage,restartimage;

var score =0;



var lady,ladyimage,thorns,ground;

  var ObstacleGroup;
var FliesGroup;





function preload(){
  bg = loadImage("fbgg.jpg");
  
  ladyimage=loadAnimation("run1.png","run2.png","run3.png");
  
  ladystop = loadAnimation("run1.png");
  t1=loadImage("th.png");
  r1= loadImage("rock1.png");
  m1=loadImage("mud11.png");
  b1 = loadImage("butter.png");
   gameoverimage = loadImage("gameo1.png");
  restartimage = loadImage("rest1.png");
  
  
  
  
  
}




function setup() {
  createCanvas(800, 300);
  
   ground  = createSprite(400,150)
  ground.x = ground.width/2;
  ground.addImage(bg);
  
  
  lady = createSprite (200,200,200,250);
  lady.addAnimation("running",ladyimage);
  lady.scale = 0.3;
  lady.addAnimation("stop",ladystop);
  
  lady.x = 70;
  lady.setCollider("rectangle",0,0,500,400);
  
   gameover = createSprite(width/2,height/2)
  gameover.addImage(gameoverimage)
  restart = createSprite(width/2,height/2+50);
  restart.addImage(restartimage)
  gameover.visible = false;
  restart.visible = false;
  gameover.scale = 0.2;
  restart.scale = 0.2;
  
  ObstacleGroup = createGroup();
  FliesGroup = createGroup();
  
  
  
}

function draw() {
  background(220);
   edge= createEdgeSprites();
  ground.velocityX = -4;
  
   
  if(gameState === PLAY){
    
   score = score+Math.round(getFrameRate()/60)
    //score = Math.round(frameCount/5)
      edge= createEdgeSprites();
      ground.velocityX = -4;
    
      if(ground.x<0){
       ground.x = ground.width/2;
      }
 
  
if(keyDown("space") &&lady.collide(edge[3])){
    
      lady.velocityY =-18;
    
      }
  
    lady.velocityY = lady.velocityY+1;
    
        
  if(ObstacleGroup.isTouching(lady)){
      gameState = END;
   // lady.velocityY = -18;
    }
    
  

 spawnflies();
  spawnobstacles();
  //drawSprites();
}
 else if(gameState === END){
    
    ground.velocityX = 0;
    lady.velocityY =0;
    lady.changeAnimation("stop",ladystop);
    
   FliesGroup.setVelocityXEach(0);
    ObstacleGroup.setVelocityXEach(0);
    //CloudGroup.destroyEach();
    FliesGroup.setLifetimeEach(-1);
    ObstacleGroup.setLifetimeEach(-1);
    gameover.visible=true;
    restart.visible = true;
  }

  if(mousePressedOver(restart)){
    reset();
  }

  lady.collide(edge[3]);
  
 drawSprites();
  console.log(score);
  textSize(20);
  text("Score: " + score , 600,20);
  
}


 function  spawnflies(){
   
   if(frameCount%50==0){
     var butterfly ;
   butterfly=  createSprite(600,random(50,120));
     butterfly.addImage(b1);
     butterfly.velocityX= -5;
     butterfly.scale = 0.03;
     
     butterfly.lifetime = 140;
     
     FliesGroup.add(butterfly);
   }
   
     
     
     
 }
function spawnobstacles(){
  if(frameCount%100===0){
    obstacles= createSprite(600,260);
  
    obstacles.velocityX=-5;
    obstacles.scale = 0.1;
    
    obstacles.lifetime =130;
    
    rand = Math.round(random(1,3));
    obstacles.debug= true;
   
    
    
    switch(rand){
      case 1: obstacles.addImage(t1);
      break;
      case 2: obstacles.addImage(m1);
      break;
      case 3: obstacles.addImage(r1);
      break;
      default:break;
    }
    
  ObstacleGroup.add(obstacles);
        
    }
  
}
function reset(){

gameState = PLAY;
  ObstacleGroup.destroyEach();
  FliesGroup.destroyEach();
  score = 0;
  gameover.visible= false;
  restart.visible = false;
    lady.changeAnimation("running",ladyimage);
  

}



