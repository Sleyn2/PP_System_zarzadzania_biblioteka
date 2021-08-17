using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PP.Models;
using System.Threading.Tasks;

namespace PP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibInfoController : ControllerBase
    {
        private readonly MyContext _context;

        public LibInfoController(MyContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<LibInfo>> GetInfo()
        {
            var list = await _context.libInfos.ToListAsync();
            return list[0];
        }
    }
}
