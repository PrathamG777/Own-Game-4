var bg;
var gameState = "play";
var spaceShip, spaceShipImg;
var asteroid, asteroidImg, asteroidGrp;
var missile, missileImg, missiles = 50, missileGrp;
var score = 0;

function preload() {
  //loading images
  bg = loadImage("background.jpg")
  spaceShipImg = loadImage("spaceship.png");
  asteroidImg = loadImage("asteroid.png");
  missileImg = loadImage("missile.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  //making the spaceship
  spaceShip = createSprite(displayWidth/2, displayHeight*0.75, 50, 50);
  spaceShip.addImage(spaceShipImg);
  spaceShip.scale = 0.25;

  //creating an asteroid group
  asteroidGrp = new Group();

  //creating a missile group
  missileGrp = new Group();
}

function draw() {
  background(bg);  

  if(score === 10){
    gameState = "won";
  }

  if(gameState === "play"){
  //movement for the spaceship
  if(keyDown("RIGHT_ARROW")){
    spaceShip.x += 7;
  }

  if(keyDown("LEFT_ARROW")){
    spaceShip.x -= 7;
  }

  if(keyDown("SPACE")){
    missile = createSprite(spaceShip.x,spaceShip.y,20,20);
    missile.addImage(missileImg);
    missile.velocityY = -15;
    missile.scale = 0.1;
    missileGrp.add(missile);
    spaceShip.depth = missile.depth;
    spaceShip.depth += 2;
    missiles -= 1;
  }

  //changing gamestate to bullet when player runs out of bullets
  if(missiles === 0){
    gameState = "missile";
  }

  //destroying asteroids when missiles touch them
  if(asteroidGrp.isTouching(missileGrp)){
    for(var i = 0;i < asteroidGrp.length;i++){
      if(asteroidGrp[i].isTouching(missileGrp)){
        asteroidGrp[i].destroy();
        missileGrp.destroyEach();
        score += 2;
      }
    }
  }
  
  //destroying asteroids when player touches them
  if(asteroidGrp.isTouching(spaceShip)){
        asteroidGrp.destroyEach();
        gameState = "lost";
  }

  //calling the function to spawn asteroids
  asteroids();
  }

  drawSprites();

  textSize(30);
  fill("white");
  text("Score:"+score,displayWidth*0.33,displayHeight/10);
  text("Missiles:"+missiles,displayWidth*0.66,displayHeight/10)

  //when gamestate is missile, text is displayed and asteroids, missile and spaceship are destroyed
  if(gameState === "missile"){
    textSize(50);
    fill("white");
    text("The Player Has Run Out Of Missiles",displayWidth/4,displayHeight/2);
    asteroidGrp.destroyEach();
    missileGrp.destroyEach();
    spaceShip.destroy();
  }

  //when gamestate is lost, text is displayed and asteroids and spaceship are destroyed
  if(gameState === "lost"){
      textSize(50);
      fill("white");
      text("The Player Has Lost",displayWidth/3,displayHeight/2);
      asteroidGrp.destroyEach();
      spaceShip.destroy();
  }

  //when gamestate is won, text is displayed and asteroids and spaceship are destroyed
  if(gameState === "won"){
    textSize(50);
    fill("white");
    text("The Player Has Won",displayWidth/3,displayHeight/2);
    asteroidGrp.destroyEach();
    spaceShip.destroy();
  }
}

//creating a function to spawn asteroids
function asteroids() {
  if(frameCount % 70 === 0){
  asteroid = createSprite(random(100,1300),displayHeight/7,30,30);
  asteroid.addImage(asteroidImg);
  asteroid.scale = 0.15;
  asteroid.velocityY = 3;
  asteroid.lifetime = 200;
  asteroidGrp.add(asteroid);
  }
}