using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace TaskAsigment.Migrations
{
    public partial class projectsMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_tareas_proyectos_proyectoid",
                table: "tareas");

            migrationBuilder.DropTable(
                name: "proyectos");

            migrationBuilder.RenameColumn(
                name: "proyectoid",
                table: "tareas",
                newName: "projectid");

            migrationBuilder.RenameIndex(
                name: "ix_tareas_proyectoid",
                table: "tareas",
                newName: "ix_tareas_projectid");

            migrationBuilder.CreateTable(
                name: "projects",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_projects", x => x.id);
                });

            migrationBuilder.AddForeignKey(
                name: "fk_tareas_projects_projectid",
                table: "tareas",
                column: "projectid",
                principalTable: "projects",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_tareas_projects_projectid",
                table: "tareas");

            migrationBuilder.DropTable(
                name: "projects");

            migrationBuilder.RenameColumn(
                name: "projectid",
                table: "tareas",
                newName: "proyectoid");

            migrationBuilder.RenameIndex(
                name: "ix_tareas_projectid",
                table: "tareas",
                newName: "ix_tareas_proyectoid");

            migrationBuilder.CreateTable(
                name: "proyectos",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    description = table.Column<string>(type: "text", nullable: true),
                    name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_proyectos", x => x.id);
                });

            migrationBuilder.AddForeignKey(
                name: "fk_tareas_proyectos_proyectoid",
                table: "tareas",
                column: "proyectoid",
                principalTable: "proyectos",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
