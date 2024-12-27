using Microsoft.EntityFrameworkCore;
using Hotel.DAL.Models; 

namespace Hotel.DAL.Repositories
{
    public interface IRoomRepository
    {
        Task<IEnumerable<Room>> GetAvailableRooms(DateTime startDate, DateTime endDate);
        Task AddRoom(Room room);
    }

    public class RoomRepository : IRoomRepository
    {
        private readonly HotelDbContext _context;

        public RoomRepository(HotelDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Room>> GetAvailableRooms(DateTime startDate, DateTime endDate)
        {
            return await _context.Rooms
                .Where(r => r.IsAvailable && 
                            !r.Bookings.Any(b => b.StartDate < endDate && b.EndDate > startDate))
                .ToListAsync();
        }

        public async Task AddRoom(Room room)
        {
            await _context.Rooms.AddAsync(room);
            await _context.SaveChangesAsync();
        }
    }
}
