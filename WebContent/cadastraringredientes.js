$(document)
		.ready(
				function() {
					var $formWell = $('#form-well');
					var $formGroups = $('div.form-group');
					var $helpBlocks = $('span.help-block');
					var $nomeInput = $('#nome-input');
					var $tabelaIngredientes = $('#tabela-ingrediente')
					var $listarAjaxLoader = $('#listar-ajax-loader')

					$formWell.hide();
					$('#botao-novo-ingrediente').click(function() {
						$formWell.slideToggle();
					});

					function limparErros() {
						$formGroups.removeClass('has-error');
						$helpBlocks.text('');
					}

					$.get('rest', function(ingredientes) {
						console.log(ingredientes);
					}, 'json');

					function adicionarIngrediente(ingrediente) {
						var linha = '<tr>';
						linha += '<td>' + ingrediente.id + '</td>';
						linha += '<td>' + ingrediente.creation + '</td>';
						linha += '<td>' + ingrediente.nome + '</td>';
						linha += '<td>';
						linha += '<button class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash"></i></button>';
						linha += '<img src="images/ajax-loader.gif" hidden="hidden">'
						linha += '</td ></tr>';

						var $linhaObjeto = $(linha);
						var $botao = $linhaObjeto.find('button.btn');
						var $ajaxLoader = $linhaObjeto.find('img');
						$botao.click(function() {
							$botao.hide();
							$ajaxLoader.fadeIn();
							$.post('delete', {
								'id' : ingrediente.id
							}).success(function() {
								$linhaObjeto.remove();
							}).error(function(erros) {
								alert('Não é possível apagar no momento')
								$ajaxLoader.hide();
								$botao.fadeIn();
							});
						});

						$tabelaIngredientes.append($linhaObjeto);
					}

					function listarIngredientes(ingredientes) {
						$.each(ingredientes, function(i, ingrediente) {
							adicionarIngrediente(ingrediente);
						})
					}

					$listarAjaxLoader.show()
					$.get('rest').success(listarIngredientes).error(function() {
						alert('Não Foi Possivel Listar os Ingredientes');
					}).always(function() {
						$listarAjaxLoader.fadeOut();
					});

					function mostrarErros(erros) {
						var helpBlockPrefixo = '#help-block-';
						var formGroupPrefixo = '#form-group-';
						$.each(erros,
								function(propriedade, valorDaPropriedade) {
									$(helpBlockPrefixo + propriedade).text(
											valorDaPropriedade);
									$(formGroupPrefixo + propriedade).addClass(
											'has-error');
								});
					}

					$('#form-ingrediente').submit(function(evento) {
						evento.preventDefault();
						limparErros();
						var nome = $nomeInput.val();
						$.post('new', {
							'nome' : nome
						}).success(function(ingrediente) {
							adicionarIngrediente(ingrediente);
							$nomeInput.val('');
						}).error(function(erros) {
							mostrarErros(erros.responseJSON);
						});
					});
				});