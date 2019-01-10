/*eslint-env browser*/

var allScores, currentPlayer, cardVal, score;

allScores=[0,0];
currentPlayer=0;
score=0;

resetScores();

// attach anonymous function to playCard button
document.querySelector('.playCard').addEventListener('click', function(){

// pick a random card      
var cardNum = Math.floor(Math.random()*13) + 2;
var suitNum = Math.floor(Math.random()*4) + 1;
var suit;   
if (suitNum ===1){
    suit='h';}
else if(suitNum ===2){
    suit='s';}
else if(suitNum ===3){
    suit='d';}
else {
    suit='c';}  
var currentCard = cardNum + suit;

// display the card - currently just 'number' of card, not graphic
//document.querySelector('#hand-' + currentPlayer).textContent = currentCard;
console.log("current card is" + currentCard);
document.getElementById('hand-' + currentPlayer).src = currentCard + ".svg";


    
// add card value to total score
score = scorer(cardNum);
allScores[currentPlayer]+=score;
    
// display score
document.querySelector('#score-' + currentPlayer).textContent = allScores[currentPlayer];

//add logic to change current player if turn is over - tbc
//resetScores(); 
//document.querySelector('.player-0').classList.toggle('current');
//document.querySelector('.player-1').classList.toggle('current');

})


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

// reset all scores to zero 
function resetScores(){
document.getElementById('score-0').textContent = '0';
document.getElementById('hand-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('hand-1').textContent = '0';
}
