using  System.Collections.Generic;

namespace TaskAsigment.Models
{
    public class Project
    {
        public long id {get; set;}
        public string name { get; set; }
        public string description { get; set; }


        public List<Tasks> tareas { get; set; }
    }
}