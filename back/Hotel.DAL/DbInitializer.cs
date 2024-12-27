using Hotel.DAL;
using Hotel.DAL.Models;

namespace Hotel.DAL
{
    public static class DbInitializer
    {
        public static void Initialize(HotelDbContext context)
        {
            context.Database.EnsureCreated(); 

            if (context.Rooms.Any() && context.Bookings.Any())
            {
                return;
            }

            var rooms = new[]
            {
                new Room { Category = "Single", PricePerNight = 100, IsAvailable = true },
                new Room { Category = "Double", PricePerNight = 150, IsAvailable = true },
                new Room { Category = "Suite", PricePerNight = 250, IsAvailable = true }
            };

            context.Rooms.AddRange(rooms);
            context.SaveChanges();
        }
    }
}
