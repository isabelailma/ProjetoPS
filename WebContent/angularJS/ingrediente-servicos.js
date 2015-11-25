(function () {
  var ingredienteServicos = angular.module('ingrediente-servicos', []);

  ingredienteServicos.factory('IngredienteAPI', function ($http) {
    const delay = 1;

    function extrairDados(f) {
      return function (ajaxRetorno) {
        return f(ajaxRetorno.data);
      }
    }

    return {
      deletar: function (id, callbackSucesso, callbackErro, callbackAlways) {
        callbackSucesso = extrairDados(callbackSucesso);
        console.log(id)
        $http.post('delete', {'id': id}).then(
          callbackSucesso, function (resposta) {
            callbackErro(resposta.data)
          }
        ).finally(callbackAlways);

      },
      editar: function (ingrediente, callbackSucesso, callbackErro, callbackAlways) {
        callbackSucesso = extrairDados(callbackSucesso);
        $http.post('edit', ingrediente).then(
          callbackSucesso, callbackErro).finally(callbackAlways);
      },
      salvar: function (ingrediente, callbackSucesso, callbackErro, callbackAlways) {
        callbackSucesso = extrairDados(callbackSucesso);
        callbackErro = extrairDados(callbackErro);
        $http.post('new', ingrediente).then(
          callbackSucesso, callbackErro).finally(callbackAlways);
      },
      listar: function (callbackSucesso, callbackErro, callbackAlways) {
        callbackSucesso = extrairDados(callbackSucesso);
        $http.get('rest').then(
          callbackSucesso, callbackErro
        ).finally(callbackAlways);
      }
    };
  });
})();