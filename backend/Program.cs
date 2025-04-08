using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Register the DbContext with SQL Server
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Configure JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var secretKey = builder.Configuration["Jwt:Secret"];

        // Check if the secretKey is null or empty
        if (string.IsNullOrEmpty(secretKey))
        {
            throw new InvalidOperationException("JWT Secret key is not configured.");
        }

        var key = Encoding.ASCII.GetBytes(secretKey);

        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

// Add CORS policy to allow frontend access
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins("http://localhost:5173")  // Frontend URL
              .AllowAnyMethod()                     // Allow any HTTP method (GET, POST, etc.)
              .AllowAnyHeader()                     // Allow any headers
              .AllowCredentials();                  // Allow credentials (cookies, etc.)
    });
});

// Swagger setup for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Use authentication middleware
app.UseAuthentication();

// Use CORS middleware
app.UseCors("AllowLocalhost");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use authorization middleware
app.UseAuthorization();

app.MapControllers();

app.Run();
