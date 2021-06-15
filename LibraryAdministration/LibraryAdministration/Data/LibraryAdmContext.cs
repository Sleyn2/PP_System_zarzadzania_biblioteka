using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using LibraryAdministration.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using DbContext = System.Data.Entity.DbContext;

namespace LibraryAdministration.Context
{
    public class LibraryAdmContext: DbContext
    { 
        public System.Data.Entity.DbSet<Book> Book { get; set; }
        public System.Data.Entity.DbSet<Author> Author { get; set; }
        public System.Data.Entity.DbSet<Borrowing> Borrowing { get; set; }
        public System.Data.Entity.DbSet<Customer> Customer { get; set; }
        public System.Data.Entity.DbSet<ProlongationRequest> ProlongationRequests { get; set; }

        public LibraryAdmContext(DbContextOptions<LibraryAdmContext> options) :base(options)
        {
        }
       /* protected internal virtual void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("DefaultConnection");
        }*/

        //public LibraryAdmContext(DbContextOptions<LibraryAdmContext> options) : base(options) { }

    }
}
