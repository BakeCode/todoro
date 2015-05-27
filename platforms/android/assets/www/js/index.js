var TodoroApp = angular.module('Todoro', ['ngCordova', 'ngTouch', 'ngMaterial']);
TodoroApp.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('light-green')
        .accentPalette('orange')
        .warnPalette('red');
});

TodoroApp.controller('Sidebar', ['$scope', '$mdSidenav',
        function ($scope, $mdSidenav) {
            $scope.toggleSidenav = function (menuId) {
                $mdSidenav(menuId).toggle();

            };

        }
    ]
);

TodoroApp.controller('CircleControl', ['$scope', '$interval',
    function ($scope, $interval) {
        $scope.mode = 'query';
        $scope.determinateValue = 0;
        $scope.seconds = 1500;
        $scope.timeLeft = '25:00';
        $scope.startButtonText = 'Start';
        $scope.circleClass = 'md-warn';
        var timer;
        $scope.startTimer = function () {
            if (angular.isDefined(timer)) {
                $scope.pauseTimer();
                $scope.startButtonText = 'Start';
                return;
            }
            $scope.startButtonText = 'Pause';

            timer = $interval(function () {


                var minutes = Math.round(($scope.seconds - 30) / 60),
                    remainingSeconds = $scope.seconds % 60;

                if (remainingSeconds < 10) {
                    remainingSeconds = "0" + remainingSeconds;
                }
                $scope.timeLeft = minutes + ":" + remainingSeconds;

                $scope.determinateValue = (((1500 - $scope.seconds) / 1500) * 100).toFixed(0);
                if ($scope.determinateValue == 0){
                    $scope.circleClass = 'md-warn';
                }
                if ($scope.determinateValue >50){
                    $scope.circleClass = 'md-accent';
                }
                if ($scope.determinateValue >80){
                    $scope.circleClass = 'md-primary';
                }
                if ($scope.seconds == 0) {
                    $scope.pauseTimer();
                    $scope.seconds = 1500;
                    $scope.startButtonText = 'Start';
                } else {
                    $scope.seconds--;
                }
            }, 100, 0, true);
        };


        $scope.pauseTimer = function () {
            if (angular.isDefined(timer)) {
                $interval.cancel(timer);
                timer = undefined;
            }
        }
    }
]);

TodoroApp.controller('TodoListControl', function ($scope) {
    $scope.todos = [];
    $scope.todoSelected = false;
    for (var i = 0; i < 15; i++) {
        $scope.todos.push({
            todo: "Reading an article? " + i,
            where: "@home",
            project: "+Freetime"
        });
    }

    $scope.chooseTask = function (item) {
        $scope.todoSelected = true;
        $scope.currentTask = item.todo;
    }
});

function onDeviceReady() {
    console.log('device ready');
    var domElement = document.getElementById('appIndex');
    angular.bootstrap(domElement, ["Todoro"]);
    console.log(cordova.file);
    }

//var app = {
//    // Application Constructor
//    initialize: function() {
//        this.bindEvents();
//    },
//    // Bind Event Listeners
//    //
//    // Bind any events that are required on startup. Common events are:
//    // 'load', 'deviceready', 'offline', and 'online'.
//    bindEvents: function() {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
//    },
//    // deviceready Event Handler
//    //
//    // The scope of 'this' is the event. In order to call the 'receivedEvent'
//    // function, we must explicitly call 'app.receivedEvent(...);'
//    onDeviceReady: function() {
//        app.receivedEvent('deviceready');
//    },
//    // Update DOM on a Received Event
//    receivedEvent: function(id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);
//    }
//};
//app.initialize();