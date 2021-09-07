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
        public string? CheckoutDate { get; set; }
        public string? CheckInDate { get; set; }
        public string? FinishDate { get; set; }
    }
}
