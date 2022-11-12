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


var url = "http://localhost:3000/"


function cadastrarFunci()
{
let funcionario =
	{
		'nome':  document.getElementById('nome-funcionario').value,
		'cpf':   document.getElementById('cpf-funcionario').value,
    'sexo':  document.getElementById('sexo-funcionario').value,
		
	};


fetch(url + "cadastrarfuncionario",
	{
		'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(funcionario)
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

}// fim cadastrar funcionario

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
        <button type="button" class="btn btn-primary" onclick="cadastrarFunci()" id="cadastrarFuncionario">Enviar
        </button>
      </div>
  </form>
</div>
`);
});

$("#listarFuncionario").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
    <h1>oiiiii</h1>
  </div>
  `);
  });


function cadastrarSetor()
{
let setor =
	{
		'nome':  document.getElementById('nome-setor').value,
		'valor':   document.getElementById('valor-dia').value,
	};


fetch(url + "cadastrarsetor",
	{
		'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(setor)
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

}// fim cadastrar setor
  

//Criando formulário de cadastro de setor
$("#cadastroSetor").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
  <h1>Cadastrar Setor</h1>
    <div class="form">
      <div class="row formularios align-items-center">
        <input id="nome-setor" type="text" placeholder="Insira o setor aqui">
        <input id="valor-dia" type="number" placeholder="Insira o valor que o setor paga por dia aqui">
      </div>
        <div class="buttonEnviar pt-3">
          <button type="button" class="btn btn-primary" onclick="cadastrarSetor()" id="cadastrarSetor">Cadastrar
          </button>
        </div>
    </form>
  </div>
  `);
  });


  
  
  function cadastrarFolha()
  {
  let folha =
    {
      'setor':         document.getElementById('option-setor').value,
      'funcionario':   document.getElementById('option-funcionario').value,
      'dias':          document.getElementById('dias-trabalhados').value,
    };

    console.log(setor)
    console.log(funcionario)
    console.log(dias)
  
  
  // fetch(url + "cadastrarfolha",
  //   {
  //     'method': 'POST',
  //     'redirect': 'follow',
  //     'headers':
  //     {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     'body': JSON.stringify(folha)
  //   })
  //   //checa se requisicao deu certo
  //   .then((response) =>
  //   {
  //     if(response.ok)
  //     {
  //       return response.text()
  //     }
  //     else
  //     {
  //       return response.text().then((text) =>
  //       {
  //         throw new Error(text)
  //       })
  //     }
  //   })
  //   //trata resposta
  //   .then((output) =>
  //   {
  //     console.log(output)
  //     alert('Cadastro efetuado! :D')
  //   })
  //   //trata erro
  //   .catch((error) =>
  //   {
  //     console.log(error)
  //     alert('Não foi possível efetuar o cadastro! :(')
  //   })
  
 }// fim cadastrar folha


//Criando formulário de cadastro folha
$("#cadastroFolha").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
  <h1>Cadastrar Folha de Pagamento</h1>
    <div class="form">
      <div class="row formularios align-items-center">
      
      
      <select id="select-setor">
      </select>

      
      <select id="select-funcionario">
      </select>

      <input id="dias-trabalhados" type="number">

      </div>
        <div class="buttonEnviar pt-3">
          <button type="button" class="btn btn-primary" onclick="cadastrarFolha()">Cadastrar
          </button>
        </div>
    </div>
  </div>
  `);

  selectSetor()
  selectFuncionario()

  });

 function selectSetor()
 {
  
  fetch(url + "listarsetores").then(x=>x.json()).then(setores=> {
    let divsetor = document.getElementById("select-setor")
    for(let setor of setores){
      let optionSetor = document.createElement('option')
      optionSetor.setAttribute('id', 'option-setor')
      optionSetor.value = setor.id
      optionSetor.innerHTML = setor.nome
      divsetor.appendChild(optionSetor)
    }
  })
 }   

 function selectFuncionario()
 {
  
  fetch(url + "listarfuncionarios").then(x=>x.json()).then(funcionarios=> {
    let divfuncionario = document.getElementById("select-funcionario")
    for(let funcionario of funcionarios){
      let optionFuncionario = document.createElement('option')
      optionFuncionario.setAttribute('id', 'option-funcionario')
      optionFuncionario.value = funcionario.id
      optionFuncionario.innerHTML = funcionario.nome
      divfuncionario.appendChild(optionFuncionario)
    }
  })
 }   
  

  
  
  