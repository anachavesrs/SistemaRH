/* global bootstrap: false */
(() => {
  "use strict";
  const tooltipTriggerList = Array.from(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
})();


fetch(url + "cadastrarsetor",
	{
		'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	//checa se requisicao deu certo
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	//trata resposta
	.then((output) =>
	{
		console.log(output)
		alert('Cadastro efetuado! :D')
	})
	//trata erro
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível efetuar o cadastro! :(')
	})








//Criando formulário de cadastro funcionario
//Selecionando o elemento com a id cadastroFuncionario dentro da index.html
$("#cadastroFuncionario").click(function () {
//Selecionando a div com classe view-content dentro do index.html
//Povoando a div com .html(Função HTML para inserir HTML com JQUERY)
  $(".view-content").html(`<div class="view-content-teste">
<h1>Cadastrar Funcionario</h1>
  <div class="form">
    <div class="row formularios align-items-center">
      <input id="nome-funcionario" type="text" placeholder="Insira o nome aqui" required>
      <input id="cpf-funcionario" type="number" placeholder="Insira o cpf aqui" required>
      <select id="sexo-funcionario" name="selectSexo">
        <option value="" selected>Selecione um gênero</option>
        <option value="m">Masculino</option>
        <option value="f">Feminino</option>
      </select>
    </div>
      <div class="buttonEnviar pt-3">
        <button type="button" class="btn btn-primary" onclick="cadastrarFunci" id="cadastrarFuncionario">Enviar
        </button>
      </div>
  </form>
</div>
`);
});

//Criando formulário de cadastro de setor
$("#cadastroSetor").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
  <h1>Cadastrar Setor</h1>
    <div class="form">
      <div class="row formularios align-items-center">
        <input id="nome-setor" type="text" placeholder="Insira o setor aqui" required>
        <input id="valor-dia" type="number" placeholder="Insira o valor que o setor paga por dia aqui" required>
      </div>
        <div class="buttonEnviar pt-3">
          <button type="button" class="btn btn-primary" onclick="cadastrarSetor" id="cadastrarSetor">Enviar
          </button>
        </div>
    </form>
  </div>
  `);
  });
  

//Criando formulário de cadastro folha
$("#cadastroFolha").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
  <h1>Cadastrar Folha de Pagamento</h1>
    <div class="form">
      <div class="row formularios align-items-center">
      <select id="select-lista">
      
      </select>

        <input id="nome-setor" type="text" placeholder="Insira o nome do setor" required>
        <input id="valor-dia" type="number" placeholder="Insira o valor que o setor paga por dia aqui" required>
      </div>
        <div class="buttonEnviar pt-3">
          <button type="button" class="btn btn-primary" id="cadastrarSetor">Enviar
          </button>
        </div>
    </form>
  </div>
  `);
  });

  //Função para exibir mensagem ao clicar no botão de enviar
  $('#submitForm').click(function(){
    alert('Enviado com sucesso!')

  })
  
