/*eslint-env browser*/



// to do
// 1. add small margin to extra cards
// 6. add 'title' div at top of page
// 7. logic to make ace worth 1 or 11, instead of just 11
// fix time delay when dealer is dealing out its cards..



var gameOn, allScores, currentPlayer, cardVal, cardNum, suitNum, suit, alreadyPlayed, cardName, hiddenCardScore, dealerCard1, dealerCard2, playerCard1, playerCard2;

var dealButton = document.querySelector('.playCard');
var dealerExtracards=0;
var playerExtracards=0;
var dealerSlotNo = 0;
var playerSlotNo = 0;
var dealClicked = false;
var hiddenCardShown = false;


initialise();


// attach anonymous function to playCard button
document.querySelector('.playCard').addEventListener('click', function(){
dealClicked=true;    
if (gameOn){
    
// pick four random cards to start        
var cardElements1 = pickUnplayedCard();
var cardNum1 = cardElements1[0]; 
dealerCard1 =  cardElements1[1];

var cardElements2 = pickUnplayedCard();
var cardNum2 = cardElements2[0]; 
dealerCard2 = cardElements2[1];

var cardElements3 = pickUnplayedCard();
var cardNum3 = cardElements3[0]; 
playerCard1 = cardElements3[1];

var cardElements4 = pickUnplayedCard();
var cardNum4 = cardElements4[0]; 
playerCard2 =  cardElements4[1];


// display the cards in divs 'card1-' and 'card2-'
document.getElementById('card1-0').src = "cards/" + dealerCard1 + ".svg";
document.getElementById('card2-0').src = "cards/upturned.svg";    
// display the cards in divs 'card1-' and 'card2-'
document.getElementById('card1-1').src = "cards/" + playerCard1 + ".svg";
document.getElementById('card2-1').src = "cards/" + playerCard2 + ".svg";  

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
// add hidden card to dealer's score, but don't display it yet
allScores[0]+=hiddenCardScore;  
    
if (score2===21 && (score1 + hiddenCardScore)!==21){    
    document.querySelector('.notifications').textContent = "you win. Natural blackjack";
//alert("You win!!! Natural blackjack");
    showDealerCard();
    gameOn=false; 
}     
else if  (score2===21 && (score1 + hiddenCardScore)===21){
    document.querySelector('.notifications').textContent = "Draw! You and dealer get Natural blackjack";
 //alert("Draw! You and dealer get Natural blackjack");
    showDealerCard();
    gameOn=false;
} 

else if (score2>21){
    document.querySelector('.notifications').textContent = "Bust - over 21";
    showDealerCard();
    gameOn=false;
    
}
    
    
}     
})


function displayNewCard(card){
    var slot
    var playerDiv
    if (currentPlayer===1){
        playerSlotNo++
    playerDiv = document.getElementById('p-1');
    currentPlayer === 0 ? dealerExtracards++ : playerExtracards++;
    slot = document.createElement('img');
    slot.id = 'playerCardSlot' + playerSlotNo; 
    slot.style.width = '10%';  
    slot.class = 'newCardImage'; 
    playerDiv.appendChild(slot);
        
    document.getElementById('playerCardSlot' + playerSlotNo).src = "cards/" + card + ".svg";  }
    
    else{  
    dealerSlotNo++
    playerDiv = document.getElementById('p-0');
    currentPlayer === 0 ? dealerExtracards++ : playerExtracards++;
    slot = document.createElement('img');
    slot.id = 'dealerCardSlot' + dealerSlotNo; 
    slot.style.width = '10%';  
    slot.class = 'newCardImage'; 
    playerDiv.appendChild(slot);
    document.getElementById('dealerCardSlot' + dealerSlotNo).src = "cards/" + card + ".svg";  }
} // end display new card function


document.querySelector('.hit').addEventListener('click', hit)

