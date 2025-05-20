'use strict';

/**
 * Settings user page controller.
 */
angular.module('docs').controller('SettingsUser', function($scope, $state, Restangular) {
  /**
   * Load users from server.
   */
  $scope.loadUsers = function() {
    Restangular.one('user/list').get({
      sort_column: 1,
      asc: true
    }).then(function(data) {
      $scope.users = data.users;
    });
  };
  
  $scope.loadUsers();
  /**
   * Load users requests from server.
   */
  $scope.loadUsersRequests = function() {
    Restangular.one('user/apply_list').get().then(
        function (data) {
          $scope.userReqs = data.userReqs;
        }
    )
  };
  $scope.loadUsersRequests();

  /**
   * Approve a user request.
   */

  $scope.approveUser = function(username) {
    Restangular.one('user/approveUserReq').put({username: username}).then(function() {
      $scope.loadUsersRequests();
      $scope.loadUsers();
    })
  };
  /**
   * Reject a user request.
   */
  $scope.rejectUser = function(username) {
    Restangular.one('user/rejectUserReq').put({username: username}).then(function() {
      $scope.loadUsersRequests();
    });
  };


  /**
   * Edit a user.
   */
  $scope.editUser = function(user) {
    $state.go('settings.user.edit', { username: user.username });
  };
});