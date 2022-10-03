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

			


			

        }
    }
}
    
    


