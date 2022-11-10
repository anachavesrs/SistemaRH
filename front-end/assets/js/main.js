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
//Criando formulário de cadastro funcionario
$("#cadastroFuncionario").click(function () {
$(".view-content").html(`<div class="view-content-teste">
<h1>Cadastrar Funcionario</h1>
  <form action="Inserir API AQUI" method="post">
    <div class="row formularios align-items-center">
      <input type="text" placeholder="Insira o nome aqui" required>
      <input type="number" placeholder="Insira o cpf aqui" required>
      <select name="selectSexo">
        <option selected>Selecione um gênero</option>
        <option value="m">Masculino</option>
        <option value="f">Feminino</option>
      </select>
    </div>
      <div class="buttonEnviar pt-3">
        <button type="button" class="btn btn-primary" id="submitForm">Enviar
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
    <form action="Inserir API AQUI" method="post">
      <div class="row formularios align-items-center">
        <input type="text" placeholder="Insira o nome aqui" required>
        <input type="number" placeholder="Insira o cpf aqui" required>
        <select name="selectSexo">
          <option selected>Selecione um gênero</option>
          <option value="m">Masculino</option>
          <option value="f">Feminino</option>
        </select>
      </div>
    </form>
  </div>
  `);
  });
  

//Criando formulário de cadastro folha
$("#cadastroFolha").click(function () {
  $(".view-content").html(`<div class="view-content-teste">
  <h1>Cadastrar Folha</h1>
    <form action="Inserir API AQUI" method="post">
      <div class="row formularios align-items-center">
        <input type="text" placeholder="Insira o nome aqui" required>
        <input type="number" placeholder="Insira o cpf aqui" required>
        <select name="selectSexo">
          <option selected>Selecione um gênero</option>
          <option value="m">Masculino</option>
          <option value="f">Feminino</option>
        </select>
      </div>
    </form>
  </div>
  `);
  });

  //Função para exibir mensagem ao clicar no botão de enviar
  $('#submitForm').click(function(){
    alert('Enviado com sucesso!')
  })
  
