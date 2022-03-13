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
var rope,food,ground;
var food_con;
var food_con_2;

var background;
var food;
var rabbit;

//balloon stu related
var balloon
var air

//sprites
var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

//music
var music;
var cut_sound;
var sad_sound;
var eating_sound;

//just remake cut the rope bunny game but change some images and sounds and maybe put levels, 
//also if i do do levels put the first level as multiple ropes cutting into a balloon and than 
//the ballon goes to the top and feds the bunny, and then level 2 wel use air balloons and stars

function preload()
{
  //images
  background = loadImage('background.png');
  food = loadImage('carrot.jpg');
  rabbit = loadImage('Rabbit-01.png');

//sounds
  music = loadSound('background_song.wav');
  Whistle = loadSound("whistle.wav")
  cut = loadSound('snip.mp3');
  chew = loadSound('chewing.mp3');
  air = loadSound('balloon_sound.wav');

  //animations
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}
function setup() {
  {
    createCanvas(500,700);
    frameRate(80);
  
    music.play();
    music.setVolume(0.5);
  
    engine = Engine.create();
    world = engine.world;
  
    balloon = createImg("balloon.png")
    balloon.position(270,350)
    balloon.size(100,100)
    balloon.mouseClicked(blow)
  
    
    button = createImg('scissors.jpg');
    button.position(180,90);
    button.size(50,50);
    button.mouseClicked(drop);
  
     
    mute_btn = createImg('mute.jpg');
    mute_btn.position(width-50,20);
    mute_btn.size(50,50);
    mute_btn.mouseClicked(mute);
    
     button2 = createImg('scissors.jpg');
     button2.position(390,90);
     button2.size(50,50);
     button2.mouseClicked(drop2);
   
     rope = new Rope(7,{x:200,y:90});
     
     rope2 = new Rope(7,{x:400,y:90});
  
    ground = new Ground (250,height,width,20);
    blink.frameDelay = 20;
    eat.frameDelay = 20;
  
    bunny = createSprite(120,620,100,100);
    bunny.scale = 0.2;
  

    bunny.addAnimation('blinking',blink);
    bunny.addAnimation('eating',eat);
    bunny.addAnimation('crying',sad);
    bunny.changeAnimation('blinking');
  
    
    food = Bodies.circle(300,300,20);
    Matter.Composite.add(rope.body,food);
  
    food_con = new Link(rope,food);
    food_con_2 = new Link(rope2,food);
  
    rectMode(CENTER);
    ellipseMode(RADIUS);
    textSize(50)
    
  }


function draw() 

{
  background(51);
  image(background,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(food!=null){
    image(food,food.position.x,food.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(food,bunny,80)==true)
  {
    World.remove(engine.world,fruit);
    food = null;
    bunny.changeAnimation('eating');
    cheering.play()
    eating_sound.play();
    
  }

  if(food!=null && food.position.y>=650)
  {
    bunny.changeAnimation('crying');
    music.stop();
    Whistle.play();
    food=null;
    
   }
  
}

function drop()
{
  cut.play();
  rope.break();
  food_con.dettach();
  food_con = null; 
}

function drop2()
{
  cut.play();
  rope2.break();
  food_con_2.dettach();
  food_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(music.isPlaying())
     {
      music.stop();
     }
     else{
      music.play();
     }
}

function GameOver() {
  swal(
    {
      title: `Game Over!`,
      text: "Thanks for playing!!",
      imageUrl:
      "github.com/diesel25092007/bunnys/blob/main/sad_3.png",
      imageSize: "150x150",
      confirmButtonText: "restart?"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function hooray() {
  swal(
    {
      title: `you win!`,
      text: "Thanks for playing!!",
      imageUrl:
      "github.com/diesel25092007/bunnys/blob/main/blink_1.png",
      imageSize: "150x150",
      confirmButtonText: "next level?"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.level2();
      }
    }
  );
}

function blow()
{
  air.play()
  Matter.Body.applyForce(fruit,{x:0, y:0},{x:0.0,y:-0.02})
}
}