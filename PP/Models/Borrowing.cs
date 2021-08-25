using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PP.Models
{
    public class Borrowing
    {
        [Key]
        public int Id { get; set; }

        //[ForeignKey("BookId")]
        public int BookId { get; set; }

        public Book Book { get; set; }

        //[ForeignKey("UserId")]
        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        //Status: 1 - wypożyczona, 2 - zarezerwowana, 3 - zakończone wypożyczenie/rezerwacja
        public int Status { get; set; }

        //Data wypożyczenia
        [Column(TypeName = "Date")]
        public DateTime? CheckoutDate { get; set; }

        //Data zakończenia
        [Column(TypeName = "Date")]
        public DateTime? FinishDate { get; set; }

        //Data zwrócenia książki
        [Column(TypeName = "Date")]
        public DateTime? CheckInDate { get; set; }

        public ICollection<ProlongationRequest> prolongationRequests { get; set; }
    }
}
