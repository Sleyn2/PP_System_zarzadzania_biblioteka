using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAdministration.Models
{
    public class ProlongationRequest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int BorrowingId;
        [ForeignKey("BorrowingId")]
        public virtual Borrowing Borrowing { get; set; }
        public DateTime NewFinishDate { get; set; }
    }
}
