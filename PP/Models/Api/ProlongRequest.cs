namespace PP.Models.Api
{
    public class ProlongRequest
    {
        public int Id { get; set; }

        public string BookName { get; set; }
        public string UserName { get; set; }
        public string? CheckoutDate { get; set; }
        public string? CheckInDate { get; set; }
    }
}
