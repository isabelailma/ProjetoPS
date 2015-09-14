$(document).ready(function () {
  var $formWell = $('#form-well');
  var $formGroups = $('div.form-group');
  var $helpBlocks = $('span.help-block');
  var $nomeInput = $('#nome-input');
  var $tabelaCategoria = $('#tabela-categoria')
  quantidade = 1;
	  
  $formWell.hide();
  $('#botao-novo-igrediente').click(function () {
    $formWell.slideToggle();
  });

  function limparErros() {
    $formGroups.removeClass('has-error');
    $helpBlocks.text('');
  }

  $.get('http://localhost:8080/igredientes/rest',function(categorias){
    console.log(categorias);
  },'json');

  function adicionarCategoria(categoria) {
    var linha = '<tr>';
    linha += '<td>' + categoria.id + '</td>';
    linha += '<td>' + categoria.creation + '</td>';
    linha += '<td>' + categoria.nome + '</td>';
    linha += '<td>';
    linha += '<button class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash"></i></button>';
    linha += '</td ></tr>';

    var $linhaObjeto = $(linha);
    var $botao = $linhaObjeto.find('button.btn').click(function () {
      console.log(categoria.id);
      $linhaObjeto.remove();
    });
    
    $tabelaCategoria.append($linhaObjeto);
    quantidade = quantidade + 1;
  }

  function listarCategorias(categorias){
    $.each(categorias, function(i, cat){
      adicionarCategoria(cat);
    })
  }

  var categoriasFake=[{"id": 00000000000000001, "nome": "Arroz", "creation": "09/08/2015 16:44:20"}, {"id": 00000000000000002, "nome": "Farinha", "creation": "09/08/2015 17:29:42"}, {"id": 00000000000000003, "nome": "Sal", "creation": "09/09/2015 09:12:05"}];
  listarCategorias(categoriasFake);

  function mostrarErros(erros) {
    var helpBlockPrefixo = '#help-block-';
    var formGroupPrefixo = '#form-group-';
    $.each(erros, function (propriedade, valorDaPropriedade) {
      $(helpBlockPrefixo + propriedade).text(valorDaPropriedade);
      $(formGroupPrefixo + propriedade).addClass('has-error');
    });
  }

  $('#form-categoria').submit(function (evento) {
    evento.preventDefault();
    limparErros();
    var nome = $nomeInput.val();
    var data = new Date();
    dataHora = (data.toLocaleString());
   
  
    $('#DataInicio').val();
    $('#DataInicio').val(dataHora);
    
    if (nome === '') {
      mostrarErros({'nome': 'Campo Obrigatório'})
    } else {
      adicionarCategoria({"id": quantidade,
        "nome": nome,
        "creation": dataHora});
      $nomeInput.val('');
    }

  });

});
