$(document).ready(function () {
  var $formWell = $('#form-well');
  var $formGroups = $('div.form-group');
  var $helpBlocks = $('span.help-block');
  var $nomeInput = $('#nome-input');
  var $tabelaIgredientes = $('#tabela-igrediente')
  quantidade = 1;
	  
  $formWell.hide();
  $('#botao-novo-igrediente').click(function () {
    $formWell.slideToggle();
  });

  function limparErros() {
    $formGroups.removeClass('has-error');
    $helpBlocks.text('');
  }

  $.get('http://localhost:8080/igredientes/rest',function(igredientes){
    console.log(igredientes);
  },'json');

  function adicionarIgrediente(igrediente) {
    var linha = '<tr>';
    linha += '<td>' + igrediente.id + '</td>';
    linha += '<td>' + igrediente.creation + '</td>';
    linha += '<td>' + igrediente.nome + '</td>';
    linha += '<td>';
    linha += '<button class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash"></i></button>';
    linha += '</td ></tr>';

    var $linhaObjeto = $(linha);
    var $botao = $linhaObjeto.find('button.btn').click(function () {
      console.log(igrediente.id);
      $linhaObjeto.remove();
    });
    
    $tabelaIgredientes.append($linhaObjeto);
    quantidade = quantidade + 1;
  }

  function listarIgredientes(igredientes){
    $.each(igredientes, function(i, igrediente){
      adicionarIgrediente(igrediente);
    })
  }

  var igredientesFake=[{"id": 00000000000000001, "nome": "Arroz", "creation": "09/08/2015 16:44:20"}, {"id": 00000000000000002, "nome": "Farinha", "creation": "09/08/2015 17:29:42"}, {"id": 00000000000000003, "nome": "Sal", "creation": "09/09/2015 09:12:05"}];
  listarIgredientes(igredientesFake);

  function mostrarErros(erros) {
    var helpBlockPrefixo = '#help-block-';
    var formGroupPrefixo = '#form-group-';
    $.each(erros, function (propriedade, valorDaPropriedade) {
      $(helpBlockPrefixo + propriedade).text(valorDaPropriedade);
      $(formGroupPrefixo + propriedade).addClass('has-error');
    });
  }

  $('#form-igrediente').submit(function (evento) {
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
      adicionarIgrediente({"id": quantidade,
        "nome": nome,
        "creation": dataHora});
      $nomeInput.val('');
    }

  });

});
