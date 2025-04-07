namespace backend.Models
{
    public class Student
    {
        public int StudentId { get; set; }
        public string? Name { get; set; } = string.Empty; // Make it nullable or provide default value
        public string? Email { get; set; } = string.Empty; // Same for Email and Address
        public string? Address { get; set; } = string.Empty; // Same for Address
    }
}
