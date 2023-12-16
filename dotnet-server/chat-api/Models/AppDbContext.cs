
using Microsoft.EntityFrameworkCore;

namespace ChatApi.Models;

public class AppDbContext : DbContext
{
    public AppDbContext() {}
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }
    public DbSet<Message> Messages { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Message>().ToTable("messages");
            modelBuilder.Entity<Message>()
              .HasOne<User>().WithMany().HasForeignKey(m => m.sender);
            modelBuilder.Entity<Message>()
              .HasOne<User>().WithMany().HasForeignKey(m => m.receiver);
        }
}
