using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskAsigment.Migrations
{
    public partial class users : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "project_user",
                columns: table => new
                {
                    projectsid = table.Column<long>(type: "bigint", nullable: false),
                    usersid = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_project_user", x => new { x.projectsid, x.usersid });
                    table.ForeignKey(
                        name: "fk_project_user_projects_projectsid",
                        column: x => x.projectsid,
                        principalTable: "projects",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_project_user_users_usersid",
                        column: x => x.usersid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_project_user_usersid",
                table: "project_user",
                column: "usersid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "project_user");

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
    }
}
