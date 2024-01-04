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
var rope,rope2, rope3;
var fruit;
var link1,link2,link3
var bunny, bunnyImg, blink, sad, eat;
var bgImg;
var fruitImg;
var button,button2,button3
var cutSound;
var ballonSound;
var backGroundSound;
var sadSound;
var eatingSound;
var isCrying = false;
var muteButton;
var airButton;

function preload() {
  bunnyImg = loadImage("./images/Rabbit-01.png");
  bgImg = loadImage("./images/background.png");
  fruitImg = loadImage("./images/melon.png");
  blink = loadAnimation(
    "./images/blink_1.png",
    "./images/blink_2.png",
    "./images/blink_3.png"
  );
  sad = loadAnimation(
    "./images/sad_1.png",
    "./images/sad_2.png",
    "./images/sad_3.png"
  );
  eat = loadAnimation(
    "./images/eat_0.png",
    "./images/eat_1.png",
    "./images/eat_2.png",
    "./images/eat_3.png",
    "./images/eat_4.png"
  );

  cutSound = loadSound("./sounds/rope_cut.mp3");
  ballonSound = loadSound("./sounds/air.wav");
  backGroundSound = loadSound("./sounds/sound1.mp3");
  sadSound = loadSound("./sounds/sad.wav");
  eatingSound = loadSound("./sounds/eating_sound.mp3");

  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;
}

function setup() {
  createCanvas(500, windowHeight - 5);
  engine = Engine.create();
  world = engine.world;
  backGroundSound.play();
  backGroundSound.setVolume(0.2);
  blink.frameDelay = 10;
  eat.frameDelay = 40;
  sad.frameDelay = 20;
  rope = new Rope(6, { x: 245, y: 30 });
  rope2 = new Rope(6, { x: 400, y: 20 });
  rope3 = new Rope(6, { x: 100, y: 100 });
  
  var fruit_options = { density: 0.001 };
  fruit = Bodies.circle(300, 300, 15, fruit_options);
  Composite.add(rope.body, fruit);
  link1 = new Link(rope, fruit);
  link2=new Link(rope2,fruit)
  link3=new Link(rope3,fruit)

  //criando o solo2
  ground = new Ground(width / 2, height - 10, width, 20);
  bunny = createSprite(width - 65, height - 80);
  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.addAnimation("crying", sad);
  bunny.scale = 0.25;
  button = createImg("./images/cut_button.png");
  button.position(220, 20);
  button.size(40, 40);
  button.mouseClicked(drop);
  button2 = createImg("./images/cut_button.png");
  button2.position(400, 20);
  button2.size(40, 40);
  button2.mouseClicked(drop2);
  button3 = createImg("./images/cut_button.png");
  button3.position(100, 100);
  button3.size(40, 40);
  button3.mouseClicked(drop3);3
  muteButton = createImg("./images/mute.png");
  muteButton.position(width - 50, 30);
  muteButton.size(40, 40);
  muteButton.mouseClicked(mute);
  airButton = createImg("./images/balloon.png");
  airButton.position(50, 180);
  airButton.size(150, 100);
  airButton.mouseClicked(airBlower);

  //configurações do jogo
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
}

function draw() {
  background(51);

  image(bgImg, width / 2, height / 2, width, height);
  Engine.update(engine);
  if (fruit != null) {
    image(fruitImg, fruit.position.x, fruit.position.y, 60, 60);
  }

  if (collide(fruit, bunny)) {
    bunny.changeAnimation("eating");
    World.remove(world, fruit);
    eatingSound.play();
    fruit = null;
  }
  if (fruit != null && fruit.position.y > bunny.position.y) {
    bunny.changeAnimation("crying");
    if (!isCrying) {
      sadSound.play();
      isCrying = true;
    }
  }

  ground.display();
  rope.show();
  rope2.show()
  rope3.show()
  drawSprites();
}
function drop() {
  rope.break();
  link1.detach();
  cutSound.play();
  link1 = null;
}
function drop2() {
  rope2.break();
  link2.detach();
  cutSound.play();
  link2 = null;
}
function drop3() {
  rope3.break();
  link3.detach();
  cutSound.play();
  link3 = null;
}
function mute() {
  if (backGroundSound.isPlaying()) {
    backGroundSound.stop();
  } else {
    backGroundSound.play();
  }
}
function airBlower() {
  ballonSound.play();
  Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0.03, y: 0 });
}
function collide(body, sprite) {
  if (body != null) {
    var distance = dist(
      body.position.x,
      body.position.y,
      sprite.position.x,
      sprite.position.y
    );
    if (distance <= 80) {
      return true;
    } else {
      return false;
    }
  }
}
