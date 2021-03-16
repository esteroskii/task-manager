
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
    public class TaskController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public TaskController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async  Task<ActionResult<Assignment>> getTask(long id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if(task == null){
                return NotFound();
            }
            return task;
        }
        [HttpGet]
        public async  Task<ActionResult<IEnumerable<Assignment>>> getTasks()
        {
            return await _context.Tasks.ToListAsync();
        }
        [HttpPost]
        
        public async Task<ActionResult<Project>> postTask(Assignment task){
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction("getTask", new {id = task.id}, task);
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult<Assignment>> updateTask(long id,Assignment task){
            if(id != task.id){
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return CreatedAtAction("getTask", new {id = task.id}, task);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Assignment>> deleteTask(long id){
            var task = await _context.Tasks.FindAsync(id);
            if(task == null){
                return NotFound();
            }
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return task;
        }
        
    }
}