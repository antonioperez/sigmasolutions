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
            auth.signInWithEmailAndPassword($scope.email, $scope.password)
            .then(function(user) {
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
            });

        }
    }
})();