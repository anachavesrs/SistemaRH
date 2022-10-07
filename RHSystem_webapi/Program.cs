using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace RHSystem_webapi
{
    class Database : DbContext
	{
		public Database (DbContextOptions options) : base(options)
		{
			
		}
		
		public DbSet<Funcionario> Funcionario { get; set; } = null!;
        public DbSet<Setor> Setor { get; set; } = null!;
		public DbSet<Folha> Folha { get; set; } = null!;
        
	}

    
    class Program
	{
		static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			
			var connectionString = builder.Configuration.GetConnectionString("Database") ?? "Data Source=Database.db";
			builder.Services.AddSqlite<Database>(connectionString);

            
			var app = builder.Build();

		// --------------------------- CRUD FUNCIONARIO ---------------------------------------------
		//cadastrar funcionário
			app.MapPost("/cadastrarfuncionario", (Database basedeDados, Funcionario funcionario) =>
			{
				basedeDados.Funcionario.Add(funcionario);
				basedeDados.SaveChanges();
				return "Funcionario adicionado!" + " \n Nome: " + funcionario.nome +  " \n CPF: " + funcionario.cpf + "\n Sexo: " + funcionario.sexo;
			});
			
			//listar todos os funcionarios
			app.MapGet("/listarfuncionarios", (Database basedeDados) => {
				return basedeDados.Funcionario.ToList();
			});

			//listar funcionário especifico ** Verificar 
			app.MapGet("/listarfuncionario/{id}", (Database baseUsuarios, int id) => {
				return baseUsuarios.Funcionario.Find(id);
			});

			// //atualizar funcionarios
			app.MapPost("/atualizarfuncionario/{id}", (Database basedeDados, Funcionario funcionarioAtualizado, int id) =>
			{
				var funcionario = basedeDados.Funcionario.Find(id);
				funcionario!.nome = funcionarioAtualizado.nome;
				funcionario.cpf = funcionarioAtualizado.cpf;
				funcionario.sexo = funcionarioAtualizado.sexo;
				basedeDados.SaveChanges();
				return "funcionario atualizado";
			});


			// //deletar funcionario
			app.MapPost("/deletarfuncionario/{id}", (Database basedeDados, int id) =>
			{
				var funcionario = basedeDados.Funcionario.Find(id);
				basedeDados.Remove(funcionario);
				basedeDados.SaveChanges();
				return "funcionario deletado";
			});



			 //------------------------------CRUD SETOR--------------------------------------------------
			// //cadastrar setor
			app.MapPost("/cadastrarsetor", (Database basedeDados, Setor setor) =>
			{
				basedeDados.Setor.Add(setor);
				basedeDados.SaveChanges();
				return "Setor adicionado!" + " \n Nome: " + setor.nome +  " \n Valor dia trabalhado:" + setor.valorDiaTrabalho;
			});


			//listar todos os setores
			app.MapGet("/listarsetores", (Database basedeDados) => {
				return basedeDados.Setor.ToList();
			});

			//listar setor especifico ** Verificar
			app.MapGet("/listarsetor/{id}", (Database baseUsuarios, int id) => {
				return baseUsuarios.Setor.Find(id);
			});

			//atualizar setores
			app.MapPost("/atualizarsetor/{id}", (Database basedeDados, Setor setorAtualizado, int id) =>
			{
				var setor = basedeDados.Setor.Find(id);
				setor!.nome = setorAtualizado.nome;
				setor.valorDiaTrabalho = setorAtualizado.valorDiaTrabalho;
				basedeDados.SaveChanges();
				return "setor atualizado";
			});

			//deletar setor
			app.MapPost("/deletarsetor/{id}", (Database basedeDados, int id) =>
			{
				var setor = basedeDados.Setor.Find(id);
				basedeDados.Remove(setor);
				basedeDados.SaveChanges();
				return "setor deletado";
			});




			//------------------------ENTIDADE RELACIONAMNETO - FOLHA ------------------------

			//cadastra folha de pagamento, calcula salário e retorna folha com TODOS os dados
			app.MapPost("/cadastrarfolha", (Database basedeDados, Folha folhap) =>
			{
				var setor = basedeDados.Setor.Find(folhap.idSetor);
				var salario = setor!.valorDiaTrabalho * folhap.diasTrabalhados;
				var nomesetor = setor.nome;
				var valordiatrabalho = setor.valorDiaTrabalho;

				var funcionario = basedeDados.Funcionario.Find(folhap.idFuncionario);
				var nomefuncionario = funcionario!.nome;
				var cpffuncionario = funcionario.cpf;
				folhap.salario = salario;
				basedeDados.Folha.Add(folhap);
				basedeDados.SaveChanges();

				return "Folha de pagamento cadastrada!"
						+ "\n ID Folha: " + folhap.id
						+ "\n ID do Setor: " + folhap.idSetor
						+ "\n Nome do Setor: " + nomesetor
						+ "\n Valor que o setor paga por dia: R$" + valordiatrabalho
						+ "\n ID do Funcionário: " + folhap.idFuncionario
						+ "\n Nome do Funcionário: " + nomefuncionario
						+ "\n CPF do Funcionário: " + cpffuncionario
						+ "\n Dias Trabalhados: " + folhap.diasTrabalhados
						+ "\n Salário final calculado: R$" + folhap.salario;
			});

			//lista todas as folhas de pagamento cadastradas
			app.MapGet("/listarfolha", (Database basedeDados) => {
				return basedeDados.Folha.ToList();
			});

			app.MapPost("/deletarfolha/{id}", (Database basedeDados, int id) =>
			{
				var folha = basedeDados.Folha.Find(id);
				basedeDados.Remove(folha);
				basedeDados.SaveChanges();
				return "folha deletada deletado";
			});



			//Encontra folha do funcionario com base no ID do funcionário
			app.MapGet("/listarFolhaFuncionario/{funcId}", (Database baseUsuarios, Database basedeDados, int funcId) => {
				
				Funcionario newFunc = new Funcionario();
				newFunc = baseUsuarios.Funcionario.Find(funcId)!;

				foreach(Folha folhaFunc in basedeDados.Folha.ToList()){
					if(newFunc.id.Equals(folhaFunc.idFuncionario)){
						return folhaFunc;
						//lista para retornar os funcionarios com mais de uma folha
					}
				}	

				return null;			
			});


			//listar folha de pagamento com os salários maiores que 1500 reais.
			  app.MapGet("/salariomaior/{maior}", (Database basedeDados, int maior) => {

				var querySalarios =
            	from folhaFunc in basedeDados.Folha.ToList()
            	where folhaFunc.salario >= maior
				select folhaFunc;

			return querySalarios;
				
			  });


			app.Run();
			

        }


	
		
    }
}
    
    


