using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAdministration.Models
{
    public class Customer
    {
        [Key]
        public string UserId { get; set; }
        [Required]
        [StringLength(10)]
        public string CardNumber { get; set; }
        [ForeignKey("UserId")]
        [Required]
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
    public class ApplicationUser : IdentityUser
    {
        
        public virtual Customer Customer { get; set; }
    }
}
