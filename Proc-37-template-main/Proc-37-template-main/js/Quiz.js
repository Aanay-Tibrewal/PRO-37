class Quiz {
  constructor(){}

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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.title.hide();
    question.input1.hide();
    question.button.hide();
    question.input2.hide();

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    textSize(30);
    text("RESULT OF THE QUIZ", 250,50);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();


    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      
      //write code to add a note here
      fill("blue");
      textSize(20);
      text("*NOTE : CONTESTANT WHO ANSWERED CORRECT ARE HIGHLIGHTED IN GREEN COLOUR",100,230);

    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns = "2";
      if(correctAns === allContestants[plr].answer){
        fill("green");
        textSize(20);
        strokeWeight(4);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 100, 300);
      }
      else{
        fill("red");
        textSize(20);
        strokeWeight(4);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 100, 350);
      }
    }

    }
  }

}
