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

var viewContentTeste = $(".view-content-teste");

var url = "http://localhost:3000/";


// CRUD / CONEXÃO FUNCIONÁRIO


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
        
          <input id="nome-funcionario" onblur="validaNoome()" type="text" placeholder="Insira o nome aqui"/>
          <input id="cpf-funcionario" onblur="validaCpf()" type="text" placeholder="Insira o cpf aqui" required>
          <select id="sexo-funcionario" name="selectSexo" required>
            <option value="" selected>Selecione um gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </div>
          <div class="buttonEnviar pt-3">
            <button type="button" class="btn btn-primary" onclick="cadastrarFunci()" >Enviar
            </button>
            <div id="valida">
            </div>
          </div>
    </div>
</div>
`);
});

// Cadastrando funcionário no sistema
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



// Funções de validação dos inputs de cadastro de func

function validaNoome() {
  let nomeFunc = document.getElementById("nome-funcionario").value;
  if (nomeFunc == "") {
  let divErro = document.getElementById("valida")
  let pErro = document.createElement("p")
  pErro.innerHTML = "O campo nome não pode estar vazio"
  pErro.className = "erro-input";
  divErro.appendChild(pErro)
  }
 }

 function validaCpf() {
  let cpfFunc = document.getElementById("cpf-funcionario").value;
  if (cpfFunc == "") {
    let divErro = document.getElementById("valida")
    let pErro = document.createElement("p")
    pErro.innerHTML = "O campo cpf não pode estar vazio"
    divErro.appendChild(pErro)
    pErro.className = "erro-input";
  }
}


 // Listar funcionário no sistema
 $("#listarFuncionario").click(function () {
  $(".view-content").html(`<div class="view-content-teste listar-funcionarios">
  <h1>Painel do funcionario</h1>
  <p> Clique no botão abaixo para listar todos os funcionários cadastrados no sistema <p>
  <div class="buttonEnviar listar-funcionarios-button pt-2 pb-4">
        <button type="button" class="btn btn-primary" onclick="listarFunci()">Listar Funcionários
        </button>
  </div>
  <div id="lista-funcionarios"></div>
  
  </div>
  `);
});

// função que lista
function listarFunci() {
  fetch(url + "listarfuncionarios")
    .then((response) => response.json())
    .then((funcionarios) => {
      let listaFuncionarios = document.getElementById("lista-funcionarios");

      for (let funcionario of funcionarios) {
        let divfuncionario = document.createElement("div");
        divfuncionario.className = "inputDados";

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
        btnAtualizar.className = "att";
        btnAtualizar.innerHTML = "Atualizar";
        btnAtualizar.onclick = (u) =>
          atualizar(funcionario.id, divNome, divCpf, divSexo);

        let divBotoes = document.createElement("div");
        divBotoes.style.display = "flex";
        divBotoes.className = "butttons";
        divBotoes.appendChild(btnRemover);
        divBotoes.appendChild(btnAtualizar);
        divfuncionario.appendChild(divBotoes);

        listaFuncionarios.appendChild(divfuncionario);
      }
    });
}

// função que atualiza
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

// função que remove
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
    <p>Preencha todos os campos para prosseguir com o cadastro.
      <div class="form-setor">
        <div class="row formularios align-items-center gap-3">
          <input id="nome-setor" type="text" placeholder="Insira o setor aqui" onblur="validaNomeSetor()">
          <input id="valor-dia" type="number" placeholder="Insira o valor que o setor paga por dia aqui" onblur="validaValorSetor()" >
        </div>
          <div class="buttonEnviar pt-3" id="btn-display-setor">
            <button type="button" class="btn btn-primary" onclick="cadastrarSetor()" id="cadastrarSetor">Cadastrar
            </button>
          </div>
          <div id="valida-setor"></div>
    </div>
  </div>
  `);
});


// Funções de validação dos inputs de cadastro de setor
function validaNomeSetor() {
  let nomeSetor = document.getElementById("nome-setor").value;
  if (nomeSetor == "") {
  let divErro = document.getElementById("valida-setor")
  let pErro = document.createElement("p")
  pErro.innerHTML = "O campo nome setor não pode estar vazio!"
  divErro.appendChild(pErro)
  pErro.className = "erro-input"
 
  }
 }

 function validaValorSetor() {
  let valorSetor = document.getElementById("valor-dia").value;
  if (valorSetor == "") {
    let divErro = document.getElementById("valida-setor")
    let pErro = document.createElement("p")
    pErro.innerHTML = "O campo valor que o setor paga por dia não pode estar vazio!"
    divErro.appendChild(pErro)
    pErro.className = "erro-input"
  }
}

