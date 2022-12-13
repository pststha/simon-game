let gamePattern = [];
let userClickedPattern =[];
let buttonColors = ["red","blue","green","yellow"];
let level = 0;


  $("body").on("keypress",()=>{
    if(level=== 0){//check if it is initial start/restart
      $("h2").text("Level "+ level);
      nextSequence();
    }
  });
  $("body").on("click",()=>{
    if(level=== 0){//check if it is initial start/restart
      $("h2").text("Level "+ level);
      nextSequence();
    }
  });
    $(".btn").on("click",function(){
      playSound(this.id);
      animatePress(this.id);
      if(gamePattern.length>0){//only push and check after game starts
        userClickedPattern.push(this.id);
        checkAnswer(userClickedPattern.length-1);//send the latest answer to check
      }
    });



function nextSequence(){
  let randomNumber = Math.floor(Math.random()*4);
  let randonChosenColor = buttonColors[randomNumber];
  gamePattern.push(randonChosenColor);
  level++;
  $("h2").text("Level "+ level);
  playSound(randonChosenColor);

  $("#"+randonChosenColor).fadeOut();
  $("#"+randonChosenColor).fadeIn();

}


function playSound(name){
  let audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(buttonName){
  $("#"+buttonName).addClass("pressed");
  setTimeout(function () {
    $("#"+buttonName).removeClass("pressed");
  }, 100);
}

function checkAnswer(recent){
  if (gamePattern[recent]!== userClickedPattern[recent]){//check the two arrays
      level = 0;
      $("h2").text("Game over, Press Any Keyboard Key to Start");
      gamePattern = [];
      userClickedPattern = [];
      playSound("wrong");
  }else if(recent+1===level){//next Level if all the sequence are correct
        setTimeout(function () {
          nextSequence();
        }, 1000);
        userClickedPattern = [];
  }
}
