(function () {

    angular
        .module('app')
        .controller('AccountCtrl', [
            '$http',
            '$scope',
            '$location',
            '$state',
            Ctrl
        ]);

    function Ctrl($http, $scope, $location, $state) {

        var auth = firebase.auth();
        //demo info
        $scope.email = "sigmasolutions@ecoverse.io";
        $scope.password = "demo123";

        var sendEmailVerification = function () {
            auth.currentUser.sendEmailVerification().then(function () {
                console.log('Email Verification Sent!');
            });
        }

        var signin = function (email, password) {
            // Sign in with email and pass.
            auth.signInWithEmailAndPassword(email, password)
                .then(function (user) {
                    console.log(user);
                    $state.go('index.dashboard');
                })
                .catch(function (error) {

                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        console.log('Wrong password.');
                    } else {
                        console.log(errorMessage);
                    }
                    $scope.errorMessage = errorMessage;
                });
        }

        var signup = function (email, password) {
            auth.createUserWithEmailAndPassword(email, password)
                .then(function (user) {
                    console.log(user);
                    sendEmailVerification();
                    $state.go('index.dashboard');
                })
                .catch(function (error) {
                    var errorMessage = error.message;
                    $scope.errorMessage = errorMessage;
                });
        }


    function sendPasswordReset(email) {
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        $scope.message = 'Password Reset Email Sent!';
      }).catch(function(error) {
        var errorMessage = error.message;
        $scope.errorMessage = errorMessage;
      });
    }

    $scope.sendPasswordReset = function() {
        sendPasswordReset($scope.email);
    };


        $scope.signIn = function () {

            if (auth.currentUser) {
                console.log("Sign out");
                auth.signOut();
            }
            $scope.password = $scope.password.trim();
            $scope.email = $scope.email.trim();
            if ($scope.email.length < 1) {
                alert('Please enter an email address.');
                return;
            }
            if ($scope.password.length < 4) {
                alert('Your Password is too short');
                return;
            }

            // Sign in with email and pass.
            signin($scope.email, $scope.password);
        }

        $scope.signUp = function () {
            $scope.password = $scope.password.trim();
            $scope.email = $scope.email.trim();
            if ($scope.email.length < 1) {
                alert('Please enter an email address.');
                return;
            }
            if ($scope.password.length < 1) {
                alert('Please enter a password.');
                return;
            }
            // Sign in with email and pass.
            signup($scope.email, $scope.password);
        }

    }
})();