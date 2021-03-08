using System.Collections.Generic;

namespace TaskAsigment.Models

{
    public class Tasks
    {
        public long id { get; set; }
        public string description { get; set; }
        public string state { get; set; }
        public long userId { get; set; }
        public User user { get; set; }
        public long projectId { get; set; }
        public Project project { get; set; }
    }
}