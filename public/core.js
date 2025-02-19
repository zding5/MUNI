// public/core.js

var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http){
	$scope.formData = {};

	// when landing on the page, get all todos and show them

	$http.get('/api/todos').success(function(data){
		$scope.todos = data;
		console.log(data);
	}).error(function(data){
		console.log('Error: ' + data);
	});

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function(){
		// console.log($http.post('/api/todos', $scope.formData)).sucess;
		$http.post('/api/todos', $scope.formData).success(function(data){

			$scope.formData = {};
			// clear the form so our user is ready to enter another
			$scope.todos = data;
			console.log(data);
		}).error(function(data){
			console.log('Error: '+data);
		});

		// console.log('HA');
	};

	 // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


}