// função que lista os setores do sistema
function listarSetores() {
  // let divDisplay = document.getElementById("btn-display-setor")

  // divDisplay.classList.add("classeTeste")

  fetch(url + "listarsetores")
    .then((response) => response.json())
    .then((setores) => {
      //pega div que vai conter a lista de usuarios
      let listaSetores = document.getElementById("listar-setores");

      //preenche div com usuarios recebidos do GET
      for (let setor of setores) {
        //cria div para as informacoes de um usuario
        let divSetor = document.createElement("div");

        let divSetorNome = document.createElement("div");
        divSetorNome.className = "setorNome";

        let divSetorValor = document.createElement("div");
        divSetorValor.className = "setorValor";

        let divLabelValor = document.createElement("div");
        divLabelValor.className = "labelValor";

        let labelNomeSetor = document.createElement("label");
        labelNomeSetor.innerHTML = "Nome do Setor";
        divSetor.appendChild(labelNomeSetor);

        let labelValorSetor = document.createElement("label");
        labelValorSetor.innerHTML = "Valor pago por dia";
        divLabelValor.appendChild(labelValorSetor);
        let divNomeSetor = document.createElement("input");
        divNomeSetor.placeholder = "Nome Setor";
        divNomeSetor.value = setor.nome;
        divSetorNome.appendChild(divNomeSetor);
        divSetor.appendChild(divSetorNome);

        let divValorDia = document.createElement("input");
        divValorDia.placeholder = "Valor";
        divValorDia.value = "$" + setor.valorDiaTrabalho;
        divSetorValor.appendChild(divValorDia);
        divLabelValor.appendChild(divSetorValor);
        divSetor.appendChild(divLabelValor);

        let btnRemover = document.createElement("button");
        btnRemover.innerHTML = "Remover";
        btnRemover.className = "remove";
        btnRemover.onclick = (u) => removerSetor(setor.id);

        let btnAtualizar = document.createElement("button");
        btnAtualizar.innerHTML = "Atualizar";
        btnAtualizar.className = "att";
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
  $(".view-content").html(`<div class="view-content-teste listar-funcionarios">
  <h1>Listar setores</h1>
  <p>Clique no botão abaixo para listar todos os setores cadastrados em nosso sistema</p>
  <div class="buttonEnviar">
        <button type="button" class="btn btn-primary" onclick="listarSetores()">Listar Setores
        </button>
  </div>
     <div id="listar-setores"></div>
  </div>
  `);
});



// CRUD ENTIDA RELACIONAMENTO --- FOLHA / CONEXÃO

//Criando formulário de cadastro folha
$("#cadastroFolha").click(function () {
  $(".view-content").html(`<div class="view-content-teste listar-funcionarios">
  <div class="tituloo">
  <h1>Cadastrar Folha de Pagamento</h1>
  <p>Clique no botão abaixo e preencha todos os campos para prosseguir com o cadastro</p>
  </div>
    <div class="form">
      <div class="row formularios align-items-center gap-3">
      
      
      <button class="btn btn-primary" onclick="gerar()">Gerar</button>
      <div id="resp">
      </div>

      <div>
      <label for="text">Selecione o setor</label>
      <select id="select-setor">
      
      </select>
      </div>
      

      <div>
      <label for="text">Selecione o funcionario</label>

      <select id="select-funcionario">
      </select>
      </div>

      <div>
      <label for="text">Digite os dias trabalhados</label>
      <input id="dias-trabalhados" type="number" onblur="validaDias()">
      </div>

      </div>
        <div class="buttonEnviar pt-3">
          <button type="button" class="btn btn-primary" onclick="cadastrarFolha()">Cadastrar
          </button>
        </div>
        
        <div id="folha-descricao">

        </div>
        <div id="valida-folha">
        </div>

    </div>
  </div>
  `);

  selectSetor();
  selectFuncionario();
});





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
      alert(
        "Cadastro efetuado!"
      );
    })

    .catch((error) => {
      console.log(error);
      alert("Não foi possível efetuar o cadastro!");
    });
} // fim cadastrar folha



