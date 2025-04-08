using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<IssueRecord> IssueRecords { get; set; }
        public DbSet<Fine> Fines { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Define the primary key for IssueRecord
            modelBuilder.Entity<IssueRecord>()
                .HasKey(ir => ir.IssueId);

            // You can add more configurations here if necessary
        }
    }
}
