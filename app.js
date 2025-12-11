// app.js
(function () {
  'use strict';

  var app = angular.module('lphApp', ['ngRoute']);

  // Routing configuration
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeController'
      })
      .when('/menu', {
        templateUrl: 'menu.html',
        controller: 'MenuController'
      })
      .when('/menu/:id', {
        templateUrl: 'menu-detail.html',
        controller: 'MenuDetailController'
      })
      .when('/about', {
        templateUrl: 'about.html',
        controller: 'AboutController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

  // Simple nav controller just to highlight active link
  app.controller('NavController', ['$location', '$scope', function ($location, $scope) {
    $scope.currentYear = new Date().getFullYear();

    this.isActive = function (path) {
      return $location.path() === path;
    };
  }]);

  // Shared menu data service
  app.factory('MenuService', function () {
    var menuItems = [
      {
        id: 1,
        name: 'Family Bucket',
        category: 'Chicken',
        shortDescription: '12 pieces of crispy chicken, 3 sides, and biscuits you fatass.',
        description: 'Perfect for the whole family, but I know you are going to eat all of this by yourself. Disgusting.',
        price: 24.99,
        nutrition: { calories: 3200, protein: 220, carbs: 280, fat: 140 }
      },
      {
        id: 2,
        name: 'Spicy Combo',
        category: 'Chicken',
        shortDescription: 'Chicken or something.',
        description: 'A bunch of chicken or something.',
        price: 9.49,
        nutrition: { calories: 950, protein: 55, carbs: 80, fat: 45 }
      },
      {
        id: 3,
        name: 'Chicken Sandwich',
        category: 'Sandwich',
        shortDescription: 'Crispy chicken fillet on a toasted bun that is way too tall to take a bite out of.',
        description: 'Extremely overpriced.',
        price: 66.99,
        nutrition: { calories: 650, protein: 35, carbs: 60, fat: 28 }
      },
      {
        id: 4,
        name: 'Pollos Fries',
        category: 'Side',
        shortDescription: 'Frozen fries we bought from Walmart.',
        description: 'Crispy fries sprinkled with our signature Los Pollos seasoning.',
        price: 2.99,
        nutrition: { calories: 380, protein: 5, carbs: 48, fat: 18 }
      },
      {
        id: 5,
        name: 'Hermanos Shake',
        category: 'Drink',
        shortDescription: 'Vanilla milkshake with caramel swirl. So many calories in this bad boy.',
        description: 'Rich vanilla ice cream blended into a thick shake with caramel drizzle.',
        price: 3.99,
        nutrition: { calories: 550, protein: 10, carbs: 70, fat: 22 }
      },
      {
        id: 6,
        name: 'Grilled Chicken Salad',
        category: 'Salad',
        shortDescription: 'Grilled chicken on mixed greens because you are on a diet.',
        description: 'A lighter option with grilled chicken, fresh veggies, and house dressing.',
        price: 7.49,
        nutrition: { calories: 420, protein: 32, carbs: 24, fat: 18 }
      }
    ];

    return {
      getAll: function () {
        return menuItems;
      },
      getById: function (id) {
        id = parseInt(id, 10);
        for (var i = 0; i < menuItems.length; i++) {
          if (menuItems[i].id === id) {
            return menuItems[i];
          }
        }
        return null;
      },
      getSpecials: function () {
        // For demo, just return first three items as "specials"
        return menuItems.slice(0, 3);
      }
    };
  });

  // Controllers
  app.controller('HomeController', ['$scope', 'MenuService', function ($scope, MenuService) {
    $scope.specials = MenuService.getSpecials();
  }]);

  app.controller('MenuController', ['$scope', 'MenuService', function ($scope, MenuService) {
    $scope.menuItems = MenuService.getAll();
    $scope.menuSearch = '';
  }]);

  app.controller('MenuDetailController', ['$scope', '$routeParams', 'MenuService',
    function ($scope, $routeParams, MenuService) {
      var id = $routeParams.id;
      $scope.item = MenuService.getById(id);
    }
  ]);

  app.controller('AboutController', ['$scope', function ($scope) {
    // Additional about-page logic could go here
  }]);

})();
