using Microsoft.EntityFrameworkCore;

namespace TaskAsigment.Models

{

    public class DatabaseContext: DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options): base(options)
        {
            
        }
        public DbSet<User> Users {get; set;}
        public DbSet<Project> Projects {get; set;}
        public DbSet<State> States { get; set; }
        public DbSet<Assignment> Tasks { get; set; }

    }

}