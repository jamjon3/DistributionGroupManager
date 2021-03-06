(function (window, angular, undefined) {
  'use strict';
  
  /**
   * @ngdoc function
   * @name distributionGroupManagerApp.controller:GetadgroupmembersCtrl
   * @description
   * # GetadgroupmembersCtrl
   * Controller of the distributionGroupManagerApp
   */
  angular.module('distributionGroupManagerApp')
    .controller('GetadgroupmembersCtrl',['UsfProvisionADservice','$scope','$window','$log', function (UsfProvisionADservice,$scope,$window,$log) {
      if(typeof $scope.selectedGroup !== 'undefined' && $scope.selectedGroup !== 'null') {
        $window.alert('Here\'s my group' + (typeof $scope.selectedGroup !== 'undefined')?'undefined':$scope.selectedGroup);
        UsfProvisionADservice.getAdGroupMembersWithDetails($scope.selectedGroup).then(function(data){
            $scope.members = (data.members === 0)?[]:data.members;
            $log.info($scope.members);
            UsfProvisionADservice.setMembers($scope.members);
        },function(errorMessage) {
            $scope.error=errorMessage;
        });
      } else {
        $scope.members = [];
      }
      $scope.$on('handleBroadcast', function() {
        $scope.members = UsfProvisionADservice.getMembers();
      }); 
    }]);
})(window, window.angular);

