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

$("#cadastroFuncionario").click(function () {
  let formCadastro = $(".view-content");
  formCadastro.html(`<div class="view-content-teste">
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
    </form>
</div>
  `);
});
