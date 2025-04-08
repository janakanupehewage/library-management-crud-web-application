public class User
{
    public int Id { get; set; }

    // Required username property
    public required string Username { get; set; }

    public required string Email { get; set; }

    public required string Password { get; set; }
}
