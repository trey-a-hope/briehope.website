var app = angular.module('BrieHope', 
    [
        'ui.router',
        'ui.bootstrap',
        '720kb.tooltips'
    ]
);

app.controller('MainController', function($scope, $state){
    $scope.isOnLandingPage = $state.includes('intro');

    $scope.$watch(function(){
        return $state.$current.name
    }, function(newVal, oldVal){
        $scope.isOnLandingPage = $state.includes('intro');
    }); 
});

