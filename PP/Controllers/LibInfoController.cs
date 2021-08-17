using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PP.Models;
using System.Linq;
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

        [HttpPut]
        public async Task<ActionResult<LibInfo>> PostInfo(LibInfo newInfo)
        {
            var oldInfo = await _context.libInfos.ToListAsync();
            if (newInfo.Id != oldInfo[0].Id)
            {
                return BadRequest();
            }

            _context.libInfos.Remove(oldInfo[0]);
            _context.Entry(newInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InfoExists(newInfo.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        private bool InfoExists(int id)
        {
            return _context.libInfos.Any(e => e.Id == id);
        }
    }
}