function hit(){
    if (gameOn && dealClicked){   
        
if (currentPlayer===0){wait(750);}        
        
// pick new card and display       
var newCard = pickUnplayedCard();
var cardNum = newCard[0]; 
var card = newCard[1];
              
displayNewCard(card);       
        
// add card values to total score
var score1 = scorer(cardNum);
allScores[currentPlayer]+=score1;

// display score
document.querySelector('#score-' + currentPlayer).textContent = allScores[currentPlayer];
var thisScore =allScores[currentPlayer];
        
if (thisScore===21)
{ 
    showDealerCard();
    if (allScores[0]!==21){
      document.querySelector('.notifications').textContent = "You win - 21 points!";
    gameOn=false;}
 
    else if (allScores[1]!==21){ document.querySelector('.notifications').textContent = "You lose. Dealer gets 21!";
    gameOn=false;}
 
    else{ 
        document.querySelector('.notifications').textContent = "Draw! You and dealer get 21.";
    gameOn=false;}   
}
        
else if (thisScore>21)       
{ 
showDealerCard();
 var winner = currentPlayer===0? "Dealer is bust, You win" : "You are bust! Dealer wins"; 
 document.querySelector('.notifications').textContent = winner;
 gameOn=false;}   
    
    }
    
} // end hit function

// shows hidden dealer card and dealers score with hidden card value added
function showDealerCard(){ 
document.getElementById('card2-0').src = "cards/" + dealerCard2 + ".svg";    
document.querySelector('#score-0').textContent = allScores[0];
}

document.querySelector('.stick').addEventListener('click', stick);
          


function stick(){ 
    
if (gameOn && dealClicked){     
    
// dealer is now the current player        
currentPlayer=0;        
// change color to show it's dealer's turn    
document.querySelector('.player-0').classList.toggle('current');
document.querySelector('.player-1').classList.toggle('current'); 
var playerFinal = allScores[1]; 
showDealerCard();
    
    
if (allScores[0]===21){
    
     document.querySelector('.notifications').textContent = "Dealer wins!!!";
                   gameOn=false;}
    
while (allScores[0]<21){
    if  (allScores[0]>16){
         document.querySelector('.notifications').textContent = "Dealer holds here!";
        
    if(allScores[0]>playerFinal) {
        document.querySelector('.notifications').textContent = "Dealer wins!";
    gameOn=false;} 
    else if  (allScores[0]<playerFinal){  
    document.querySelector('.notifications').textContent = "you beat dealer!";
    gameOn=false;}
    else{document.querySelector('.notifications').textContent = "It's a tie!";}    
    gameOn=false;
    break;
    
    } // end if statement    
    
else 
// then dealer must choose another card
{   
document.querySelector('.notifications').textContent = "Dealer hits here";
    hit();
   
} // end else   
          
        
            
} // end while loop   
    
    
}// end ' if game on' block
    
    
    
    
}// end stick function

 function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}     

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
        document.querySelector('.notifications').textContent = "No more cards!";
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
    return played;  }

// set/reset all scores to zero 
function initialise(){
alreadyPlayed=[];
allScores=[0,0];
gameOn=true;
    
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('card1-0').src = "";
document.getElementById('card2-0').src = "";
document.getElementById('card1-1').src = "";
document.getElementById('card2-1').src = "";
document.querySelector('.player-1').classList.remove('current'); 
document.querySelector('.player-0').classList.remove('current');
document.querySelector('.player-1').classList.add('current');
document.querySelector('.notifications').textContent = "";
dealButton.disabled = false; 
dealClicked = false;

   
if (dealerExtracards>0 || playerExtracards>0){
    removeCards();
}
      
dealerExtracards=0;
playerExtracards=0;
dealerSlotNo = 0;
playerSlotNo = 0;    
currentPlayer=1;    
    
}// end initialise

function removeCards(){
    
if (dealerExtracards>0)    
{
    for (var i=1; i<= dealerExtracards; i++){
    var dealerDiv = document.getElementById('p-0');
    var element1 = document.getElementById('dealerCardSlot' + i);
    dealerDiv.removeChild(element1);  }    
}
    
if (playerExtracards>0)    
{
    for (var j=1; j<= playerExtracards; j++){
    var playerDiv = document.getElementById('p-1');
    var element2 = document.getElementById('playerCardSlot' + j);
    playerDiv.removeChild(element2);  }  
}    
       
}  // end remove function