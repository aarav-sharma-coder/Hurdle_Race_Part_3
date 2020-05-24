class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form();
      form.display();
    }

    player1 = createSprite(-20,60);
    player1.velocityY = 0;
    player1.addImage("player1" , player1Img);
    player1.debug = true;
    player1.scale = 0.3;
    player1.setCollider("rectangle",-10 , -10 , 0 ,0);

    player2 = createSprite(-20,230);
    player2.addImage("player2", player2Img);
    player2.debug = true;
    player2.scale = 0.3;

    player3 = createSprite(-20,430);
    player3.addImage("player3", player3Img);
    player3.debug = true;
    player3.scale = 0.3;

    player4 = createSprite(-20,630);
    player4.addImage("player4",player4Img);
    player4.debug = true;
    player4.scale = 0.3;

    players = [player1, player2, player3, player4];

   obstacleGroup1 = createGroup();
   obstacleGroup2 = createGroup();
   obstacleGroup3 = createGroup();
   obstacleGroup4 = createGroup(); 

    
  }


  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getPlayersAtEnd();
    
    spawnObstacles1();
    spawnObstacles2();
    spawnObstacles3();
    spawnObstacles4();

    if(allPlayers !== undefined){
      var display_position = 100;
      background(ground);
     image(track,-displayWidth*4,-255,displayWidth*4,displayHeight + 300);
      //index of the array
      var index = 0;

     
      var y = -175;
      var x;
     

      for( plr in allPlayers){
        player1.velocityY = -5;
        //add 1 to the index for every loop
        index = index + 1 ;
     
        //position the cars a little away from each other in x direction
        y = y + 255;
        //use data form the database to display the cars in y direction
        x = displayWidth/2 - allPlayers[plr].distance;

        players[index-1].x = x;
        players[index-1].y = y;
        
        if (index === player.index){
          stroke("black");
          fill("BLUE");
          ellipse(x,y,35,35);
          players[index - 1].shapeColor = red;
          camera.position.y = displayHeight/2;
          camera.position.x = players[index-1].x;
        }
        if(obstacleGroup1.isTouching(player1)){
          player1.destroy();
        }
        if(obstacleGroup2.isTouching(player2)){
          player2.destroy() ;
        }
        if(obstacleGroup3.isTouching(player3)){
          player3.destroy();
        }
        if(obstacleGroup4.isTouching(player4)){
          player4.destroy();
        }
       
        display_position+=20;
        textSize(35);
        stroke("black");
        fill("RED");
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, camera.position.x,display_position);
        text(  " PRESS UP ARROW TO JUMP " , player1.x+200 , 80);
        text(  " PRESS ENTER TO JUMP " , player2.x+200 ,335);
        text(  " PRESS SPACE TO JUMP " , player3.x+200 , 590);
        text(  " PRESS BACKSPACE TO JUMP " , player4.x+200 ,845);
      }
    }
  if(keyIsDown(UP_ARROW)){
    player1.setCollider("rectangle",0,-50,40,40);
    //player1.y -= 130;
    player1.y = -50;
   }else{
     player1.setCollider("rectangle",0,-50,270,270);
   }
   if(keyIsDown(ENTER)){
     player2.y = 205;
     player2.setCollider("rectangle",0,-200,40,40);
   }
   else{
     player2.setCollider("rectangle",0,-50,270,270);
   }
   if(keyIsDown(32)){
    player3.y = 460;
    player3.setCollider("rectangle",0,-200,40,40);
  }
  else{
    player3.setCollider("rectangle",0,-50,270,270);
  }
  if(keyIsDown(BACKSPACE)){
    player4.y  = 700;
    player4.setCollider("rectangle",0,-200,40,40);
     }else{
      player4.setCollider("rectangle",0,-50,270,270);
     }

   

    if(keyIsDown(LEFT_ARROW)){
      player.distance +=25
     
      player.update();
    }
   
      
    if(player.distance > 7000){
      gameState = 2;
      player.rank++;
      Player.updatePlayersAtEnd(player.rank);
    }
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    game.update(2);
    
    
  }
}
function spawnObstacles1() {
  
  if (frameCount % 55 === 0) {
     
       obstacle1 = createSprite(-6000, 100);
       obstacle1.debug = true;
      obstacle1.velocityX = 20;
      obstacle1.addImage(hurdleImg);
      

      obstacle1.scale = 0.5;
      obstacle1.lifetime = 5000;
      obstacle1.setCollider("rectangle", 50, 50, 90, 90);
     // obstacle.debug = true;
     obstacleGroup1.add(obstacle1);
  }
}

function spawnObstacles2() {
  if (frameCount % 55 === 0) {

       obstacle2 = createSprite(-6000, 320);

      obstacle2.velocityX = 20;
      obstacle2.addImage(hurdleImg);
      obstacle2.scale = 0.5;
      obstacle2.lifetime = 5000;
      obstacle2.setCollider("rectangle", 30, 30, 50, 50);
      obstacleGroup2.add(obstacle2);
      //obstacle.debug = true;

  }
}
function spawnObstacles3() {
 
  if (frameCount % 55 === 0) {
      
       obstacle3 = createSprite(-6000, 585);

      obstacle3.velocityX = 20;
      obstacle3.addImage(hurdleImg);
      

      obstacle3.scale = 0.5;
      obstacle3.lifetime = 5000;
      obstacle3.setCollider("rectangle", 30, 30, 90, 90);
      obstacleGroup3.add(obstacle3);
     // obstacle.debug = true;
  }
}

function spawnObstacles4() {
  if (frameCount % 55 === 0) {

       obstacle4 = createSprite(-6000, 800);

      obstacle4.velocityX = 20;
      obstacle4.addImage(hurdleImg);
      obstacle4.scale = 0.5;
      obstacle4.lifetime = 5000;
      obstacle4.setCollider("rectangle",40, 40, 50, 50);
      obstacleGroup4.add(obstacle4);
      //obstacle.debug = true;

  }
}