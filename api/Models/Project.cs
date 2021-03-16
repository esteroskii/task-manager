using  System.Collections.Generic;

namespace TaskAsigment.Models
{
    public class Project
    {
        public long id {get; set;}
        public string name { get; set; }
        public string description { get; set; }

    //////////////////////////////////////////////////
        public long userId { get; set;}
        public User user { get; set;}
    /////////////////////////////////////////////////
        public List<Assignment> tasks { get; set; }
    /////////////////////////////////////////////////
        public List<State> states {get; set;}

    }
}