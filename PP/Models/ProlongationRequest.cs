using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PP.Models
{
    public class ProlongationRequest
    {
        [Key]
        public int Id { get; set; }

        //[ForeignKey("BorrowingId")]
        public int BorrowingId { get; set; }
        public Borrowing Borrowing { get; set; }

        [Column(TypeName = "Date")]
        [Required]
        public DateTime NewFinishDate { get; set; }
    }
}
