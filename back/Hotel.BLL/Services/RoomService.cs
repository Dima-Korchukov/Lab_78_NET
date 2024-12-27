using Hotel.DAL;
using Hotel.DAL.Models;
using Hotel.DAL.Repositories;

namespace Hotel.BLL.Services
{
    public class RoomService
    {
        private readonly IRoomRepository _roomRepository;

        public RoomService(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }

        public async Task<IEnumerable<Room>> GetAvailableRooms(DateTime startDate, DateTime endDate)
        {
            return await _roomRepository.GetAvailableRooms(startDate, endDate);
        }

        public async Task AddRoom(Room room)
        {
            await _roomRepository.AddRoom(room);
        }
    }
}
