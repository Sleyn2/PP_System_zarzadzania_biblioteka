using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace PP.Models
{
    public class MyContext : IdentityDbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {
        }
        public DbSet<Book> Book { get; set; }
        public DbSet<Author> Author { get; set; }
        public DbSet<Borrowing> Borrowing { get; set; }
        public DbSet<ApplicationUser> User { get; set; }
        public DbSet<ProlongationRequest> ProlongationRequest { get; set; }


    }
}
