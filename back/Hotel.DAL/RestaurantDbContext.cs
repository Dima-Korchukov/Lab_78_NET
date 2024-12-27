using Microsoft.EntityFrameworkCore;
using Hotel.DAL.Models;

namespace Hotel.DAL
{
    public class HotelDbContext : DbContext
    {
        public HotelDbContext(DbContextOptions<HotelDbContext> options)
            : base(options)
        {
        }

        public DbSet<Room> Rooms { get; set; }
        public DbSet<Booking> Bookings { get; set; }

       
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
       {
            modelBuilder.Entity<Room>()
                .HasKey(r => r.Id); 

            modelBuilder.Entity<Room>()
                .Property(r => r.Category)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<Room>()
                .Property(r => r.PricePerNight)
                .IsRequired();

            modelBuilder.Entity<Booking>()
                .HasKey(b => b.Id); 

            modelBuilder.Entity<Booking>()
                .Property(b => b.CustomerName)
                .IsRequired()
                .HasMaxLength(100); 

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Room) 
                .WithMany(r => r.Bookings) 
                .HasForeignKey(b => b.RoomId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
