'use strict';

/**
 * User profile controller.
 */
angular.module('docs').controller('UserProfile', function($stateParams, Restangular, $scope) {
  // Load user
  Restangular.one('user', $stateParams.username).get().then(function(data) {
    $scope.user = data;
    // console.error($scope.user);
  });
  Restangular.one('user').get().then(function (data){
    $scope.currentUser = data;
    console.error($scope.currentUser);
  });
  $scope.loadUsersRequests = function() {
    Restangular.one('user/apply_list').get().then(
        function (data) {
          $scope.userReqs = data.userReqs;
        }
    )
  };
  $scope.loadUsersRequests();

  $scope.newUser = {
    username: '',
    password: '',
    email: '',
    storage_quota: ''
  }

  $scope.submitNewUser = function (){
    console.error($scope.newUser);
    Restangular.all('user/createUserReq').post($scope.newUser).then(function() {
      $scope.loadUsersRequests();
      $scope.newUser = {
        username: '',
        password: '',
        email: '',
        storage_quota: ''
      }
    });
  }
});