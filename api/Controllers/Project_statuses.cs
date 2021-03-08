
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
    public class Project_StatusesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public Project_StatusesController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async  Task<ActionResult<State>> getState(long id)
        {
            var state = await _context.States.FindAsync(id);
            if(state == null){
                return NotFound();
            }
            return state;
        }
        
        [HttpGet]
        public async  Task<ActionResult<IEnumerable<State>>> getStates()
        {
            return await _context.States.ToListAsync();
        }
        [HttpPost]
        
        public async Task<ActionResult<State>> postState(State state){
            _context.States.Add(state);
            await _context.SaveChangesAsync();
            return CreatedAtAction("getState", new {id = state.id}, state);
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult<State>> updateState(long id,State state){
            if(id != state.id){
                return BadRequest();
            }

            _context.Entry(state).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return CreatedAtAction("getState", new {id = state.id}, state);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<State>> deleteProject(long id){
            var state = await _context.States.FindAsync(id);
            if(state == null){
                return NotFound();
            }
            _context.States.Remove(state);
            await _context.SaveChangesAsync();
            return state;
        }
        [HttpPatch("{id}")]
        public async Task<ActionResult<State>> patchState(long id,State state){
            if(id != state.id){
                return BadRequest();
            }

            _context.Entry(state).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return CreatedAtAction("getState", new {id = state.id}, state);
        }
        
    }
}