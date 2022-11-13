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

// CRUD / CONEXÃO FUNCIONÁRIO
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

	.then((output) =>
	{
		console.log(output)
		alert('O funcionário foi cadastrado com sucesso!')
	})
	
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível efetuar o cadastro!')
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
      <input id="cpf-funcionario" type="text" placeholder="Insira o cpf aqui" required>
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
	
	fetch(url + 'listarfuncionarios')
	.then(response => response.json())
	.then((funcionarios) =>
	{
		
		let listaFuncionarios = document.getElementById('lista-funcionarios')
		

		
		for(let funcionario of funcionarios)
		{
		
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


      
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => remover(funcionario.id)
		
			
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(funcionario.id, divNome, divCpf, divSexo)
		
			
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divfuncionario.appendChild(divBotoes)
			
			
			listaFuncionarios.appendChild(divfuncionario)
		}
	})
}

function atualizar(id, divNome, divCpf, divSexo)
{
	let body =
	{
		'nome': divNome.value,
		'cpf': divCpf.value,
		'sexo': divSexo.value
	}
	
	fetch(url + "atualizarfuncionario/" + id,
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
	.then((output) =>
	{
		listarFunci()
		console.log(output)
		alert('Funcionário atualizado com sucesso!')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar o funcionário :/')
	})
}

function remover(id)
{
	fetch(url + 'deletarfuncionario/' + id,
	{
		'method': 'POST',
		'redirect': 'follow'
	})
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
	.then((output) =>
	{
		listarFunci()
		console.log(output)
		alert('Funcionário removido!')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover o funcionário!')
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



  // CRUD SETOR / CONEXÃO

function cadastrarSetor()
{
let setor =
	{
		'nome':  document.getElementById('nome-setor').value,
		'valorDiaTrabalho':   document.getElementById('valor-dia').value,
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
		alert('Setor cadastrado com sucesso!')
	})
	//trata erro
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível efetuar o cadastro!')
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
	
	fetch(url + 'listarsetores')
	.then(response => response.json())
	.then((setores) =>
	{
		//pega div que vai conter a lista de usuarios
		let listaSetores = document.getElementById('listar-setores')
		

		//preenche div com usuarios recebidos do GET
		for(let setor of setores)
		{
			//cria div para as informacoes de um usuario
			let divSetor = document.createElement('div')
		
			
			let divNomeSetor = document.createElement('input')
			divNomeSetor.placeholder = 'Nome Setor'
			divNomeSetor.value = setor.nome
			divSetor.appendChild(divNomeSetor)
			
			let divValorDia = document.createElement('input')
			divValorDia.placeholder = 'Valor'
			divValorDia.value = setor.valorDiaTrabalho
			divSetor.appendChild(divValorDia)

      let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => removerSetor(setor.id)
		
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizarSetor(setor.id, divNomeSetor, divValorDia)
		
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divSetor.appendChild(divBotoes)

			listaSetores.appendChild(divSetor)
		}
	})
}

function atualizarSetor(id, divNomeSetor, divValorDia)
{
	let setor =
	{
		'nome': divNomeSetor.value,
		'valorDiaTrabalho': divValorDia.value,
		
	}
	
	fetch(url + "atualizarsetor/" + id,
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
	.then((output) =>
	{
		listarSetores()
		console.log(output)
		alert('Setor atualizado!')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar o setor!')
	})
}

function removerSetor(id)
{
	fetch(url + 'deletarsetor/' + id,
	{
		'method': 'POST',
		'redirect': 'follow'
	})
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
	.then((output) =>
	{
		listarSetores()
		console.log(output)
		alert('Setor removido!')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover o setor')
	})
}



$("#listarSetores").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
  <div class="buttonEnviar pt-3">
        <button type="button" class="btn btn-primary" onclick="listarSetores()">Listar Setores
        </button>
  </div>
     <div id="listar-setores"></div>
  </div>
  `);
  });
  



  // CRUD ENTIDA RELACIONAMENTO --- FOLHA / CONEXÃO
  function cadastrarFolha()
  {

    let selectsetor = document.getElementById('select-setor')
    let selecfunci = document.getElementById('select-funcionario')

  let folha =
    {
      'idSetor':          selectsetor.options[selectsetor.selectedIndex].value,
      'idFuncionario':    selecfunci.options[selecfunci.selectedIndex].value,
      'diasTrabalhados':  document.getElementById('dias-trabalhados').value,
      
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

   .then((output) =>
   {
    console.log(output)
     alert('Cadastro efetuado!')
  })
  
   .catch((error) =>
   {
     console.log(error)
     alert('Não foi possível efetuar o cadastro!')
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
      divfuncionario.appendChild(optionFuncionario)
    }
  })
 }  
 
 
//  function listarFolhas()
//  {
   
//    fetch(url + 'listarfolha')
//    .then(response => response.json())
//    .then((folhas) =>
//    {
//      let listaFolhas = document.getElementById('listar-folhas')
     
//      for(let folha of folhas)
//      {
      
//        let divFolha = document.createElement('div')

//        let divIdSetor = document.createElement('input')
//        divIdSetor.value = folha.idSetor
//        divIdSetor.innerHTML = setor.nome
//        divSetor.appendChild(divNomeSetor)
       
       
 
//        listaFolhas.appendChild(divFolha)
//      }
//    })
//  }

 $("#listarFolhas").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
  <div class="buttonEnviar pt-3">
        <button type="button" class="btn btn-primary" onclick="listarFolha()">Listar Setores
        </button>
  </div>
     <div id="listar-folhas"></div>
  </div>
  `);
  });


  
  
  