using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly LibraryContext _context;

        public DashboardController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/dashboard
        [HttpGet]
        public async Task<ActionResult<DashboardStats>> GetDashboardStats()
        {
            var totalStudents = await _context.Students.CountAsync();
            var totalBooks = await _context.Books.CountAsync();
            var totalIssuedBooks = await _context.IssueRecords.CountAsync();
            var totalAdmins = await _context.Users.CountAsync();

            var stats = new DashboardStats
            {
                TotalStudents = totalStudents,
                TotalBooks = totalBooks,
                TotalIssuedBooks = totalIssuedBooks,
                TotalAdmins = totalAdmins
            };

            return Ok(stats);
        }
    }

    // DTO to hold the statistics data
    public class DashboardStats
    {
        public int TotalStudents { get; set; }
        public int TotalBooks { get; set; }
        public int TotalIssuedBooks { get; set; }
        public int TotalAdmins { get; set; }
    }
}
