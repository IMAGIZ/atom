'use strict';

module.exports = function ($scope, $state, ModalSaveSearchService, SearchService) {

  // Default sorting options
  $scope.criteria.sort_direction = 'desc';
  $scope.criteria.sort = 'createdAt';

  // Store ids of searches with checkbox selected
  $scope.selectedSearches = [];

  // Toggle selected search
  $scope.toggleSelection = function (id) {
    var index = $scope.selectedSearches.indexOf(id);
    if (index > -1) {
      $scope.selectedSearches.splice(index, 1);
    } else {
      $scope.selectedSearches.push(id);
    }
  };

  $scope.runSearch = function () {
    $state.go('main.search.slug', { slug: $scope.$parent.data.results[$scope.selectedSearches[0]].slug });
  };

  $scope.editSearch = function () {
    ModalSaveSearchService.edit($scope.selectedSearches[0]);
  };

  $scope.deleteSearches = function () {
    for (var key in $scope.selectedSearches) {
      $scope.deleteSearch($scope.selectedSearches[key]);
    }
    this.$emit('searchesChanged');
  };

  $scope.deleteSearch = function (id) {
    SearchService.deleteSearch(id).then(function () {
      console.log('Deleted search ' + id);
    }, function () {
      throw 'Error deleting search ' + id;
    });
  };

  $scope.$on('searchesChanged', function () {
    $scope.selectedSearches = [];
  });

};
