using Microsoft.AspNetCore.Mvc;
using Hotel.BLL.Services;
using Hotel.DAL.Models;

namespace Hotel.PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        private readonly RoomService _roomService;

        public RoomController(RoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet("available")]
        public async Task<IActionResult> GetAvailableRooms(DateTime startDate, DateTime endDate)
        {
            var rooms = await _roomService.GetAvailableRooms(startDate, endDate);
            return Ok(rooms);
        }

        [HttpPost]
        public async Task<IActionResult> AddRoom([FromBody] Room room)
        {
            await _roomService.AddRoom(room);
            return CreatedAtAction(nameof(AddRoom), room);
        }
    }
}
