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

var url = "http://localhost:3000/";

// CRUD / CONEXÃO FUNCIONÁRIO
function cadastrarFunci() {
  
  let funcionario = {
    nome: document.getElementById("nome-funcionario").value,
    cpf: document.getElementById("cpf-funcionario").value,
    sexo: document.getElementById("sexo-funcionario").value,
  };

  fetch(url + "cadastrarfuncionario", {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(funcionario),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    })

    .then((output) => {
      console.log(output);
      alert("O funcionário foi cadastrado com sucesso!");
    })

    .catch((error) => {
      console.log(error);
      alert("Não foi possível efetuar o cadastro!");
    });
} // fim cadastrar funcionario

//Criando formulário de cadastro funcionario
//Selecionando o elemento com a id cadastroFuncionario dentro da index.html
$("#cadastroFuncionario").click(function () {
  $(document).ready(function () {
    $("#cpf-funcionario").mask("999.999.999-99");
  });
  //Selecionando a div com classe view-content dentro do index.html
  //Povoando a div com .html(Função HTML para inserir HTML com JQUERY)
  $(".view-content").html(`<div class="view-content-teste">
  <div class="form-container">
  <h2>Cadastrar funcionário</h2>
    <p>Preencha todos os campos abaixo com os dados do funcionario para realizar o cadastro
      <div class="form">
        <div class="row formularios align-items-center gap-3">
        
          <input id="nome-funcionario" type="text" placeholder="Insira o nome aqui" required/>
          <input id="cpf-funcionario" type="text" placeholder="Insira o cpf aqui" required>
          <select id="sexo-funcionario" name="selectSexo" required>
            <option value="" selected>Selecione um gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </div>
          <div class="buttonEnviar pt-3">
            <button type="button" class="btn btn-primary" onclick="cadastrarFunci()" id="cadastrarFuncionario">Enviar
            </button>
          </div>
    </div>
</div>
`);
});

function validaNome(id)
{
	let divNome = document.getElementById(id)
	if(divNome.value.trim().split(' ').length >= 2)
	{
		//divNome.style.border = 0
		divNome.classList.remove('erro-input')
		return true
	}
	else
	{
		//divNome.style.border = 'solid 1px red'
		if(!divNome.classList.contains('erro-input'))
		{
			divNome.classList.add('erro-input')
		}
		return false
	}
}

function listarFunci() {
  fetch(url + "listarfuncionarios")
    .then((response) => response.json())
    .then((funcionarios) => {
      let listaFuncionarios = document.getElementById("lista-funcionarios");

      for (let funcionario of funcionarios) {
        let divfuncionario = document.createElement("div");

        let divNome = document.createElement("input");
        divNome.placeholder = "Nome Completo";
        divNome.value = funcionario.nome;
        divfuncionario.appendChild(divNome);

        let divCpf = document.createElement("input");
        divCpf.placeholder = "CPF";
        divCpf.value = funcionario.cpf;
        divfuncionario.appendChild(divCpf);

        let divSexo = document.createElement("input");
        divSexo.placeholder = "Sexo";
        divSexo.value = funcionario.sexo;
        divfuncionario.appendChild(divSexo);

        let btnRemover = document.createElement("button");
        btnRemover.innerHTML = "Remover";
        btnRemover.onclick = (u) => remover(funcionario.id);

        let btnAtualizar = document.createElement("button");
        btnAtualizar.innerHTML = "Atualizar";
        btnAtualizar.onclick = (u) =>
          atualizar(funcionario.id, divNome, divCpf, divSexo);

        let divBotoes = document.createElement("div");
        divBotoes.style.display = "flex";
        divBotoes.appendChild(btnRemover);
        divBotoes.appendChild(btnAtualizar);
        divfuncionario.appendChild(divBotoes);

        listaFuncionarios.appendChild(divfuncionario);
      }
    });
}

