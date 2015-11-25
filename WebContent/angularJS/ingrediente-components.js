(function () {
  var ingredienteComponents = angular.module('ingrediente-components', ['ingrediente-servicos']);

  ingredienteComponents.directive('ingredienteForm', function () {
    return {
      restric: 'E',
      templateUrl: 'ingrediente-form.html',
      replace: true,
      scope: {
        salvarIngredienteListener: '&'
      },
      controller: function ($scope, IngredienteAPI) {
    	// Arrumar
    	$scope.ingrediente = {};
        $scope.erros = {};
        $scope.salvandoIngredienteFlag = false;
        $scope.loading = false;

        $scope.salvar = function () {
          $scope.erros = {};
          $scope.salvandoIngredienteFlag = true;
          $scope.loading = true;
          IngredienteAPI.salvar($scope.ingrediente, function (ingredienteSalva) {
              $scope.salvarIngredienteListener({'ingrediente': ingredienteSalva});
              $scope.ingrediente = {};
            },
            function (erros) {
              $scope.erros = erros;
              console.log(erros);
            }, function () {
              $scope.salvandoIngredienteFlag = false;
              $scope.loading = false;
            });
        }

      }
    };
  });


  ingredienteComponents.directive('ingredienteTabela', function () {
    return {
      restric: 'E',
      templateUrl: 'ingrediente-tabela.html',
      replace: true,
      scope: {
    	  ingredientes: '='
      },
      controller: function ($scope, IngredienteAPI) {
        $scope.listandoIngredientesFlag = true;
        $scope.loading = true;
        IngredienteAPI.listar(function (ingredientes) {
          $.each(ingredientes, function (index, ingre) {
            $scope.ingredientes.push(ingre);
          });
        }, function () {
        	console.log(erros);
        }, function () {
          $scope.listandoIngredientesFlag = false;
          $scope.loading = false;
        });

        $scope.removerLinha = function (index) {
          $scope.ingredientes.splice(index, 1);
        }
      }

    };
  });


  ingredienteComponents.directive('ingredienteTabelaLinha', function () {
    return {
      restric: 'A',
      templateUrl: 'ingrediente-tabela-linha.html',
      replace: true,
      scope: {
    	ingrediente: '=',
        deletarIngredienteListener: '&'
      },
      controller: function ($scope, IngredienteAPI) {
        $scope.editandoFlag = false;
        $scope.ingredienteParaEdicao = {};
        $scope.loading = false;
        
        $scope.editarToggle = function () {
          $scope.editandoFlag = !$scope.editandoFlag;
          $scope.ingredienteParaEdicao.nome = $scope.ingrediente.nome;
          $scope.ingredienteParaEdicao.id = $scope.ingrediente.id;
        };

        $scope.editar = function () {
          IngredienteAPI.editar($scope.ingredienteParaEdicao, function (ingrediente) {
            $scope.ingrediente.nome = ingrediente.nome;
          }, function(erros){
        	  console.log(erros);
          }, function(){
            $scope.editandoFlag = false;
          });
        };

        $scope.deletar = function () {
          $scope.loading = true;
          console.log('deletar');
          console.log($scope.ingrediente.id);
          IngredienteAPI.deletar($scope.ingrediente.id, function () {
            //arrumar
        	  $scope.deletarIngredienteListener();
          }, function(erros){
        	  console.log(erros);
          }, function(){
        	  $scope.loading = false;
          });
        };

      }

    };
  });
})();