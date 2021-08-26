using PP.Enums;
using System;

namespace PP.Models.Api
{
    public class BorrowingBook
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public string BookName { get; set; }
        public string UserName { get; set; }
        public DateTime? CheckoutDate { get; set; }
        public DateTime? CheckInDate { get; set; }
    }
}
