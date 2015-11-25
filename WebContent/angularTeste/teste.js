var categoriaApi = {
  deletar: function (id, callbackSucesso, callbackErro, callbackAlways) {

    setTimeout(function () {
      if (callbackSucesso) {

        callbackSucesso();
      } else if (callbackErro && categoria.nome === '') {
        callbackErro({'nome': 'Campo Obrigatório'});
      }

      if (callbackAlways) {
        callbackAlways();
      }
      $rootScope.$digest();
    }, delay);

  },
  editar: function (categoria, callbackSucesso, callbackErro, callbackAlways) {

    setTimeout(function () {
      if (callbackSucesso && categoria.nome !== '') {

        const categoriaDoServidor = {
          'id': 1,
          creation: '02/02/02 02:02:02',
          nome: categoria.nome
        };
        callbackSucesso(categoriaDoServidor);
      } else if (callbackErro && categoria.nome === '') {
        callbackErro({'nome': 'Campo Obrigatório'});
      }

      if (callbackAlways) {
        callbackAlways();
      }
      $rootScope.$digest();
    }, delay);

  },
  salvar: function (categoria, callbackSucesso, callbackErro, callbackAlways) {

    console.log('Chamada ajax fake para salvar inciando');
    var id = 0;

    id++;
    if (callbackSucesso && categoria.nome !== '') {

      const categoriaDoServidor = {
        'id': id,
        creation: '02/02/02 02:02:02',
        nome: categoria.nome
      };
      this.salvarSucesso = function () {
        callbackSucesso(categoriaDoServidor)
      };
    } else if (callbackErro && categoria.nome === '') {
      this.salvarErro = function () {
        callbackErro({'nome': 'Campo Obrigatório'})
      };
    }

    if (callbackAlways) {
      this.salvarAlways = callbackAlways;
    }


    console.log('Finalizando salvar do serviço');
  },
  listar: function (callbackSucesso, callbackErro, callbackAlways) {
    setTimeout(function () {
      if (callbackSucesso) {

        const categoriasDoServidor = [
          {
            'id': 1,
            creation: '02/02/02 02:02:02',
            nome: 'Celulares'
          },
          {
            'id': 2,
            creation: '03/03/03 02:02:02',
            nome: 'Notebooks'
          },
          {
            'id': 3,
            creation: '04/04/04 02:02:02',
            nome: 'Tablets'
          }
        ];
        callbackSucesso(categoriasDoServidor);
      } else if (callbackErro) {
        callbackErro({'nome': 'Campo Obrigatório'});
      }

      if (callbackAlways) {
        callbackAlways();
      }
      $rootScope.$digest();
    }, delay);

    console.log('Finalizando salvar do serviço');
  }
};


//Mudei
angular.module('ingrediente-servicos', []).factory(
  'CategoriaAPI', function () {

    return categoriaApi;
  });

//Começando Testes
angular.module('ingrediente-components');
QUnit.test('Teste de Diretiva', function (assert) {
  var injector = angular.injector(['ng', 'ingrediente-components']);
  var el = angular.element('<ingrediente-form></ingrediente-form>');
  var escopoRaiz;
  injector.invoke(function ($compile, $rootScope, $templateCache) {
    $templateCache.put('ingrediente-form.html', '<a>Blah</a>');
    el = $compile(el)($rootScope);
    escopoRaiz = $rootScope;
  });
  escopoRaiz.$digest();
  var escopo = el.scope();
  var escopoIsolado = el.isolateScope();

  assert.strictEqual('', escopoIsolado.categoria.nome, 'Nome inicial de categoria');
  assert.equal(undefined, escopoIsolado.erros.nome, 'Não possui erros');
  assert.notOk(escopoIsolado.salvandoCategoriaFlag, 'Não está fazendo salvamento');

  escopoIsolado.salvar({'nome': 'Bacon'});
  assert.equal(undefined, escopoIsolado.erros.nome, 'Não possui erros');
  assert.ok(escopoIsolado.salvandoCategoriaFlag, 'Está fazendo salvamento');

  categoriaApi.salvarSucesso();

});

QUnit.test('Teste de Controlador Angular', function (assert) {


  angular.module('ingredienteApp');

  var injector = angular.injector(['ng', 'ingredienteApp']);
  var $controllerFactories = injector.get('$controller');
  var escopo = {};
  $controllerFactories('IngredienteCtrl', {'$scope': escopo});


  assert.strictEqual(0, escopo.ingredientes.length, 'Categorias vazio inicialmente');
  var cat0 = {
    'id': 1,
    creation: '02/02/02 02:02:02',
    nome: 'Celulares'
  };

  escopo.adicionarIngrediente(cat0);
  assert.strictEqual(1, escopo.ingredientes.length, 'Uma Categoria adicionada');
  assert.strictEqual(cat0, escopo.ingredientes[0], 'Categoria adicionada na primeira posicao');
  var cat1 = {
    'id': 2,
    creation: '03/03/03 02:02:02',
    nome: 'Notebooks'
  };
  escopo.adicionarIngrediente(cat1);
  assert.strictEqual(2, escopo.ingredientes.length, 'Uma Categoria adicionada');
  assert.strictEqual(cat0, escopo.ingredientes[1], 'Categoria movida para segunda posição');
  assert.strictEqual(cat1, escopo.ingredientes[0], 'Categoria adicionada na primeira posicao');

});