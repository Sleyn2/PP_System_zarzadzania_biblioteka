using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PP.Models;
using System;
using System.Threading.Tasks;

namespace PP
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            IHost webHost = CreateHostBuilder(args).Build();
            using (var scope = webHost.Services.CreateScope())
            {
                var myDbContext = scope.ServiceProvider.GetRequiredService<MyContext>();
                await myDbContext.Database.MigrateAsync();
                await myDbContext.CreateRoles(scope.ServiceProvider.GetRequiredService<IServiceProvider>());
                await myDbContext.CreateLibraryInfo();
            }
            await webHost.RunAsync();
        }


        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
