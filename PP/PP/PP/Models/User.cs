using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PP.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string FirstName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string LastName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Email { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string PasswordHash { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string CardNumber { get; set; }

        //1 - admin, 2 - bibliotekarz, 3 - czytelnik 
        public int Role { get; set; }

        public ICollection<Borrowing> borrowings { get; set; }
    }
}
