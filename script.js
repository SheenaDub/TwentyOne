/*eslint-env browser*/

var gameOn, allScores, currentPlayer, cardVal, cardNum, suitNum, suit, alreadyPlayed, cardName, hidden, hiddenCardScore;

var dealButton = document.querySelector('.playCard');


initialise();




// attach anonymous function to playCard button
document.querySelector('.playCard').addEventListener('click', function(){


    
if (gameOn){
    
// pick four random cards to start        
var cardElements1 = pickUnplayedCard();
var cardNum1 = cardElements1[0]; 
var dealer1 =  cardElements1[1];

var cardElements2 = pickUnplayedCard();
var cardNum2 = cardElements2[0]; 
hidden = cardElements2[1];

var cardElements3 = pickUnplayedCard();
var cardNum3 = cardElements3[0]; 
var card3 = cardElements3[1];

var cardElements4 = pickUnplayedCard();
var cardNum4 = cardElements4[0]; 
var card4 =  cardElements4[1];


// display the cards in divs 'card1-' and 'card2-'
document.getElementById('card1-0').src = "cards/" + dealer1 + ".svg";
document.getElementById('card2-0').src = "cards/upturned.svg";    
// display the cards in divs 'card1-' and 'card2-'
document.getElementById('card1-1').src = "cards/" + card3 + ".svg";
document.getElementById('card2-1').src = "cards/" + card4 + ".svg";
    

// add card values to total score
var score1 = scorer(cardNum1);
hiddenCardScore = scorer(cardNum2);
    
allScores[0]+=score1;
var score2 = scorer(cardNum3) + scorer(cardNum4);
allScores[1]+=score2;
   
    
// display score
document.querySelector('#score-0').textContent = allScores[0];
document.querySelector('#score-1').textContent = allScores[1];

    
dealButton.disabled = true;   
    
    
if (score2===21){    
alert("You win!!!");
    gameOn=false; 
}    
    
//add logic to change current player if turn is over - tbc
//initialise(); 
       
}    
    
    
})


document.querySelector('.hit').addEventListener('click', hit)


function hit(){
    
    if (gameOn){   
// pick new card        
var newCard = pickUnplayedCard();
var cardNum = newCard[0]; 
var card = newCard[1];
//console.log("new card is " + card);
     
// display the card - tbc
//document.getElementById('card1-' + currentPlayer).src = "cards/" + card1 + ".svg";
    
// add card values to total score
var score1 = scorer(cardNum);
allScores[currentPlayer]+=score1;

// display score
document.querySelector('#score-' + currentPlayer).textContent = allScores[currentPlayer];
var thisScore =allScores[currentPlayer];
        
if (thisScore===21)
{
    alert("you win!!! inside hit function");
}
   
else if (thisScore>21)       
{alert("you are bust!!! inside hit function");
 gameOn=false;
}
        
}    
    
    
}

//function getDealerScore(){
//    
//    
//    
//}


document.querySelector('.stick').addEventListener('click', function(){
    
    
    if (gameOn){ 
        
// dealer is now the current player        
currentPlayer=0;        

// change color to show it's dealer's turn    
document.querySelector('.player-0').classList.toggle('current');
document.querySelector('.player-1').classList.toggle('current');
    
var playerFinal = allScores[1];
    
setTimeout(function(){

document.getElementById('card2-0').src = "cards/" + hidden + ".svg";
allScores[0]+=hiddenCardScore;    
document.querySelector('#score-0').textContent = allScores[0];

if (allScores[0]===21){alert("dealer wins!!!");
                   gameOn=false;}
    
while (allScores[0]<21){
    if  (allScores[0]>16){
    alert("dealer holds here...!");
    if(allScores[0]>playerFinal) {alert("dealer wins, has more points than you!");} 
    else if  (allScores[0]<playerFinal){alert("you beat dealer!");}
    else{alert("it's a tie!");}    
    gameOn=false;
    break;}
       
else 
    // then dealer must choose another card
{alert("dealer hits here...");
    hit();
    if (allScores[0]>21){
    alert("Dealer is bust! You Win!");
    gameOn=false;
    break;
}
    check21(allScores[0])? alert("dealer wins after this hit"): alert("dealer does not win after this hit");}
    
}

}, 750);  
        
       
    
}

    
     
    
    
}) 



// add initialise function to newGame button
document.querySelector('.newGame').addEventListener('click', initialise)

// pick a random card
function pickOneCard(){
    

cardNum = Math.floor(Math.random()*13) + 2;
suitNum = Math.floor(Math.random()*4) + 1;   
if (suitNum ===1){
    suit='h';}
else if(suitNum ===2){
    suit='s';}
else if(suitNum ===3){
    suit='d';}
else {
    suit='c';} 
    
cardName = cardNum + suit; 
    
return [cardNum, cardName];
   
}

function pickUnplayedCard(){
    
    if (alreadyPlayed.length===52){
        alert("no more cards!");
        gameOn=false;
        return;
    }
    var cardEl;
    var played = false;
    
    do {
    cardEl = pickOneCard();
    played = checkPlayed(cardEl[1]);
        
    } while (played);
        
    alreadyPlayed.push(cardEl[1]);
    
    return cardEl;    
    
    

}

// work out and return value of card 
function scorer (cardNum){
    if (cardNum<=10){
        cardVal=cardNum;} 
    else if 
        (cardNum >=11 && cardNum<=13){
                    cardVal=10;}
    else cardVal=11;
    return cardVal;      
}

function checkPlayed(card){
    
    var played = (alreadyPlayed.indexOf(card) ===-1) ? false : true;
    
    return played;
    
}

function check21(num){ return num===1 ? true : false; }

// set/reset all scores to zero 
function initialise(){
    
alreadyPlayed=[];
allScores=[0,0];
currentPlayer=1;
score=0; 
gameOn=true;
    
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('card1-0').src = "";
document.getElementById('card2-0').src = "";
document.getElementById('card1-1').src = "";
document.getElementById('card2-1').src = "";
document.querySelector('.player-1').classList.toggle('current'); 
document.querySelector('.player-0').classList.toggle('current');  
dealButton.disabled = false; 
}


