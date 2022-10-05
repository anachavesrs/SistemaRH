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
			app.MapPost("/listarfuncionarios", (Database basedeDados) => {
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

			//listar setor especifico
			app.MapGet("/usuario/{id}", (Database baseUsuarios, int id) => {
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


		

			//cadastra folha de pagamento e calcula salário.
			app.MapPost("/cadastrarfolha", (Database basedeDados, Folha folhap) =>
			{
				
				var setor = basedeDados.Setor.Find(folhap.idSetor);
				var salario = setor!.valorDiaTrabalho * folhap.diasTrabalhados;
				folhap.salario = salario;
				basedeDados.Folha.Add(folhap);
				basedeDados.SaveChanges();

			});

			//lista todas as folhas de pagamento
			app.MapGet("/listarfolha", (Database basedeDados) => {
				return basedeDados.Folha.ToList();
			});



			// //mostra quantos funcionarios tem no setor de vendas
			// //TODO
			app.MapGet("/funcionariosvenda", (Database basedeDados) => {
				var vendedores = teste
			})




			// //listar funcionarios por setor

			app.Run();
			

        }


	
		
    }
}
    
    


