// Ionic Starter App


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('starterCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
$scope.title = 'АРМ';
 $scope.tabs = [
    {
      icon: 'home',
      active: 'active',
      url: 'home'
    },
    {
      icon: 'star',
      active: '',
      url: 'notes'
    }
  ];

$scope.closeApp = function() {
  ionic.Platform.exitApp();
}

  //TEMPLATING
$scope.loadTemplate = function(path) {
  $scope.templateURL = 'templates/' + path + '.html';
};

$scope.setActive = function(id) {
  angular.forEach($scope.tabs, function(val) {
    val.active = ''; 
  });
  $scope.tabs[id].active = 'active';
}

  $scope.config = {
    'getNotes' : 'https://api.mlab.com/api/1/databases/myexpenses/collections/notes/?apiKey=Vk4ZP1VrQHVSyyDRjS88njVfMurYM_6K'
  }
    $scope.getData = function() {
        $http.get($scope.config.getNotes)
            .success(function(data) {
                $scope.notes = data;
            })
            .error(function(data) {
                alert("ERROR");
            });
    }
    $timeout($scope.getData(),10);
}])

.controller('homeCtrl', ['$scope', '$http', '$timeout', '$ionicModal', function($scope, $http, $timeout, $ionicModal){
    $scope.config = {
      'getGroups': 'https://api.mlab.com/api/1/databases/myexpenses/collections/groups/?apiKey=Vk4ZP1VrQHVSyyDRjS88njVfMurYM_6K',
      'getStuds': 'https://api.mlab.com/api/1/databases/myexpenses/collections/studs/?apiKey=Vk4ZP1VrQHVSyyDRjS88njVfMurYM_6K'
    };
    $scope.queryGroups = function() {
        $http.get($scope.config.getGroups)
            .success(function(data) {
                $scope.groups = data;
            })
            .error(function(data) {
                alert("ERROR");
            });
        $http.get($scope.config.getStuds)
            .success(function(data) {
                $scope.studs = data;
            })
            .error(function(data) {
                alert("ERROR");
            });
    }
    $timeout($scope.queryGroups(),10);

    $ionicModal.fromTemplateUrl('views/group.html', function(modal) {
      $scope.taskModal = modal;
    },{
      scope: $scope,
      animation: 'slide-in-up'
    });

    $scope.openGroup = function(id) {
      $scope.openedGroup = id;
      $scope.taskModal.show();
    }

    $scope.closeGroup = function() {
      $scope.taskModal.hide();
    }
}])
