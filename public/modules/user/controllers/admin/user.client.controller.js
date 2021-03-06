'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', '$http', 'Authentication', 'userResolve','TimeLine',
    function ($scope, $state, $http, Authentication, userResolve,TimeLine) {
        $scope.authentication = Authentication;
        $scope.user = userResolve;

        $scope.remove = function (user) {
            if (confirm('Are you sure you want to delete this user?')) {
                if (user) {
                    user.$remove();

                    $scope.users.splice($scope.users.indexOf(user), 1);
                } else {
                    $scope.user.$remove(function () {
                        $state.go('admin.users');
                    });
                }
            }
        };

        TimeLine.query(function (data) {
            $scope.timeLines = data;
        });

        $scope.update = function () {
            var user = $scope.user;

            user.$update(function () {
                $state.go('admin.user', {
                    userId: user._id
                });
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);
