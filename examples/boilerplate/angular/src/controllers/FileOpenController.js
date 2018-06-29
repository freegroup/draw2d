app.controller('FileOpenController',  function($scope, $modalInstance, FileFactory) {

	$scope.files    = [];
	$scope.selected = {file:null};

	// Retrieve the file definitions from the FileFactory and 
	// provide them to the scope
	//
	FileFactory.getFileEntries(function(entries) {
		$scope.$apply(function() {
	       $scope.files = entries;
		});
	});

	// ng-click for "Ok"
	//
	$scope.ok = function() {
	    FileFactory.getContent($scope.selected.file, function(content) {
	        $scope.$apply(function() {
	            $modalInstance.close(content);
	        });
	    });
	};

	// ng-click for "Cancel"
	//
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
} );