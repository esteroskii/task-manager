using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskAsigment.Migrations
{
    public partial class projectUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "projectid",
                table: "users",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_users_projectid",
                table: "users",
                column: "projectid");

            migrationBuilder.AddForeignKey(
                name: "fk_users_projects_projectid",
                table: "users",
                column: "projectid",
                principalTable: "projects",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_users_projects_projectid",
                table: "users");

            migrationBuilder.DropIndex(
                name: "ix_users_projectid",
                table: "users");

            migrationBuilder.DropColumn(
                name: "projectid",
                table: "users");
        }
    }
}
