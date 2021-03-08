using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskAsigment.Migrations
{
    public partial class tasksMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_tareas_projects_projectid",
                table: "tareas");

            migrationBuilder.RenameColumn(
                name: "projectid",
                table: "tareas",
                newName: "project_id");

            migrationBuilder.RenameIndex(
                name: "ix_tareas_projectid",
                table: "tareas",
                newName: "ix_tareas_project_id");

            migrationBuilder.AlterColumn<long>(
                name: "project_id",
                table: "tareas",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_tareas_projects_project_id",
                table: "tareas",
                column: "project_id",
                principalTable: "projects",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_tareas_projects_project_id",
                table: "tareas");

            migrationBuilder.RenameColumn(
                name: "project_id",
                table: "tareas",
                newName: "projectid");

            migrationBuilder.RenameIndex(
                name: "ix_tareas_project_id",
                table: "tareas",
                newName: "ix_tareas_projectid");

            migrationBuilder.AlterColumn<long>(
                name: "projectid",
                table: "tareas",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "fk_tareas_projects_projectid",
                table: "tareas",
                column: "projectid",
                principalTable: "projects",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
