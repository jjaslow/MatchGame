var MatchGame = {};

var flippedCards = [];
/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

$(document).ready(function() {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
});

MatchGame.generateCardValues = function() {
  const startValues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  const cardValues = [];
  while (startValues.length > 0) {
    let x = Math.floor(Math.random() * startValues.length);
    let y = startValues[x];
    startValues.splice(x, 1);
    cardValues.push(y);
  }

  return cardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  const colors = [
    'hsl(25,85%,65%)',
    'hsl(55,85%,65%)',
    'hsl(90,85%,65%)',
    'hsl(160,85%,65%)',
    'hsl(220,85%,65%)',
    'hsl(265,85%,65%)',
    'hsl(310,85%,65%)',
    'hsl(360,85%,65%)'
  ];
  $game.empty();
  // $game.data('flippedCards', []);
  for (let x = 0; x < cardValues.length; x++) {
    let colorValue = cardValues[x];
    let color = colors[colorValue - 1];
    let $card = $('<div class="col-xs-3 card"></div>');
    $card.data({ value: cardValues[x], flipped: false, color: color });
    $game.append($card);
  }
  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('flipped') === true) {
    console.log('already flipped');
    console.log('--');
    return;
  }

  $card.data('flipped', true);
  $card.css('background-color', $card.data('color'));
  $card.text($card.data('value'));

  flippedCards.push($card);
  console.log(flippedCards);

  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      //match
      console.log('match');
      flippedCards[0].css('background-color', 'rgb(153,153,153)');
      flippedCards[0].css('color', 'rgb(204,204,204)');
      flippedCards[1].css('background-color', 'rgb(153,153,153)');
      flippedCards[1].css('color', 'rgb(204,204,204)');
    } else {
      // nomatch
      console.log('no match');
      console.log(flippedCards[0].data('value'));
      console.log(flippedCards[1].data('value'));
      setTimeout(function() {
        flippedCards[0].css('background-color', 'rgb(32, 64, 86)');
        flippedCards[0].data('flipped', false);
        flippedCards[0].text('');
        flippedCards[1].css('background-color', 'rgb(32, 64, 86)');
        flippedCards[1].data('flipped', false);
        flippedCards[1].text('');
      }, 350);
    }
    flippedCards = [];
  }
};
