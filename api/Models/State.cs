using System.Collections.Generic;

namespace TaskAsigment.Models

{
    public class State 
    {
        public long id { get; set; }
        public string description { get; set; }
        ///////////////////////////////////////////
        public long projectId { get; set; }
        public Project project { get; set; }
       
    }
}