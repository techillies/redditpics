var app = angular.module("myApp", []);

app.controller('mainController', function($scope, $http) {
    $scope.showDetailedView = false;
    $http.get('https://www.reddit.com/r/pics/.json?jsonp=') //Reddit API call for all images
        .then(function(resp) {
            $scope.imageThumbnails = resp.data.data.children;
        });

    $scope.showDetailedImageView = function(imgObj) {
        var comments_link = imgObj.data.permalink;
        getComments(comments_link); //get comments for clicked image

        $scope.showDetailedView = true;
        $scope.clickedImageDetails = imgObj;
    }

    function getComments(permalink) {
        $http.get('https://www.reddit.com/' + permalink + '.json?jsonp=') //Reddit API call for comments
            .then(function(resp_comments) {
                $scope.comments = resp_comments.data[1].data.children;
            });
    }

    $scope.backToHome = function() {
        $scope.showDetailedView = false;
    }
});
