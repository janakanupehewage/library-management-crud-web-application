using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly LibraryContext _context;
        private readonly IConfiguration _configuration;

        public UserController(LibraryContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // POST: api/User/register
        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser([FromBody] User newUser)
        {
            if (newUser == null)
            {
                return BadRequest("Invalid registration attempt.");
            }

            // Check if user already exists
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == newUser.Email);

            if (existingUser != null)
            {
                return Conflict("Email is already in use.");
            }

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(RegisterUser), new { id = newUser.Id }, newUser);
        }

        // POST: api/User/login
        // POST: api/User/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null)
            {
                return BadRequest("Invalid login attempt.");
            }

            // Find user by email and password
            var user = _context.Users.SingleOrDefault(u => u.Email == loginRequest.Email && u.Password == loginRequest.Password);
            
            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            // Check if Jwt:Secret is null
            var secretKey = _configuration["Jwt:Secret"];
            if (string.IsNullOrEmpty(secretKey))
            {
                return StatusCode(500, "JWT secret key is not configured.");
            }

            // Generate JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey); 
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { Token = tokenString });
        }

    }
}
