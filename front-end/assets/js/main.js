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
</div>
`);
});


function listarFunci()
{
	//da um GET no endpoint "usuarios"
	fetch(url + 'listarfuncionarios')
	.then(response => response.json())
	.then((funcionarios) =>
	{
		//pega div que vai conter a lista de usuarios
		let listaFuncionarios = document.getElementById('lista-funcionarios')
		

		//preenche div com usuarios recebidos do GET
		for(let funcionario of funcionarios)
		{
			//cria div para as informacoes de um usuario
			let divfuncionario = document.createElement('div')
		
			
			let divNome = document.createElement('input')
			divNome.placeholder = 'Nome Completo'
			divNome.value = funcionario.nome
			divfuncionario.appendChild(divNome)
			
	
			let divCpf = document.createElement('input')
			divCpf.placeholder = 'CPF'
			divCpf.value = funcionario.cpf
			divfuncionario.appendChild(divCpf)

      let divSexo = document.createElement('input')
			divSexo.placeholder = 'Sexo'
			divSexo.value = funcionario.sexo
			divfuncionario.appendChild(divSexo)
			
			//insere a div do usuario na div com a lista de usuarios
			listaFuncionarios.appendChild(divfuncionario)
		}
	})
}

$("#listarFuncionario").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
  <div class="buttonEnviar pt-3">
        <button type="button" class="btn btn-primary" onclick="listarFunci()">Listar Funcionários
        </button>
  </div>
     <div id="lista-funcionarios"></div>
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


  function listarSetores()
{
	//da um GET no endpoint "usuarios"
	fetch(url + 'listarsetores')
	.then(response => response.json())
	.then((setores) =>
	{
		//pega div que vai conter a lista de usuarios
		let listaSetores = document.getElementById('lista-setores')
		

		//preenche div com usuarios recebidos do GET
		for(let setor of setores)
		{
			//cria div para as informacoes de um usuario
			let divSetor = document.createElement('div')
		
			
			let divNome = document.createElement('input')
			divNome.placeholder = 'Nome Setor'
			divNome.value = setor.nome
			divSetor.appendChild(divNome)
			
	
			let divValorDia = document.createElement('input')
			divValorDia.placeholder = 'CPF'
			divCpdivValorDiaf.value = setor.cpf
			divSetor.appendChild(divValorDia)

			//insere a div do usuario na div com a lista de usuarios
			listaSetores.appendChild(divSetor)
		}
	})
}

$("#listarSetores").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
  <div class="buttonEnviar pt-3">
        <button type="button" class="btn btn-primary" onclick="listarSetores()">Listar Setores
        </button>
  </div>
     <div id="lista-setores"></div>
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

    console.log(folha)
    
  
 fetch(url + "cadastrarfolha",
  {
     'method': 'POST',
    'redirect': 'follow',
     'headers':
    {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
     'body': JSON.stringify(folha)
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
      optionSetor.value = setor.id
      optionSetor.innerHTML = setor.nome
      optionSetor.setAttribute('class', 'option-setor')
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
      optionFuncionario.value = funcionario.id
      optionFuncionario.innerHTML = funcionario.nome
      optionFuncionario.setAttribute('id', 'option-funcionario')
      divfuncionario.appendChild(optionFuncionario)
    }
  })
 }   
  

  
  
  