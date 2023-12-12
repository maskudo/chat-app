using Microsoft.AspNetCore.Mvc;
using ChatApi.Models;

namespace chat_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserContext _context;

        public AuthController(UserContext context)
        {
            _context = context;
        }


        private bool UserExists(string username)
        {
            return _context.Users.Any(e => e.username == username);
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterRequest user)
        {
            if (this.UserExists(user.username))
            {
                return BadRequest("Username already exists");
            }
            var id = Guid.NewGuid();
            var password_hash = BCrypt.Net.BCrypt.HashPassword(user.password);
            var newUser = new User(id, user.username, password_hash, user.avatarImage);
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully");
        }

        [HttpPost("login")]
        public ActionResult<User> Login(LoginRequest user)
        {
            var usr = _context.Users.SingleOrDefault(u => u.username == user.username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(user.password, usr?.passwordHash))
            {
                return BadRequest("Incorrect Username or Password");
            }

            return Ok(usr);
        }
    }
}
