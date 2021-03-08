
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
    public class AuthController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public AuthController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async  Task<ActionResult<User>> getUser(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if(user == null){
                return NotFound();
            }
            return user;
        }
        [HttpGet]
        public async  Task<ActionResult<IEnumerable<User>>> getPersonas()
        {
            return await _context.Users.ToListAsync();
        }
        [HttpPost("register")]
        
        public async Task<ActionResult<User>> register(User user){
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction("getUser", new {id = user.id}, user);
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<User>> login(AunthInfo info){
            
            var users = await getPersonas();
            var usersInfo = users.Value;
            User finalUser = null;
            foreach (var user in usersInfo)
            {
                if(user.email == info.email && user.password == info.password){
                    finalUser = user;
                }
            }
            if(finalUser == null){
                return NotFound();
            }else{
                return finalUser;
            }
        }

    }
}