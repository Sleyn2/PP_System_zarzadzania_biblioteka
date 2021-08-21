using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

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
        public DbSet<LibInfo> LibraryInformation { get; set; }
        public DbSet<ProlongationRequest> ProlongationRequest { get; set; }

        public async Task CreateLibraryInfo()
        {
            var libInfo = await this.LibraryInformation.ToListAsync();
            if (libInfo.Count == 0)
            {
                this.LibraryInformation.Add(new LibInfo
                {
                    Name = "Miejska Biblioteka Publiczna w Gliwicach",
                    Adress = "Akademicka 112,",
                    Adress2 = "44-100 Gliwice",
                    EmailAdress = "library@gmail.com",
                    Phone = "12 34 567 89"
                });
                await this.SaveChangesAsync();
            }
        }
        public async Task CreateRoles(IServiceProvider serviceProvider)
        {
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var UserManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            string[] roleNames = { "Admin", "User", "Bibliotekarz" };
            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExist = await RoleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    //tworzenie roli
                    roleResult = await RoleManager.CreateAsync(new IdentityRole(roleName));
                }
                var powerUser = new ApplicationUser
                {
                    UserName = "admin",
                    Email = "admin@mail.com"
                };
                string userPWD = "admin";
                var _user = await UserManager.FindByEmailAsync("admin@mail.com");
                if (_user == null)
                {
                    var createPoweruser = await UserManager.CreateAsync(powerUser, userPWD);
                    if (createPoweruser.Succeeded)
                    {
                        await UserManager.AddToRoleAsync(powerUser, "Admin");
                    }
                }
            }
        }
    }
}
