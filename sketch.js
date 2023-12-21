const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var rope;
var fruit;
var link1;
var bunny, bunnyImg,blink,sad,eat
var bgImg;
var fruitImg;
var button

function preload() {
bunnyImg=loadImage("./images/Rabbit-01.png")
bgImg=loadImage("./images/background.png")
fruitImg=loadImage("./images/melon.png")
blink=loadAnimation("./images/blink_1.png","./images/blink_2.png","./images/blink_3.png")
sad=loadAnimation("./images/sad_1.png","./images/sad_2.png","./images/sad_3.png")
eat=loadAnimation("./images/eat_0.png","./images/eat_1.png","./images/eat_2.png","./images/eat_3.png","./images/eat_4.png")
blink.playing=true
eat.playing=true
eat.looping=false
sad.playing=true
sad.looping=false
}

function setup() {
  createCanvas(500, windowHeight - 5);
  engine = Engine.create();
  world = engine.world;
  blink.frameDelay=10
  eat.frameDelay=40
  sad.frameDelay=20
  rope = new Rope(6, { x: 245, y: 30 });
  var fruit_options = { density: 0.001 };
  fruit = Bodies.circle(300, 300, 15, fruit_options);
  Composite.add(rope.body, fruit);
  link1 = new Link(rope, fruit);
  //criando o solo
  ground = new Ground(width / 2, height - 10, width, 20);
  bunny=createSprite(200,height-70)
  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("eating",eat)
  bunny.addAnimation("crying",sad)
  bunny.scale=0.25
  button=createImg("./images/cut_button.png")
  button.position(220,20)
  button.size(40,40)
  button.mouseClicked(drop)
  
  //configurações do jogo
  imageMode(CENTER)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
}

function draw() {
  background(51);
  image(bgImg,width/2,height/2,width,height)
  Engine.update(engine);
  if(fruit!=null){
    image(fruitImg,fruit.position.x, fruit.position.y, 60, 60);
  }
  if(collide(fruit,bunny)){
    bunny.changeAnimation("eating")
    World.remove(world,fruit)
    fruit=null
  }
  if(fruit!=null&&fruit.position.y>bunny.position.y){
   bunny.changeAnimation("crying")
  }
 
  

  ground.display();
  rope.show();
  drawSprites()
}
function drop(){
  rope.break()
  link1.detach()
  link1=null
}
function collide(body,sprite){
if(body!=null){
  var distance=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if(distance<=80){
    return true

  }else{
    return false
  }
}
}

