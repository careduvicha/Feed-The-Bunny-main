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
var rope
var fruit
var link1


function setup() {
  createCanvas(500, windowHeight-5);
  engine = Engine.create();
  world = engine.world;

  rope=new Rope(6,{x:245,y:30})
  var fruit_options={density:0.001}
  fruit=Bodies.circle(300,300,15,fruit_options)
  Composite.add(rope.body,fruit)
  link1=new Link (rope,fruit)
  //criando o solo
  ground = new Ground(width / 2, height - 10, width, 20);

  //configurações do jogo
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
}

function draw() {
  background(51);
  Engine.update(engine);
  ellipse(fruit.position.x,fruit.position.y,15,15)

  ground.display()
  rope.show()
}
