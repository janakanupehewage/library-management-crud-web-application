using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssueRecordController : ControllerBase
    {
        private readonly LibraryContext _context;

        public IssueRecordController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/issuerecord
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IssueRecord>>> GetIssueRecords()
        {
            return await _context.IssueRecords.Include(ir => ir.Student).Include(ir => ir.Book).ToListAsync();
        }

        // GET: api/issuerecord/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IssueRecord>> GetIssueRecord(int id)
        {
            var issueRecord = await _context.IssueRecords.Include(ir => ir.Student).Include(ir => ir.Book)
                                                          .FirstOrDefaultAsync(ir => ir.IssueId == id);

            if (issueRecord == null)
            {
                return NotFound();
            }

            return issueRecord;
        }

        // POST: api/issuerecord
        [HttpPost]
        public async Task<ActionResult<IssueRecord>> IssueBook(IssueRecord issueRecord)
        {
            var book = await _context.Books.FindAsync(issueRecord.BookId);
            if (book == null || book.Quantity <= 0)
            {
                return BadRequest("Book is not available.");
            }

            book.Quantity -= 1;
            issueRecord.IssueDate = DateTime.Now;
            issueRecord.DueDate = issueRecord.IssueDate.AddDays(7); // Book due after 7 days

            _context.IssueRecords.Add(issueRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIssueRecord", new { id = issueRecord.IssueId }, issueRecord);
        }

        // PUT: api/issuerecord/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIssueRecord(int id, IssueRecord issueRecord)
        {
            if (id != issueRecord.IssueId)
            {
                return BadRequest();
            }

            _context.Entry(issueRecord).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/issuerecord/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIssueRecord(int id)
        {
            var issueRecord = await _context.IssueRecords.FindAsync(id);
            if (issueRecord == null)
            {
                return NotFound();
            }

            // Increase book quantity when a book is returned
            var book = await _context.Books.FindAsync(issueRecord.BookId);
            
            if (book != null)
            {
                book.Quantity += 1;
            }


            _context.IssueRecords.Remove(issueRecord);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/issuerecord/fine/5
        [HttpGet("fine/{id}")]
        public async Task<ActionResult<decimal>> CalculateFine(int id)
        {
            var issueRecord = await _context.IssueRecords.FindAsync(id);
            if (issueRecord == null || issueRecord.IsReturned)
            {
                return NotFound();
            }

            var overdueDays = (DateTime.Now - issueRecord.DueDate).Days;
            if (overdueDays > 0)
            {
                decimal fineAmount = overdueDays * 5; // 5 rupees per day
                issueRecord.Fine = fineAmount;
                await _context.SaveChangesAsync();
                return fineAmount;
            }

            return 0;
        }

        // PUT: api/issuerecord/return/5
        [HttpPut("return/{id}")]
        public async Task<IActionResult> ReturnBook(int id)
        {
            var issueRecord = await _context.IssueRecords.FindAsync(id);
            if (issueRecord == null)
            {
                return NotFound();
            }

            issueRecord.IsReturned = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
