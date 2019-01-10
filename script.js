/*eslint-env browser*/

var allScores, currentPlayer;

allScores=[0,0];
currentPlayer=0;



document.getElementById('score-0').textContent = '0';
document.getElementById('hand-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('hand-1').textContent = '0';


//document.getElementById('hand-' + currentPlayer).innerHTML = '<b>' + currentCard + '</b>';

document.querySelector('.playCard').addEventListener('click', function(){

// pick a random card    
var currentCard = Math.floor(Math.random()*52) + 1;

// display the card
document.querySelector('#hand-' + currentPlayer).textContent = currentCard;
    
// add to total score - tbc
    
})

//var x = document.getElementById('score-0').textContent;
//document.querySelector('#hand-' + currentPlayer).textContent = currentCard;
// NB can use querySelector or getElementById
