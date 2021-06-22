﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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
