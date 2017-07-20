//======================================================//
//This is a Trivia game project created in Javascript   //
//Theme for the Trivia - Game Of Throne                 //
// Author: Ashwini                                      //
//======================================================//

$(document).ready(function(){

// Global Variables
var num=0;
var count=0;               //Questions answered
var count_limit=10;        //Total questions
var score=0;               //Store the score
var previous_questions=[]; //Reference to the previous question

// Background music for the quiz.
var themeMusic = new sound("../TriviaGame/assets/music/GOTtheme.mp3");

//Object Questions will hold all the details related to the questions 
//like Multiple choice options, correct answer, answer explanation etc.

var allQuestions = {
    1: {
        "question": "What is the name of the continent on which most of the action of 'Game of Thrones' takes place? ",
        "options": {
            1: "Westeros",
            2: "Southeros",
            3: "Easteros",
            4: "Northeros",
        },
        "answer": 1,
        "answer-exp": "Answer is 'Wsteros'. Almost all of the continent, with the exception of the Wall and lands beyond, is under the rule of the Seven Kingdoms.  Westeros contains a variety of terrain including forests, mountains and deserts."
    },

	2: {
	        "question": "At the end of season 2, Joffrey Baratheon sits on the Iron Throne, but which Baratheon is actually the rightful king? ",
	        "options": {
	            1: "Steffon Baratheon",
	            2: "Renly Baratheon",
	            3: "Stannis Baratheon",
	            4: "Cersei Lannister Baratheon",
	        },
	        "answer": 3,
	        "answer-exp": "Answer is 'Stanis Baratheon'.Stannis' father was Steffon Baratheon, a brother of King Robert Baratheon, both of whom died.  Robert's widow Cersei placed her fifteen year-old son Joffrey on the throne, but Joffrey was not Robert's biological heir, a fact that Cersei strove to keep secret.  Since King Robert had no true heirs, Stannis should be the rightful heir to the Iron Throne.  Stannis said, 'The Iron Throne is mine by right. All those that deny that are my foes.'"
	    },
	3: {
		        "question": "In 2011, which actor who plays Tyrion Lannister, won the Golden Globe award for Best Performance by an Actor in a Supporting Role in a Series?",
		        "options": {
		            1: "Jack Gleeson",
		            2: "Peter Dinklage",
		            3: "Iain Glen",
		            4: "Aidan Gillen",
		        },
		        "answer": 2,
		        "answer-exp": "Answer is 'Peter Dinklage'. Dinklage may be small in stature, but he wields power and commands respect in his role of Tyrion Lannister, the Hand of the King.  However, Tyrion is greatly disliked by his father Tywin Lannister because his wife died giving birth to the dwarf-sized son. His sister Cersei Lannister Baratheon despises him for the same reason.  Tyrion must bear being called names such as 'The Imp' and 'Halfman'."
		},
	4: {
		        "question": "Aside from being Master of Coin and a member of the King's Small Council, the character of Peter 'Littlefinger' Baelish from King's Landing also runs what kind of business?",
		        "options": {
		            1: "Gold",
		            2: "Ship building",
		            3: "Brothel",
		            4: "Slave trade",
		        },
		        "answer": 3,
		        "answer-exp": "Answer is 'Brothel'. Littlefinger spies on patrons of his brothel in order to gain useful information against possible political rivals.  As Master of the Coin, he oversees the treasury.  He was given this position during the reign of King Robert Baratheon and continued in the position when King Joffrey Baratheon inherited the throne after Robert's death."
		},
	5: {
		        "question": "What is the name of Arya Stark's sword?",
		        "options": {
		            1: "Thorn",
		            2: "Spear",
		            3: "Needle",
		            4: "Slash",
		        },
		        "answer": 3,
		        "answer-exp": "Answer is 'Needle'. Arya Stark is the daughter of Lord Eddard and Lady Catelyn Stark.  The sword is a gift from her half-brother Jon Snow.  She is trained in sword fighting, and when her father tells her that a little lady shouldn't play with swords, she replies, 'I wasn't playing.  And I don't want to be a lady.'"
		},

	6: {
		        "question": "By what name do the Seven Kingdoms refer to the Free Folk who live in north beyond the Wall?",
		        "options": {
		            1: "Savages",
		            2: "Wildlings",
		            3: "Barbarians",
		            4: "Hostiles",
		        },
		        "answer": 2,
		        "answer-exp": "Answer is 'Wildlings'. The Free Folk live on the continent of Westeros, but beyond the realm of the Seven Kingdoms.  As their name suggests, they consider themselves free from political authority and claims to the land."
		},
	7: {
		        "question": "Which of the following is not a position on King Joffrey Baratheon's small council?",
		        "options": {
		            1: "Master of Whisperers",
		            2: "The Hand of the King",
		            3: "Master of Seas",
		            4: "Master of Ships",
		        },
		        "answer": 3,
		        "answer-exp": "Answer is 'Master of Seas'. The small council is a group of advisors to the king, similar to a cabinet.  The members are appointed by the king.  They can make suggestions, but only the king makes them into laws."
		},
	8: {
		        "question": "Which position on the king's small council is his closest adviser and has the power to make decisions in the king's absence?",
		        "options": {
		            1: "Queen Regent",
		            2: "Lord to the Throne",
		            3: "Master of the Realm",
		            4: "Hand of the King",
		        },
		        "answer": 4,
		        "answer-exp": "Answer is 'Hand of the King'. In the first two seasons, there are three characters to hold this position.  The first is Lord Jon Arryn who dies in the first episode.  King Robert then appoints Lord Eddard Stark.  Stark is later executed as ordered by King Joffrey.  Joffrey chooses his grandfather Lord Tywin Lannister, but he is too involved in fighting the Starks and sends his dwarf-son Tyrion to act in his place."
		},
	9: {
		        "question": "For what reason was Hand of the King Eddard (Ned) Stark executed?",
		        "options": {
		            1: "Refusing to allow King Joffrey to marry his daughter Sansa",
		            2: "Plotting to kill Joffrey's mother Cersei",
		            3: "Challenging Joffrey's right to be king",
		            4: "Responsibility for the death of King Robert",
		        },
		        "answer": 3,
		        "answer-exp": "Answer is 'Challenging Joffrey's right to be king'. Through a series of events, Ned Stark discovers that Joffrey and his siblings are not the offspring of Robert Baratheon.  Their true father is their uncle Jamie Lannister meaning that Joffrey is not the rightful heir to the Iron Throne. In his attempt to use this information, Ned is betrayed and is executed for treason."
		},
	10: {
		        "question": "Daenerys Targaryen has three children. These 'children' are actually what?",
		        "options": {
		            1: "Dragons",
		            2: "Wolves",
		            3: "Unicorns",
		            4: "Lions",
		        },
		        "answer": 1,
		        "answer-exp": "Answer is 'Dragons'. Daenerys, who feels she has a rightful claim to the Iron Throne, is given three dragon eggs as a wedding gift.  When her husband Kahl Drago dies, she puts his body on a funeral pyre.  Daenerys, who has the supernatural ability to withstand heat, walks into the fire with the eggs and uses the heat to hatch them.  These dragons are the first to come into the world in over a century."
		},
};

// ------- Timer Code	
    var clockRunning = false;
    var index = 0;
    var counter;
	var countdownTimer = {

		time : 30,  // 30 seconds' Timer for each question
		
		reset: function() {
			this.time = 30;	
			$('.timer').text('00:' + this.time);
		},
		start: function() {
		if (!clockRunning) {
		 counter = setInterval(countdownTimer.count, 1000);	
		 clockRunning = true;
		}

		},
		stop: function() {
			clearInterval(counter);
			clockRunning = false;
		},
		count: function() {
				countdownTimer.time--;

			if (countdownTimer.time >= 0) {
// Show the timer running down

                if (countdownTimer.time <= 9){
                    $('.timer').html('00:'+'0'+ countdownTimer.time);
                }
                else{
                    $('.timer').html('00:'+countdownTimer.time);
                }
        }
		else{
// Show the Time Up message!                
					$('#quiz').fadeOut(500, function() {
					$('#timeUp').fadeIn(500);
					countdownTimer.reset();
				});
			}
		}
	};  //------Timer End

// Set up for the new game
var newGame = function() {
    num = 0;
    count = 0;
    score = 0;
    privious_questions = [];
};

//To find the specific questions to select
var findQuestion = function() {
    selectQuestion();
    while (wasAsked()) {
        selectQuestion();
    }
};

//Select the random question from array of Questions
var selectQuestion = function() {
    var limit = Object.keys(allQuestions).length;
    num = Math.floor((Math.random() * limit) + 1)
};

// while randomly selecting the new question 
// Check and confirm if the previous question was not the same as to the new one
var wasAsked = function() {
    var result = false;
    for (var i=0;i<=privious_questions.length;i++){
        if (num == privious_questions[i]) {
            result = true;
        }
    }
    return result;
};

//To load the selected question into the Quiz area
var loadQuestion = function() {
	countdownTimer.reset();
    countdownTimer.start();
	console.log(num);
    privious_questions.push(num);    
    $('#text').html(allQuestions[num]["question"]);
    $('#option-1').html(allQuestions[num]["options"][1]);
    $('#option-2').html(allQuestions[num]["options"][2]);
    $('#option-3').html(allQuestions[num]["options"][3]);
    $('#option-4').html(allQuestions[num]["options"][4]);
    updateScore();
    count++;
    $('.progress').text(count+"/"+count_limit);
};

//To check if the user selected answer is correct or not
var correct = function(user_answer) {
    if (user_answer == allQuestions[num]["answer"]) {
        return true;
    } else {
        return false;
    }
};

//To update the score 
var updateScore = function() {
    $('.score').text(score);
};

//To update the Rank of the player depending on their score.
var updateRank = function() {
    if (score == 10){
        $('.rank').text('Game Of Thrones - Master');
        $('.rank-msg').text('Prefect score!');
    } else if (score >= 7 && score <=  9) {
        $('.rank').text('Game Of Thrones - Expert');
        $('.rank-msg').text('You have mad "Game Of thrones" trivia skillz!');
    } else if (score >= 4 && score <= 6) {
        $('.rank').text('Game Of Thrones - Beginner');
        $('.rank-msg').text('You may not be the best, but your not the worst.');
    } else if (score >= 1 && score <= 3) {
        $('.rank').text('Game Of Thrones - Novice');
        $('.rank-msg').text('Meh. Not a great score, but if you start watching "Game Of thrones" more passionatly you will improve!');
    } else if (score == 0) {
        $('.rank').text('Game Of Thrones - Dunce');
        $('.rank-msg').text('Doh! You apparently have no Idea about "Game Of thrones".No hopes for improvement, unless you start watching "Game Of thrones"!');
    }
};


//Invokes On click of Start button - starts the trivia game
    $('#start-btn').click(function() {   
        $('#start').fadeOut(500, function() {
        	countdownTimer.start();
        	themeMusic.play();
        	$('#icons').show();
        	run(10000, 5); //milliseconds, frames - to change background
            newGame();
            findQuestion();
            loadQuestion();
            $('#quiz').fadeIn(500);
        });
    });

//invokes On click of 'Submit Answer' button 
    $('#answer-btn').click(function() {
    countdownTimer.stop();    
    $('#timeUp').fadeOut(500);
        var user_answer = $('input:radio[name=ans]:checked').val();
        if (!user_answer) {
            alert('Please make a selection!');
        } else {
            if (correct(user_answer)) {
                $('#quiz').fadeOut(500, function() {
                    score++;
                    updateScore();
                    $('.answer-exp').text( allQuestions[num]["answer-exp"]);
                    $('#correct').fadeIn(500);    
                });
            } else {
                $('#quiz').fadeOut(500, function() {
                    $('.answer-exp').text(allQuestions[num]["answer-exp"]);
                    $('#wrong').fadeIn(500);
                });
            }
        }
    });

//invokes on click of 'Continue' button 
//To Show the Final score or the next question 
    $('.cont-btn').click(function() {
    countdownTimer.stop();    
    $('#timeUp').fadeOut(500);
        $('#correct').fadeOut(500, function() {
            $('#wrong').fadeOut(500, function() {
                if (count >= count_limit) {
             	    updateScore();
                    updateRank();
                    $('#final').fadeIn(500);
                }else {
                	
                    findQuestion();
                    loadQuestion();
                    $('form input').prop('checked', false);
                    $('#quiz').fadeIn(500);
                }
            });
        });
    });

//invokes on click of 'Try Again' button
//To start over the game again
    $('#start-over').click(function() {       
        $('#final').fadeOut(500, function() {
            newGame();
            findQuestion();
            loadQuestion();
            $('form input').prop('checked', false);
            $('#quiz').fadeIn(500);    
        });
    });


//To play the Background theme for Quiz

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
  }

//invokes on click of 'play' icon To play the background music
 $('#playMusic').on("click",function()
  {
    themeMusic.play();
  });

//invokes on click of 'Pause' icon To pause the background music
  $('#pauseMusic').on("click",function()
  {
   themeMusic.stop();
  });

//invokes on click of 'Home' icon to Go to Home page

$('#home').on("click",function(){

	location.reload();

});

// Change Background images dynamically
function run(interval, frames) {
    var int = 1;
    function func() {
        document.body.id = "b"+int;
        int++;
        if(int === frames) { int = 1; }
    }
    var swap = window.setInterval(func, interval);
}


}); // Document.ready() End ---- End of JS-----------