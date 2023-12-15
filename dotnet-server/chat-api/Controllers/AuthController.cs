using ChatApi.Authorization;
using Microsoft.AspNetCore.Mvc;
using ChatApi.Models;
using ChatApi.Helpers;

namespace chat_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserContext _context;
        private readonly IJwtHelper _jwtHelper;

        public AuthController(UserContext context, IJwtHelper jwtHelper)
        {
            _context = context;
            _jwtHelper = jwtHelper;
        }


        private bool UserExists(string username)
        {
            return _context.Users.Any(e => e.username == username);
        }

        [AllowAnonymous]
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

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login(LoginRequest user)
        {
            var usr = _context.Users.SingleOrDefault(u => u.username == user.username);
            if (usr == null || !BCrypt.Net.BCrypt.Verify(user.password, usr.passwordHash))
            {
                return BadRequest("Incorrect Username or Password");
            }
            var token = _jwtHelper.GenerateToken(usr);
            LoginResponse response = new(usr, token);
            return Ok(response);
        }
    }
}