// Validações da folha
function validaDias() {
  let divDias = document.getElementById("dias-trabalhados").value;
  if (divDias == "") {
  let divErro = document.getElementById("valida-folha")
  let pErro = document.createElement("p")
  pErro.innerHTML = "O campo dias trabalhados não pode estar vazio!"
  divErro.appendChild(pErro)
  pErro.className = "erro-input"
  }
 }

// gera um id pro usuário e preenche o input
function gerar() {
  var resp = document.getElementById("resp");
  let labelTeste = document.createElement("label");
  labelTeste.innerHTML = "ID Da folha gerado";
  let teste = document.createElement("input");
  teste.setAttribute("id", "id-folha-random");
  teste.value = Math.floor(8568 * Math.random() + 1);
  resp.appendChild(labelTeste);
  resp.appendChild(teste);
}


// lista de setores do bd para cadastro
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

// lista de funcionários cadastrados no bd para cadastro
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


// lista todas as folhas de pagamento cadastradas no sistema
$("#listarFolhas").click(function () {
  $(".view-content").html(`<div class="view-content-teste listar-funcionarios">
  <h1>Listar folhas de pagamento</h1>
  <p>Clique no botão abaixo para gerar a lista com todas as folhas de pagamento cadastradas no sistema</p>
  <div class="buttonEnviar pt-3" id="btn-display-lista">
        <button type="button" class="btn btn-primary mb-3" onclick="listarFolhas()">Listar Folhas
        </button>
  </div>
     <div id="listar-folhas"></div>
  </div>
  `);
});


function listarFolhas() {
  let divDisplay = document.getElementById("btn-display-lista")

  divDisplay.classList.add("classeTeste")

  
  fetch(url + "listarfolha")
    .then((response) => response.json())
    .then((folhas) => {
      let listaFolhas = document.getElementById("listar-folhas");

      for (let folha of folhas) {
        let divFolha = document.createElement("div");
        let containerLabels = document.createElement("div");
        containerLabels.className = "containerLabels";

        let divIdFolha = document.createElement("div");
        let labelIdFolha = document.createElement("label");
        labelIdFolha.innerHTML = "ID da folha";
        divIdFolha.appendChild(labelIdFolha);
        containerLabels.appendChild(divIdFolha);

        let divDiasT = document.createElement("div");
        let labelDiasT = document.createElement("label");
        labelDiasT.innerHTML = "Dias trabalhados";
        divDiasT.appendChild(labelDiasT);
        containerLabels.appendChild(divDiasT);

        let divLabelSalario = document.createElement("div");
        let labelSalario = document.createElement("label");
        labelSalario.innerHTML = "Salario";
        divLabelSalario.appendChild(labelSalario);
        containerLabels.appendChild(divLabelSalario);

        divFolha.appendChild(containerLabels);

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
        divSalario.value = "$" + folha.salario;
        divFolha.appendChild(divSalario);

        let btnRemover = document.createElement("button");
        btnRemover.innerHTML = "Remover";
        btnRemover.className = "remove";
        btnRemover.onclick = (u) => removerFolha(folha.id);

        let divBotoes = document.createElement("div");
        divBotoes.appendChild(btnRemover);
        divFolha.appendChild(divBotoes);

        listaFolhas.appendChild(divFolha);
      }
    });
}

// remove folha do sistema
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
      alert("Folha removida!");
    })
    .catch((error) => {
      console.log(error);
      alert("Não foi possível remover a folha");
    });
}



// lista folha específica por id gerado
$("#listarFolhaId").click(function () {
  $(".view-content").html(`<div class="view-content-teste listar-funcionarios">
  <h1>Listar folha por ID gerado</h1>
  <p>Insira o ID gerado no campo abaixo para achar a folha de pagamento que deseja.</p>
  <input id="id-folha-unica"> </input>
  <div class="buttonEnviar pt-3" id="btn-display-id">
        <button type="button" class="btn btn-primary" onclick="listarFolhaId()">Listar Folha
        </button>
  </div>
     <div id="listar-folha-id"></div>
  </div>
  `);
});