function atualizar(id, divNome, divCpf, divSexo) {
  let body = {
    nome: divNome.value,
    cpf: divCpf.value,
    sexo: divSexo.value,
  };

  fetch(url + "atualizarfuncionario/" + id, {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    .then((output) => {
      listarFunci();
      console.log(output);
      alert("Funcionário atualizado com sucesso!");
    })
    .catch((error) => {
      console.log(error);
      alert("Não foi possível atualizar o funcionário :/");
    });
}

function remover(id) {
  fetch(url + "deletarfuncionario/" + id, {
    method: "POST",
    redirect: "follow",
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    .then((output) => {
      listarFunci();
      console.log(output);
      alert("Funcionário removido!");
    })
    .catch((error) => {
      console.log(error);
      alert("Não foi possível remover o funcionário!");
    });
}

$("#listarFuncionario").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
  <h1>Painel do funcionario</h1>
  <div id="lista-funcionarios"></div>
  <div class="buttonEnviar pt-3">
        <button type="button" class="btn btn-primary" onclick="listarFunci()">Listar Funcionários
        </button>
  </div>
  </div>
  `);
});

// CRUD SETOR / CONEXÃO

function cadastrarSetor() {
  let setor = {
    nome: document.getElementById("nome-setor").value,
    valorDiaTrabalho: document.getElementById("valor-dia").value,
  };

  fetch(url + "cadastrarsetor", {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(setor),
  })
    //checa se requisicao deu certo
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    //trata resposta
    .then((output) => {
      console.log(output);
      alert("Setor cadastrado com sucesso!");
    })
    //trata erro
    .catch((error) => {
      console.log(error);
      alert("Não foi possível efetuar o cadastro!");
    });
} // fim cadastrar setor

//Criando formulário de cadastro de setor
$("#cadastroSetor").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
  <div class="form-container-setor">
    <h1>Cadastrar Setor</h1>
      <div class="form">
        <div class="row formularios align-items-center gap-3">
          <input id="nome-setor" type="text" placeholder="Insira o setor aqui">
          <input id="valor-dia" type="number" placeholder="Insira o valor que o setor paga por dia aqui">
        </div>
          <div class="buttonEnviar pt-3">
            <button type="button" class="btn btn-primary" onclick="cadastrarSetor()" id="cadastrarSetor">Cadastrar
            </button>
          </div>
      </form>
    </div>
  </div>
  `);
});

function listarSetores() {
  fetch(url + "listarsetores")
    .then((response) => response.json())
    .then((setores) => {
      //pega div que vai conter a lista de usuarios
      let listaSetores = document.getElementById("listar-setores");

      //preenche div com usuarios recebidos do GET
      for (let setor of setores) {
        //cria div para as informacoes de um usuario
        let divSetor = document.createElement("div");

        let divNomeSetor = document.createElement("input");
        divNomeSetor.placeholder = "Nome Setor";
        divNomeSetor.value = setor.nome;
        divSetor.appendChild(divNomeSetor);

        let divValorDia = document.createElement("input");
        divValorDia.placeholder = "Valor";
        divValorDia.value = setor.valorDiaTrabalho;
        divSetor.appendChild(divValorDia);

        let btnRemover = document.createElement("button");
        btnRemover.innerHTML = "Remover";
        btnRemover.onclick = (u) => removerSetor(setor.id);

        let btnAtualizar = document.createElement("button");
        btnAtualizar.innerHTML = "Atualizar";
        btnAtualizar.onclick = (u) =>
          atualizarSetor(setor.id, divNomeSetor, divValorDia);

        let divBotoes = document.createElement("div");
        divBotoes.appendChild(btnRemover);
        divBotoes.appendChild(btnAtualizar);
        divSetor.appendChild(divBotoes);

        listaSetores.appendChild(divSetor);
      }
    });
}

function atualizarSetor(id, divNomeSetor, divValorDia) {
  let setor = {
    nome: divNomeSetor.value,
    valorDiaTrabalho: divValorDia.value,
  };

  fetch(url + "atualizarsetor/" + id, {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(setor),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    .then((output) => {
      listarSetores();
      console.log(output);
      alert("Setor atualizado!");
    })
    .catch((error) => {
      console.log(error);
      alert("Não foi possível atualizar o setor!");
    });
}

function removerSetor(id) {
  fetch(url + "deletarsetor/" + id, {
    method: "POST",
    redirect: "follow",
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    .then((output) => {
      listarSetores();
      console.log(output);
      alert("Setor removido!");
    })
    .catch((error) => {
      console.log(error);
      alert("Não foi possível remover o setor");
    });
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
function cadastrarFolha() {
  let selectsetor = document.getElementById("select-setor");
  let selecfunci = document.getElementById("select-funcionario");

  let folha = {
    id: document.getElementById("id-folha-random").value,
    idSetor: selectsetor.options[selectsetor.selectedIndex].value,
    idFuncionario: selecfunci.options[selecfunci.selectedIndex].value,
    diasTrabalhados: document.getElementById("dias-trabalhados").value,
  };

  fetch(url + "cadastrarfolha", {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(folha),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    })

    .then((output) => {
      console.log(output);
      alert("Cadastro efetuado!");
    })

    .catch((error) => {
      console.log(error);
      alert("Não foi possível efetuar o cadastro!");
    });
} // fim cadastrar folha

//Criando formulário de cadastro folha
$("#cadastroFolha").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
  <h1>Cadastrar Folha de Pagamento</h1>
    <div class="form">
      <div class="row formularios align-items-center gap-3">
      
      
      <button onclick="gerar()">Gerar</button>
      <div id="resp">
      </div>

      <div>
      <select id="select-setor">
      </select>
      </div>
      

      <div>
      <select id="select-funcionario">
      </select>
      </div>

      <div>
      <input id="dias-trabalhados" type="number">
      </div>

      </div>
        <div class="buttonEnviar pt-3">
          <button type="button" class="btn btn-primary" onclick="cadastrarFolha()">Cadastrar
          </button>
        </div>
        
        <div id="folha-descricao">

        </div>

    </div>
  </div>
  `);

  selectSetor();
  selectFuncionario();
});

function gerar() {
  var resp = document.getElementById("resp");
  let teste = document.createElement("input");
  teste.setAttribute("id", "id-folha-random");
  teste.value = Math.floor(8568 * Math.random() + 1);
  resp.appendChild(teste);
}

function selectSetor() {
  fetch(url + "listarsetores")
    .then((x) => x.json())
    .then((setores) => {
      let divsetor = document.getElementById("select-setor");
      for (let setor of setores) {
        let optionSetor = document.createElement("option");
        optionSetor.value = setor.id;
        optionSetor.innerHTML = setor.nome;
        divsetor.appendChild(optionSetor);
      }
    });
}

function selectFuncionario() {
  fetch(url + "listarfuncionarios")
    .then((x) => x.json())
    .then((funcionarios) => {
      let divfuncionario = document.getElementById("select-funcionario");
      for (let funcionario of funcionarios) {
        let optionFuncionario = document.createElement("option");
        optionFuncionario.value = funcionario.id;
        optionFuncionario.innerHTML = funcionario.nome;
        divfuncionario.appendChild(optionFuncionario);
      }
    });
}

function listarFolhas() {
  fetch(url + "listarfolha")
    .then((response) => response.json())
    .then((folhas) => {

      let listaFolhas = document.getElementById("listar-folhas");

      for (let folha of folhas) {
        let divFolha = document.createElement("div");

        let idFolha = document.createElement("input");
        idFolha.placeholder = "Dias trabalhados no mês";
        idFolha.value = folha.id;
        divFolha.appendChild(idFolha);

        let divDiastrabalhados = document.createElement("input");
        divDiastrabalhados.placeholder = "Dias trabalhados no mês";
        divDiastrabalhados.value = folha.diasTrabalhados;
        divFolha.appendChild(divDiastrabalhados);

        let divSalario = document.createElement("input");
        divSalario.placeholder = "";
        divSalario.value = folha.salario;
        divFolha.appendChild(divSalario);

        let btnRemover = document.createElement("button");
        btnRemover.innerHTML = "Remover";
        btnRemover.onclick = (u) => removerFolha(folha.id);

        let divBotoes = document.createElement("div");
        divBotoes.appendChild(btnRemover);
        divFolha.appendChild(divBotoes);

        listaFolhas.appendChild(divFolha);
      }
    });
}

function removerFolha(id) {
  fetch(url + "deletarfolha/" + id, {
    method: "POST",
    redirect: "follow",
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    .then((output) => {
      listarFolhas();
      console.log(output);
      alert("Setor removido!");
    })
    .catch((error) => {
      console.log(error);
      alert("Não foi possível remover o setor");
    });
}

$("#listarFolhas").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
  <div class="buttonEnviar pt-3">
        <button type="button" class="btn btn-primary" onclick="listarFolhas()">Listar Folhas
        </button>
  </div>
     <div id="listar-folhas"></div>
  </div>
  `);
});

$("#listarFolhaId").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
  <div>
  <input id="id-folha"> </input>
  </div>
  <div class="buttonEnviar pt-3">
        <button type="button" class="btn btn-primary" onclick="listarFolhaId()">Listar Folha
        </button>
  </div>
     <div id="listar-folha-id"></div>
  </div>
  `);
});



function listarFolhaId() {
var idFolha = document.getElementById("id-folha").value
console.log(idFolha) //aqui está o id que que vai retornar o item que eu quero

fetch(url + "listarfolhaid/" + idFolha)

 .then((x) => x.json())
 .then((folha) => {

  console.log(folha)

  // let listarFolha = document.getElementById("listar-folha-id");
  // let divFolhaId = document.createElement("div");

  // let idFolha = document.createElement("input");
  // idFolha.value = folha.id;
  // divFolhaId.appendChild(idFolha);

  // let divDiastrabalhados = document.createElement("input");
  // divDiastrabalhados.value = folha.diasTrabalhados;
  // divFolhaId.appendChild(divDiastrabalhados);

  // let divSalario = document.createElement("input");
  // divSalario.value = folha.salario;
  // divFolhaId.appendChild(divSalario);

  // let btnRemover = document.createElement("button");
  // btnRemover.innerHTML = "Remover";
  // btnRemover.onclick = (u) => removerFolha(folha.id);

  // let divBotoes = document.createElement("div");
  // divBotoes.appendChild(btnRemover);
  // divFolhaId.appendChild(divBotoes);

  // listarFolha.appendChild(divFolhaId);
  
 });

}
