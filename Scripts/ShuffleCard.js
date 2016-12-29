var numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["H", "D", "C", "S"];
var cards = [];
var drawnCards = [];
var numberOfCards = 0;
var count = 0;
var drawnCount = 1;
var lineBrCount = 5;
var colCount = 0;
var str = "";
var x = 0;
var y = 0;
var cmp = '';
var drawcard = [];

angular.module('cardApp', ['ngSanitize'])
  .controller('cardController', ['$scope', '$filter', function ($scope, $filter) {
      $scope.isdisplaycards = false;
      $scope.shuffled = [];
      $scope.shuffledAll = [];
      $scope.drawnCards = [];
      $scope.cards = [];

      //Shuffle the Card
      $scope.shuffleCard = function () {

          var card = '';
          var num = '';
          var suit = '';
          var number = '';
          cards = [];
          drawcard = [];
          count = 0;
          drawnCount = 0;


          $scope.shuffled = [];
          $scope.shuffledAll = [];
          for (s in suits) {
              suit = suits[s];

              for (n in numbers) {
                  num = numbers[n];
                  card = {
                      order: Math.floor(Math.random() * 5200) + 1,
                      suit: suit,
                      number: num,
                      value: $scope.getCardValue(num),
                      suitValue: $scope.getSuitValue(suit)
                  };
                  cards.push(card);

              }
          }
          $scope.cards = card;
          shuffleArray(cards);
          $scope.displayAllCards(cards);
          $scope.txtNumCards = null;
          return false;

      };

      var shuffleArray = function (array) {
          var m = array.length, t, i;

          // While there remain elements to shuffle
          while (m) {
              // Pick a remaining element…
              i = Math.floor(Math.random() * m--);

              // And swap it with the current element.
              t = array[m];
              array[m] = array[i];
              array[i] = t;
          }

          return array;
      }

      //Drawing the card
      $scope.btnNumCards = function () {


          $scope.shuffledAll = [];

          numberOfCards = parseInt($scope.txtNumCards);
          if (isNaN(numberOfCards) & (cards.length != 0)) {
              alert("Please enter a valid number of cards");
              $scope.displayAllCards(cards);
              return false;
          }

          if ((count + numberOfCards) > 52) {
              alert("you can't draw more than " + cards.length + " please change the draw number of cards");
              $scope.displayAllCards(cards);
              return false;
          }

          for (var i = 0; i < numberOfCards; i++) {
              if (count < 52) {
                  $scope.displayDrawCard(0);
                  drawcard.push(cards[0]);
                  $scope.drawnCards.push(cards[0]);
                  cards.shift();
                  count++;
              } else {
                  alert("All cards are drawn, card deck is empty");
              }
          }
          $scope.displayAllCards(cards);
          //$scope.displaySortCards(drawcard);
          return false;

      };

      $scope.deleteItem = function (index) {
          cards.splice(index, 1);
          return value != cards[0];
      }

      $scope.displayDrawCard = (function (index) {
          $scope.Validate();
          var str;
          var card = cards[index];
          var pane = "ShuffledCards";

          $scope.printAsCard(card, pane);
      });

      //sorting
      $scope.drawCardsBySuit = function () {
          if ($scope.drawnCards.length == 0) {
              alert("Please draw cards before sort");
              return false;
          }

          $scope.drawnCards = $filter('orderBy')(drawcard, ['value', 'suitValue'], false);
          $scope.shuffled = [];

          $scope.displaySortCards($scope.drawnCards);
          return false;

      };

      $scope.getCardValue = (function (number) {
          var value = 0;
          switch (number) {
              case 'A':
                  value = 14;
                  break;
              case '2':
              case '3':
              case '4':
              case '5':
              case '6':
              case '7':
              case '8':
              case '9':
              case '10':
                  value = parseInt(number);
                  break;
              case 'J':
                  value = 11;
                  break;
              case 'Q':
                  value = 12;
                  break;
              case 'K':
                  value = 13;
                  break;

              default:
                  value = 0;
          }
          return value;
      });

      $scope.getSuitValue = (function (suit) {
          var value = '';

          switch (suit) {
              case "C":
                  value = 1;
                  break;
              case "S":
                  value = 2;
                  break;
              case "H":
                  value = 3;
                  break;
              case "D":
                  value = 4;
                  break;
          }

          return value;
      });

      $scope.displayAllCards = (function () {
          $scope.Validate();
          for (c in cards) {
              var card = cards[c];
              var pane = "AllCards";

              $scope.printAsCard(card, pane);
          }
      });

      $scope.displaySortCards = (function () {
          $scope.Validate();
          for (a in $scope.drawnCards) {
              var card = $scope.drawnCards[a];
              var pane = "ShuffledCards";

              $scope.printAsCard(card, pane);
          }
      });

      $scope.Validate = (function () {
          if ((cards.length == 0) & (count == 0)) {
              alert('Please shuffle the cards before drawing.');
              return false;
          }
      });

      $scope.printAsCard = (function (card, pane) {
          colCount++;

          switch (card.suit) {
              case "S":
                  str = "<div class='playingCards' style='float:left'><div class=" + "card rank-" + card.number + " spades" + "href='#'><span class=" + "rank>" + card.number + "</span><span class=suit>&spades;</span></div></div>";
                  break;

              case "D":
                  str = "<div class='playingCards' style='float:left'><font color='red'><div class=" + "card rank-" + card.number + " diams" + "><span class=" + "rank>" + card.number + "</span><span class=suit>&diams;</span></div></font></div>";
                  break;

              case "C":
                  str = "<div class='playingCards' style='float:left'><div class=" + "card rank-" + card.number + " clubs" + "><span class=" + "rank>" + card.number + "</span><span class=suit> &clubs;</span></div></div>";
                  break;

              case "H":
                  str = "<div class='playingCards' style='float:left'><font color='red'><div class=card rank-" + card.number + " hearts ><span class=rank>" + card.number + "</span><span class=suit>&hearts;</span></div></font></div>";
                  break;
          }

          if (colCount == lineBrCount) {
              colCount = 0;
          }

          if (pane == "AllCards") {
              $scope.shuffledAll.push(str)
          }

          if (pane == "ShuffledCards") {
              $scope.shuffled.push(str);
          }
      });

  }])
  .directive('shuffledCards', function () {
      return {

          transclude: false,
          templateUrl: "shuffled-cards.html"
      };
  });