function listarFolhaId() {

  let divDisplay = document.getElementById("btn-display-id")

  divDisplay.classList.add("classeTeste")
  var idFolha = document.getElementById("id-folha-unica").value;
  console.log(idFolha); //aqui está o id que que vai retornar o item que eu quero

  fetch(url + "listarfolhaid/" + idFolha)
    .then((x) => x.json())
    .then((folha) => {
      console.log(folha);

      let listarFolha = document.getElementById("listar-folha-id");
      
        let divFolha = document.createElement("div");
        let containerLabels = document.createElement("div");
        containerLabels.className = "containerLabels3";

        let divIdFolha = document.createElement("div");
        let labelIdFolha = document.createElement("label");
        labelIdFolha.innerHTML = "ID da folha";
        divIdFolha.appendChild(labelIdFolha);
        containerLabels.appendChild(divIdFolha);

        let divDiasT = document.createElement("div");
        let labelDiasT = document.createElement("label");
        labelDiasT.innerHTML = "Dias trabalhados";
        divDiasT.appendChild(labelDiasT);
        containerLabels.appendChild(divDiasT);

        let divLabelSalario = document.createElement("div");
        let labelSalario = document.createElement("label");
        labelSalario.innerHTML = "Salario";
        divLabelSalario.appendChild(labelSalario);
        containerLabels.appendChild(divLabelSalario);

        divFolha.appendChild(containerLabels);

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
        divSalario.value = "$" + folha.salario;
        divFolha.appendChild(divSalario);

        listarFolha.appendChild(divFolha);
      
     
    });
}

// lista folhas de pagamento com salarios maiores do que o usário escolher
$("#listarFolhaSalarioMaior").click(function () {
  $(".view-content").html(`<div class="view-content-teste listar-funcionarios">
  <h1>Listar por salário maior que:</h1>
  <p>Insira no campo abaixo um valor para listar as folhas de pagamento que tem o salario maior que o valor informado!</p>
  <input id="id-folha-salario"> </input>
  
  <div class="buttonEnviar pt-3" id="btn-display">
        <button type="button" class="btn btn-primary" onclick="listarFolhaSalario()">Listar Folha
        </button>
  </div>
     <div id="listar-folha-salario"></div>
  </div>
  `);
});

function listarFolhaSalario() {

  let divDisplay = document.getElementById("btn-display")

  divDisplay.classList.add("classeTeste")

  var idFolhaSalario = document.getElementById("id-folha-salario").value;
  console.log(idFolhaSalario); //aqui está o id que que vai retornar o item que eu quero

  fetch(url + "salariomaior/" + idFolhaSalario)
    .then((x) => x.json())
    .then((folhas) => {
      console.log(folhas);

      let listaFolhas = document.getElementById("listar-folha-salario");

      for (let folha of folhas) {
        let divFolha = document.createElement("div");
        let containerLabels = document.createElement("div");
        containerLabels.className = "containerLabels2";

        let divIdFolha = document.createElement("div");
        let labelIdFolha = document.createElement("label");
        labelIdFolha.innerHTML = "ID da folha";
        divIdFolha.appendChild(labelIdFolha);
        containerLabels.appendChild(divIdFolha);

        let divDiasT = document.createElement("div");
        let labelDiasT = document.createElement("label");
        labelDiasT.innerHTML = "Dias trabalhados";
        divDiasT.appendChild(labelDiasT);
        containerLabels.appendChild(divDiasT);

        let divLabelSalario = document.createElement("div");
        let labelSalario = document.createElement("label");
        labelSalario.innerHTML = "Salario";
        divLabelSalario.appendChild(labelSalario);
        containerLabels.appendChild(divLabelSalario);

        divFolha.appendChild(containerLabels);

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
        divSalario.value = "$" + folha.salario;
        divFolha.appendChild(divSalario);

        listaFolhas.appendChild(divFolha);
      }
    });
}




// lista folhas de pagamento por funcionário
$("#listarFolhaFunci").click(function () {
  $(".view-content").html(`<div class="view-content-teste listar-funcionarios">
  <h1>Listar folha de pagamento por funcionário:</h1>
  <p>Selecione na lista abaixo o funcionário para retornar a sua folha de pagamento</p>
  <div>
  <select id="nome-folha-f">

  </select>
  </div>
  
  <div class="buttonEnviar pt-3" id="teste1">
        <button type="button" class="btn btn-primary" onclick="listaFolhaDofuncionario()">Listar Folha
        </button>
  </div>
     <div id="listar-folha-funcionario">
     </div>
     <div class="buttonEnviar pt-3 classeTeste" id="btn-display-none">
        <button type="button" class="btn btn-primary" onclick="imprimirFolha()">Imprimir Folha
        </button>
  </div>
  <div id="print" class="conteudo classeTeste">
      <h1>Folha de pagamento
      </h1>
      <div id="povoaJs">

      </div>
  </div>

  </div^>
  `)
  listaFuncionarioFolha();
});

