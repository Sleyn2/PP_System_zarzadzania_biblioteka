using LibraryAdministration.Data;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Entity;
using LibraryAdministration.Models;

namespace LibraryAdministration
{
    public class Program
    {
        public static IHostBuilder CreateHostBuilder(string[] args) =>
           Host.CreateDefaultBuilder(args)
               .ConfigureWebHostDefaults(webBuilder =>
               {
                   webBuilder.UseStartup<Startup>();
               });

        public static void Main(string[] args)
        {
            using LibraryAdmContext context = new LibraryAdmContext();

            Author autor = new Author()
            {
                FirstName = "imie",
                LastName = "nazwisko"
            };
            context.Author.Add(autor);
            context.SaveChanges();

            CreateHostBuilder(args).Build().Run();
            
        }

       
    }
}
