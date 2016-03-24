'use strict';

angular.module('slotMachine', [])
.service('slotMachineService', function () {

  this.firstReelOptions = [
    {
      name: 'coffee maker',
      img: 'img/coffee/coffee-maker.jpg',
      category: 0
    },
    {
      name: 'teapot',
      img: 'img/tea/teapot.jpg',
      category: 1
    },
    {
      name: 'espresso machine',
      img: 'img/espresso/espresso-machine.jpg',
      category: 2
    }
  ];

  this.secondReelOptions = [
    {
      name: 'coffee filter',
      img: 'img/coffee/coffee-filter.jpg',
      category: 0
    },
    {
      name: 'tea strainer',
      img: 'img/tea/tea-strainer.jpg',
      category: 1
    },
    {
      name: 'espresso tamper',
      img: 'img/espresso/espresso-tamper.jpg',
      category: 2
    }
  ];  
  
  this.thirdReelOptions = [
    {
      name: 'coffee grounds',
      img: 'img/coffee/coffee-grounds.jpg',
      category: 0
    },
    {
      name: 'loose tea',
      img: 'img/tea/loose-tea.jpg',
      category: 1
    },
    {
      name: 'ground espresso beans',
      img: 'img/espresso/espresso-beans.jpg',
      category: 2
    }
  ];


  this.prizes = [
    {
      name: 'cup of coffee',
      img: 'img/coffee/cup-of-coffee.jpg',
      category: 0
    },
    {
      name: 'cup of tea',
      img: 'img/tea/cup-of-tea.jpg',
      category: 1
    },
    {
      name: 'cup of espresso',
      img: 'img/espresso/cup-of-espresso.jpg',
      category: 2
    }
  ];


})
.controller('slotMachineController', function($scope, slotMachineService, $interval) {

  var firstReelCounter = 3;
  var secondReelCounter = 3;
  var thirdReelCounter = 3;

  var firstReelOptions = slotMachineService.firstReelOptions;
  var secondReelOptions = slotMachineService.secondReelOptions;
  var thirdReelOptions = slotMachineService.thirdReelOptions;
  var prizes = slotMachineService.prizes;

  $scope.firstReel = firstReelOptions[0];
  $scope.secondReel = secondReelOptions[0];
  $scope.thirdReel = thirdReelOptions[0];
  $scope.isButtonDisabled = false;

  $scope.pullLever = function () {
    $scope.isButtonDisabled = true;
    $scope.prize = null;

    // Spin
    var firstReelInterval = $interval(function(){ 
          var index = firstReelCounter % 3;
          $scope.firstReel = firstReelOptions[index];
          firstReelCounter++;
    }, 200);

    var secondReelInterval = $interval(function(){ 
          var index = secondReelCounter % 3;
          $scope.secondReel = secondReelOptions[index];
          secondReelCounter++;

    }, 200);

    var thirdReelInterval = $interval(function(){ 
          var index = thirdReelCounter % 3;
          $scope.thirdReel = thirdReelOptions[index];
          thirdReelCounter++;
          $scope.areLightsDisplayed = !$scope.areLightsDisplayed;
    }, 200);

    // Stop the spinning
    setTimeout(function(){
      $interval.cancel(firstReelInterval);
    }, 2000);

    setTimeout(function(){
      $interval.cancel(secondReelInterval);
    }, 3500);

    setTimeout(function(){
      $interval.cancel(thirdReelInterval);

      $scope.isButtonDisabled = false;
      $scope.areLightsDisplayed = false;

      // Check if user has won
      if ($scope.firstReel.category === $scope.secondReel.category && $scope.firstReel.category === $scope.thirdReel.category) {
        $scope.prize = prizes[$scope.firstReel.category];
      }
    }, 5000);

  };
});