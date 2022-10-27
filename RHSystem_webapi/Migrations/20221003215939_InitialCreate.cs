using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RHSystem_webapi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "folha",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    id_folha_funcionario = table.Column<int>(type: "INTEGER", nullable: false),
                    id_folha_setor = table.Column<int>(type: "INTEGER", nullable: false),
                    dias_trabalhados = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_folha", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "funcionarios",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    id_setor = table.Column<int>(type: "INTEGER", nullable: false),
                    cpf = table.Column<int>(type: "INTEGER", nullable: false),
                    nome_funcionario = table.Column<string>(type: "TEXT", nullable: true),
                    sexo = table.Column<char>(type: "TEXT", nullable: false),
                    salario_dia = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_funcionarios", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "setores",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    nome_setor = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_setores", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "folha");

            migrationBuilder.DropTable(
                name: "funcionarios");

            migrationBuilder.DropTable(
                name: "setores");
        }
    }
}
