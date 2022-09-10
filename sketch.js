var TreeImg, Tree;
var LogImg, Log, LogGroup;
var LeafImg, Leaf, LeafGroup;
var Boy, BoyImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  TreeImg = loadImage("Tree.jpg");
  LogImg = loadImage("Log1.jpg");
  LeafImg = loadImage("Leaf.jpg");
  BoyImg = loadImage("Boy standing.jpg");
} 

function setup() {
  createCanvas(600, 600);
  Tree = createSprite(300,300);
  Tree.addImage("Tree",TreeImg);
  Tree.velocityY = 1;
  Tree.scale=4
  
  Boy=createSprite(200,200,50,50);
  Boy.addImage("Boy", BoyImg);
  Boy.scale=0.3;
 
  LogGroup=new Group();
  LeafGroup=new Group();
  invisibleBlockGroup=new Group();
}

function draw() {
  background(0);

 

  if(gameState==="play"){
    if(keyDown("left_arrow")){
      Boy.x=Boy.x-3;
    }

    if(keyDown("right_arrow")){
      Boy.x=Boy.x+3;
    }

    if(keyDown("space")){
      Boy.velocityY=-15;
    }

   Boy.velocityY=Boy.velocityY+0.8;

    if(Tree.y > 400){
      Tree.y = 300
    }

    spawnLog();

    if(LeafGroup.isTouching(Boy)){
      Boy.velocityY=0;
    }

    if(invisibleBlockGroup.isTouching(Boy) || Boy.y>600){
      Boy.destroy();
      gameState="end";
    }
    drawSprites();
  }

    if(gameState==="end"){
      stroke("yellow");
      fill ("yellow");
      textSize(30);
      text("Game Over", 230,250);
    }
}

function spawnLog(){
  if(frameCount % 240===0){
    var Log=createSprite(200,5);
    Log.scale=0.1
    var Leaf=createSprite(200,10);
    Leaf.scale=0.3
    var invisibleBlock=createSprite(200,15);

    invisibleBlock.width=Leaf.width;
    invisibleBlock.height=2;

    Log.x=Math.round(random(120,400));
    Leaf.x=Log.x;
    invisibleBlock.x=Leaf.x;

    Log.addImage(LogImg);
    Leaf.addImage(LeafImg);

    Log.velocityY=1;
    Leaf.velocityY=1;
    invisibleBlock.velocityY=1;

    Boy.depth=Log.depth;
    Boy.depth=Boy.depth+1;

    Log.lifetime=800;
    Leaf.lifetime=800;
    invisibleBlock.lifetime=800;

    LogGroup.add(Log);
    invisibleBlock.debug=false;
    LeafGroup.add(Leaf);
    invisibleBlockGroup.add(invisibleBlock);
  }
}