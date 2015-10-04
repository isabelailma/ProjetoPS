$(document).ready(function () {
  var $formWell = $('#form-well');
  var $formGroups = $('div.form-group');
  var $helpBlocks = $('span.help-block');
  var $nomeInput = $('#nome-input');
  var $tabelaIngredientes = $('#tabela-ingrediente')
  quantidade = 1;
	  
  $formWell.hide();
  $('#botao-novo-ingrediente').click(function () {
    $formWell.slideToggle();
  });

  function limparErros() {
    $formGroups.removeClass('has-error');
    $helpBlocks.text('');
  }

  $.get('http://localhost:8080/cadastraringredientes/rest',function(ingredientes){
    console.log(ingredientes);
  },'json');

  function adicionarIngrediente(ingrediente) {
    var linha = '<tr>';
    linha += '<td>' + ingrediente.id + '</td>';
    linha += '<td>' + ingrediente.creation + '</td>';
    linha += '<td>' + ingrediente.nome + '</td>';
    linha += '<td>';
    linha += '<button class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash"></i></button>';
    linha += '</td ></tr>';

    var $linhaObjeto = $(linha);
    var $botao = $linhaObjeto.find('button.btn').click(function () {
      console.log(ingrediente.id);
      $linhaObjeto.remove();
    });
    
    $tabelaIngredientes.append($linhaObjeto);
    quantidade = quantidade + 1;
  }

  function listarIngredientes(ingredientes){
    $.each(ingredientes, function(i, ingrediente){
      adicionarIngrediente(ingrediente);
    })
  }

  var ingredientesFake=[{"id": 00000000000000001, "nome": "Arroz", "creation": "09/08/2015 16:44:20"}, {"id": 00000000000000002, "nome": "Farinha", "creation": "09/08/2015 17:29:42"}, {"id": 00000000000000003, "nome": "Sal", "creation": "09/09/2015 09:12:05"}];
  listarIngredientes(ingredientesFake);

  function mostrarErros(erros) {
    var helpBlockPrefixo = '#help-block-';
    var formGroupPrefixo = '#form-group-';
    $.each(erros, function (propriedade, valorDaPropriedade) {
      $(helpBlockPrefixo + propriedade).text(valorDaPropriedade);
      $(formGroupPrefixo + propriedade).addClass('has-error');
    });
  }

  $('#form-ingrediente').submit(function (evento) {
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
      adicionarIngrediente({"id": quantidade,
        "nome": nome,
        "creation": dataHora});
      $nomeInput.val('');
    }

  });

});
