namespace backend.Models
{
    public class Fine
    {
        public int FineId { get; set; }
        public int IssueId { get; set; }
        public decimal FineAmount { get; set; }
    }
}
