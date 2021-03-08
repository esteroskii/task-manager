
using Microsoft.AspNetCore.Mvc;
using TaskAsigment.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace TaskAsigment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ProjectController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async  Task<ActionResult<Project>> getProject(long id)
        {
            var project = await _context.Projects.FindAsync(id);
            if(project == null){
                return NotFound();
            }
            return project;
        }
        public async  Task<ActionResult<Tasks>> getTask(long id)
        {
            var task = await _context.Tareas.FindAsync(id);
            if(task == null){
                return NotFound();
            }
            return task;
        }
        [HttpGet]
        public async  Task<ActionResult<IEnumerable<Project>>> getProjects()
        {
            return await _context.Projects.ToListAsync();
        }
        [HttpPost]
        
        public async Task<ActionResult<Project>> postProject(Project project){
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return CreatedAtAction("getProject", new {id = project.id}, project);
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult<Project>> updateProject(long id,Project project){
            if(id != project.id){
                return BadRequest();
            }

            _context.Entry(project).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return CreatedAtAction("getProject", new {id = project.id}, project);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Project>> deleteProject(long id){
            var project = await _context.Projects.FindAsync(id);
            if(project == null){
                return NotFound();
            }
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return project;
        }
        [HttpPatch("{id}")]
        public async Task<ActionResult<Project>> patchProject(long id,Project project){
            if(id != project.id){
                return BadRequest();
            }

            _context.Entry(project).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return CreatedAtAction("getProject", new {id = project.id}, project);
        }
        [HttpGet("{id}/tasks")]
        public async Task<ActionResult<IEnumerable<Tasks>>> getTasks(long id){
            return await _context.Tareas.Where(b => b.projectId == id).ToListAsync();
        }
        [HttpPost("{id}/tasks")]
        public async Task<ActionResult<Tasks>> postTask(Tasks task){
            _context.Tareas.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction("getTask", new {id = task.id}, task);
        }
        [HttpGet("{id}/tasks/{idtask}")]
        public async Task<ActionResult<Tasks>> getProjectTask(long id, long idtask){
             return await _context.Tareas.Where(b => b.projectId == id && b.id == idtask).SingleAsync();
             
        }
    }
}