using System.Collections.Generic;

namespace TaskAsigment.Models

{
    public class Assignment
    {
        public long id { get; set; }
        public string description { get; set; }
        ///////////////////////////////////////////////
        public string stateId { get; set; }
        public State state {get; set; }
        //////////////////////////////////////////////
        public long projectId { get; set; }
        public Project project { get; set; }
    }
}