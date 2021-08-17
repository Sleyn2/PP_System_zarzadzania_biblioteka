using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace PP.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
        //1 - admin, 2 - bibliotekarz, 3 - czytelnik 
        public int Role { get; set; }

        public ICollection<Borrowing> borrowings { get; set; }
    }
}
