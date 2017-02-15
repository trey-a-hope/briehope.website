var app = angular.module('BrieHope', 
    [
        'ui.router',
        'ui.bootstrap'
    ]
);

app.controller('MainController', function($scope, $state){
    $scope.isOnLandingPage = $state.includes('landing');

    $scope.$watch(function(){
        return $state.$current.name
    }, function(newVal, oldVal){
        $scope.isOnLandingPage = $state.includes('landing');
    }); 
});

