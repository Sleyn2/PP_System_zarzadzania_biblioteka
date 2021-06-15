using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PP.Models
{
    public class Author
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string FirstName { get; set; }
        
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string LastName { get; set; }

        public ICollection<Book> books { get; set; }
    }
}
