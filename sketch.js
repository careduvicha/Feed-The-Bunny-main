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
var bunny, bunnyImg;
var bgImg;
var fruitImg;
var button

function preload() {
bunnyImg=loadImage("./images/Rabbit-01.png")
bgImg=loadImage("./images/background.png")
fruitImg=loadImage("./images/melon.png")

}

function setup() {
  createCanvas(500, windowHeight - 5);
  engine = Engine.create();
  world = engine.world;

  rope = new Rope(6, { x: 245, y: 30 });
  var fruit_options = { density: 0.001 };
  fruit = Bodies.circle(300, 300, 15, fruit_options);
  Composite.add(rope.body, fruit);
  link1 = new Link(rope, fruit);
  //criando o solo
  ground = new Ground(width / 2, height - 10, width, 20);
  bunny=createSprite(250,height-70)
  bunny.addImage(bunnyImg)
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
  image(fruitImg,fruit.position.x, fruit.position.y, 60, 60);
  

  ground.display();
  rope.show();
  drawSprites()
}
function drop(){
  rope.break()
  link1.detach()
  link1=null
}

