﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RHSystem_webapi;

#nullable disable

namespace RHSystem_webapi.Migrations
{
    [DbContext(typeof(Database))]
    [Migration("20221004202853_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.0");

            modelBuilder.Entity("RHSystem_webapi.Folha", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("dias_trabalhados")
                        .HasColumnType("INTEGER");

                    b.Property<int>("id_folha_funcionario")
                        .HasColumnType("INTEGER");

                    b.Property<int>("id_folha_setor")
                        .HasColumnType("INTEGER");

                    b.HasKey("id");

                    b.ToTable("folha");
                });

            modelBuilder.Entity("RHSystem_webapi.Funcionario", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("cpf")
                        .HasColumnType("INTEGER");

                    b.Property<int>("id_setor")
                        .HasColumnType("INTEGER");

                    b.Property<string>("nome_funcionario")
                        .HasColumnType("TEXT");

                    b.Property<double>("salario_dia")
                        .HasColumnType("REAL");

                    b.Property<char>("sexo")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("funcionarios");
                });

            modelBuilder.Entity("RHSystem_webapi.Setor", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("nome_setor")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("setores");
                });
#pragma warning restore 612, 618
        }
    }
}