function listaFolhaDofuncionario() {
  let divTeste = document.getElementById("teste1")

  divTeste.classList.add("classeTeste")
  let selecfunciFolha = document.getElementById("nome-folha-f");
  let idFuncionario = selecfunciFolha.options[selecfunciFolha.selectedIndex].value
  let NomeFuncionario = selecfunciFolha.options[selecfunciFolha.selectedIndex].innerHTML
  
 
console.log(NomeFuncionario)
console.log(idFuncionario)

  fetch(url + "listarFolhaFuncionario/" + idFuncionario)
    .then((x) => x.json())
    .then((folha) => {
      console.log(folha);

      let listaFolhas = document.getElementById("listar-folha-funcionario");

        let divFolha = document.createElement("div");
        let containerLabels = document.createElement("div");
        containerLabels.className = "containerLabels2";

        let divIdFolha = document.createElement("div");
        let labelIdFolha = document.createElement("label");
        labelIdFolha.innerHTML = "ID da folha";
        divIdFolha.appendChild(labelIdFolha);
        containerLabels.appendChild(divIdFolha);

        let divDiasT = document.createElement("div");
        let labelDiasT = document.createElement("label");
        labelDiasT.innerHTML = "Dias trabalhados";
        divDiasT.appendChild(labelDiasT);
        containerLabels.appendChild(divDiasT);

        let divLabelSalario = document.createElement("div");
        let labelSalario = document.createElement("label");
        labelSalario.innerHTML = "Salario";
        divLabelSalario.appendChild(labelSalario);
        containerLabels.appendChild(divLabelSalario);

        divFolha.appendChild(containerLabels);

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
        divSalario.value = "$" + folha.salario;
        divFolha.appendChild(divSalario);

        listaFolhas.appendChild(divFolha);

        let divLayoutFolha = document.getElementById("povoaJs")

        let cabecaFolha = document.createElement("h3")
        cabecaFolha.innerHTML = "Abaixo, segue todas as informações sobre o salário do mês."
        divLayoutFolha.appendChild(cabecaFolha)

        let cabecaFolha2 = document.createElement("h2")
        let salarioMes = folha.salario
        let diasTrabalhados = folha.diasTrabalhados
        cabecaFolha2.innerHTML = 
        "*Nome: " + NomeFuncionario + 
        " *Salário do mês: "+"$"+ salarioMes + 
        " *Dias trabalhados: "+ diasTrabalhados 
        divLayoutFolha.appendChild(cabecaFolha2)

        let cabecaFolha3 = document.createElement("p")
        cabecaFolha3.innerHTML = "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker."
        divLayoutFolha.appendChild(cabecaFolha3)
      
    });

        

    let divBtnNone = document.getElementById("btn-display-none")
    divBtnNone.classList.remove("classeTeste")
}


function imprimirFolha(){
  let conteudo = document.getElementById('print').innerHTML,
  tela_impressao = window.open('about:blank');
  tela_impressao.document.write(conteudo);
  tela_impressao.window.print();
  tela_impressao.window.close();
}











// lista de funcionários cadastrados no bd para cadastro
function listaFuncionarioFolha() {
  fetch(url + "listarfuncionarios")
    .then((y) => y.json())
    .then((funcionarios) => {

      console.log(funcionarios)

       let divfuncionario2 = document.getElementById("nome-folha-f");
      for (let f of funcionarios) {
        let optionFuncionario2 = document.createElement("option");
        optionFuncionario2.value = f.id;
        optionFuncionario2.innerHTML = f.nome
        divfuncionario2.appendChild(optionFuncionario2)
      }
    });
}





// let selecfunci = document.getElementById("select-funcionario");

//   let folha = {
//     id: document.getElementById("id-folha-random").value,
//     idSetor: selectsetor.options[selectsetor.selectedIndex].value,
//     idFuncionario: selecfunci.options[selecfunci.selectedIndex].value,
//     diasTrabalhados: document.getElementById("dias-trabalhados").value,
//   };




// fim do projeto
