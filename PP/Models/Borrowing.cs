using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PP.Models
{
    public class Borrowing
    {
        [Key]
        public int Id { get; set; }

        
        public int BookId { get; set; }
        //[ForeignKey("BookId")]
        public Book Book { get; set; }

        //[ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        //Status: 1 - ongoing, 2 - reserved, 3 - finished
        public int Status { get; set; }

        [Column(TypeName= "Date")]
        public DateTime CheckoutDate { get; set; }

        [Column(TypeName = "Date")]
        public DateTime FinishDate { get; set; }

        [Column(TypeName = "Date")]
        public DateTime CheckInDate { get; set; }

        public ICollection<ProlongationRequest> prolongationRequests { get; set; }
    }
}
