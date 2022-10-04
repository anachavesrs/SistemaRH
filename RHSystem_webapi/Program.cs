using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace RHSystem_webapi
{
    class BasedeDados : DbContext
	{
		public BasedeDados (DbContextOptions options) : base(options)
		{
			
		}
		
		public DbSet<Funcionario> funcionarios { get; set; } = null!;
        public DbSet<Setor> setores { get; set; } = null!;
		 public DbSet<Folha> folha { get; set; } = null!;
        
	}

    
    class Program
	{
		static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			
			var connectionString = builder.Configuration.GetConnectionString("RHSystems_db") ?? "Data Source=RHSystems_db.db";
			builder.Services.AddSqlite<BasedeDados>(connectionString);

            
			var app = builder.Build();

		// --------------------------- CRUD FUNCIONARIO ---------------------------------------------
		//cadastrar funcionário
			app.MapPost("/cadastrarf", (BasedeDados basedeDados, Funcionario funcionario) =>
			{
				basedeDados.funcionarios.Add(funcionario);
				basedeDados.SaveChanges();
				return "Funcionario adicionado";
			});
			
			//listar todos os funcionarios
			app.MapGet("/funcionarios", (BasedeDados basedeDados) => {
				return basedeDados.funcionarios.ToList();
			});

			//atualizar funcionarios
			app.MapPost("/atualizarf/{id}", (BasedeDados basedeDados, Funcionario funcionarioAtualizado, int id) =>
			{
				var funcionario = basedeDados.funcionarios.Find(id);
				funcionario.id_setor = funcionarioAtualizado.id_setor;
				funcionario.nome_funcionario = funcionarioAtualizado.nome_funcionario;
				funcionario.cpf = funcionarioAtualizado.cpf;
				funcionario.sexo = funcionarioAtualizado.sexo;
				funcionario.salario_dia = funcionarioAtualizado.salario_dia;
				basedeDados.SaveChanges();
				return "funcionario atualizado";
			});


			

			//deletar funcionario
			app.MapPost("/deletarf/{id}", (BasedeDados basedeDados, int id) =>
			{
				var funcionario = basedeDados.funcionarios.Find(id);
				basedeDados.Remove(funcionario);
				basedeDados.SaveChanges();
				return "funcionario deletado";
			});



			//------------------------------CRUD SETOR--------------------------------------------------
			//cadastrar setor
			app.MapPost("/cadastrars", (BasedeDados basedeDados, Setor setor) =>
			{
				basedeDados.setores.Add(setor);
				basedeDados.SaveChanges();
				return "Setor adicionado";
			});


			//listar todos os setores
			app.MapGet("/setores", (BasedeDados basedeDados) => {
				return basedeDados.setores.ToList();
			});

			//atualizar setores
			app.MapPost("/atualizars/{id}", (BasedeDados basedeDados, Setor setorAtualizado, int id) =>
			{
				var setor = basedeDados.setores.Find(id);
				setor.nome_setor = setorAtualizado.nome_setor;
		
				basedeDados.SaveChanges();
				return "setor atualizado";
			});

			//deletar setor
			app.MapPost("/deletars/{id}", (BasedeDados basedeDados, int id) =>
			{
				var setor = basedeDados.setores.Find(id);
				basedeDados.Remove(setor);
				basedeDados.SaveChanges();
				return "setor deletado";
			});




			// --------------------------------------FOLHA PAGAMENTO----------------------------------------------


			//cadastra folha de pagamento
			//TODO
			app.MapPost("/cadastrarfolha", (BasedeDados basedeDados, Folha folhap) =>
			{
				basedeDados.folha.Add(folhap);
				basedeDados.SaveChanges();
				return "Dados para emitir folha enviados! Segue:" + " \n ID FOLHA:" + folhap.id + " \n ID FUNCIONARIO:" + folhap.id_folha_funcionario + " \n ID SETOR:" + folhap.id_folha_setor + " \n DIAS TRABALHADOS:" + folhap.dias_trabalhados;
			});


				

			//mostra folha de pagamento do funcionario
			app.MapGet("/mostrarfolha/{id}", (BasedeDados basedeDados, Funcionario funcionarios , Setor setores, int id) => 
			{
				var folhap = basedeDados.folha.Find(id);

				if (folhap.id_folha_funcionario == funcionarios.id && folhap.id_folha_setor == funcionarios.id_setor)
				{
					
				}

				
			});




			//mostra quantas mulheres ganham mais que 1000 reais por mês
			//TODO




			//mostra quantos funcionarios tem no setor de vendas
			//TODO



			//listar funcionarios por setor

			app.Run();
			

        }
    }
}
    
    


