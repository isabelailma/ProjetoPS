(function () {

  var ingredienteApp = angular.module('ingredienteApp', ['ingrediente-components']);

  ingredienteApp.controller('IngredienteCtrl', function ($scope) {
    $scope.ingredientes = [];

    $scope.adicionarIngrediente = function (ingrediente) {
      $scope.ingredientes.unshift(ingrediente);
    }

  });
})();