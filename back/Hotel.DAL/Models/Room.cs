namespace Hotel.DAL.Models
{
    public class Room
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public decimal PricePerNight { get; set; }
        public bool IsAvailable { get; set; }
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
