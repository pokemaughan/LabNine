
angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
function($scope,$http){
    $scope.test = 'Hello world!';
    $scope.comments = [
      {title:'Comment 1', upvotes:5},
      {title:'Comment 2', upvotes:6},
      {title:'Comment 3', upvotes:1},
      {title:'Comment 4', upvotes:4},
      {title:'Comment 5', upvotes:3}
    ];

    $scope.create = function(comment) {
      return $http.post('/comments', comment).success(function(data){
        $scope.comments.push(data);
      });
    };

    $scope.addComment = function() {
	$scope.create({title:$scope.formContent,upvotes:0});

       // $scope.comments.push({title:$scope.formContent,upvotes:0});
	$scope.formContent='';    
    };

    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes = data.upvotes;
        });
    };

    $scope.incrementUpvotes = function(comment) {
        $scope.upvote(comment);
    };    

    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };
    $scope.getAll();

    $scope.results = [];
    $scope.findValue = function(enteredValue) {
	$scope.results = [];
	angular.forEach($scope.comments, function(value, key) {
		if(value.title.match(enteredValue)) {
			$scope.results.push({title:value.title, upvotes: value.upvotes});
		}
	});
    }
    
    angular.module('myApp',[]).factory('getDataService', function($http) {
	return {
	    getData: function(done) {
		http.get('http://ec2-54-213-72-174.us-west-2.compute.amazonaws.com:3009/comments')
		    .success(function(data) {
		    done(data);
		})
		.error(function(error) {
		    alert('error');
		});
	    }
	}
    });

  }
]);
