using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PP.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        
        //[ForeignKey("AuthorId")]
        public int AuthorId { get; set; }
        public Author Author { get; set; }
        
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Title { get; set; }
        [Required]
        public int Count { get; set; }

        public ICollection<Borrowing> borrowings { get; set; }
    }
}
