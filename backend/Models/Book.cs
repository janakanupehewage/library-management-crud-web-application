namespace backend.Models
{
    public class Book
    {
        public int BookId { get; set; } // Auto-generated ID
        
        // Nullable properties with default empty string
        public string? ISBN { get; set; } = string.Empty;  // Nullable with default value
        public string? Title { get; set; } = string.Empty;  // Nullable with default value
        public string? Author { get; set; } = string.Empty;  // Nullable with default value

        // Quantity will remain a required property, but could be initialized to 1 by default if desired
        public int Quantity { get; set; } = 1;  // Default value of 1 for Quantity
    }
}
