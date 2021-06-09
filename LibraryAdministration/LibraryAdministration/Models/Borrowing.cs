using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace LibraryAdministration.Models
{
    public class Borrowing
    {
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int BookId { get; set; }
        [ForeignKey("BookId")]
        public virtual Book Book { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual Customer Customer { get; set; }
        public DateTime CheckoutDate { get; set; }
        public DateTime FinishDate { get; set; }
    }
}
