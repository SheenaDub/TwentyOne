/*eslint-env browser*/

var gameOn, allScores, currentPlayer, cardVal, score, cardNum, suitNum, suit, currentCard;

initialise();

// attach anonymous function to playCard button
document.querySelector('.playCard').addEventListener('click', function(){

if (gameOn){
    
// pick two random cards to start        
var cardElements1 = deal();
var cardNum1 = cardElements1[0]; 
var suit1 =  cardElements1[1];

var cardElements2 = deal();
var cardNum2 = cardElements2[0]; 
var suit2 =  cardElements2[1];

var card1 = cardNum1 + suit1;
var card2 = cardNum2 + suit2;
     
// display the cards in divs 'card1-' and 'card2-'
document.getElementById('card1-' + currentPlayer).src = "cards/" + card1 + ".svg";
document.getElementById('card2-' + currentPlayer).src = "cards/" + card2 + ".svg";    

// add card values to total score
var score1 = scorer(cardNum1);
allScores[currentPlayer]+=score1;
var score2 = scorer(cardNum2);
allScores[currentPlayer]+=score2;
    
// display score
document.querySelector('#score-' + currentPlayer).textContent = allScores[currentPlayer];

//add logic to change current player if turn is over - tbc
//initialise(); 
//document.querySelector('.player-0').classList.toggle('current');
//document.querySelector('.player-1').classList.toggle('current');  
       
}    
    
})


document.querySelector('.hit').addEventListener('click', function(){

if (gameOn){
    
// pick two random cards to start        
var newCard = deal();
var cardNum = newCard[0]; 
var suit =  newCard[1];

var card = cardNum + suit;
    
//console.log("new card is " + card);
     
// display the card - tbc
//document.getElementById('card1-' + currentPlayer).src = "cards/" + card1 + ".svg";
    
// add card values to total score
var score1 = scorer(cardNum);
allScores[currentPlayer]+=score1;

// display score
document.querySelector('#score-' + currentPlayer).textContent = allScores[currentPlayer];
        
}    
    
})










// add initialise function to newGame button
document.querySelector('.newGame').addEventListener('click', initialise)

// pick a random card
function deal(){
    
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
    
return [cardNum, suit];
   
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

// set/reset all scores to zero 
function initialise(){
    
allScores=[0,0];
currentPlayer=0;
score=0; 
gameOn=true;
    
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('card1-0').src = "";
document.getElementById('card2-0').src = "";
document.getElementById('card1-1').src = "";
document.getElementById('card2-1').src = "";
}
