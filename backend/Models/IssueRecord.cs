namespace backend.Models
{
    public class IssueRecord
    {
        public int IssueId { get; set; }
        public int StudentId { get; set; }
        public int BookId { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsReturned { get; set; }
        public decimal Fine { get; set; }

        public Student? Student { get; set; } // Nullable reference for related entities
        public Book? Book { get; set; } // Same for Book
    }
}
