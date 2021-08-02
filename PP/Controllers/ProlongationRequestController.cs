using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PP.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProlongationRequestController : ControllerBase
    {
        private readonly MyContext _context;

        public ProlongationRequestController(MyContext context)
        {
            _context = context;
        }

        // GET: api/ProlongationRequest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProlongationRequest>>> GetProlongationRequest()
        {
            return await _context.ProlongationRequest.ToListAsync();
        }

        // GET: api/ProlongationRequest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProlongationRequest>> GetProlongationRequest(int id)
        {
            var prolongationRequest = await _context.ProlongationRequest.FindAsync(id);

            if (prolongationRequest == null)
            {
                return NotFound();
            }

            return prolongationRequest;
        }

        // PUT: api/ProlongationRequest/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProlongationRequest(int id, ProlongationRequest prolongationRequest)
        {
            if (id != prolongationRequest.Id)
            {
                return BadRequest();
            }

            _context.Entry(prolongationRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProlongationRequestExists(id))
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

        // POST: api/ProlongationRequest
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProlongationRequest>> PostProlongationRequest(ProlongationRequest prolongationRequest)
        {
            _context.ProlongationRequest.Add(prolongationRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProlongationRequest", new { id = prolongationRequest.Id }, prolongationRequest);
        }

        // DELETE: api/ProlongationRequest/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProlongationRequest(int id)
        {
            var prolongationRequest = await _context.ProlongationRequest.FindAsync(id);
            if (prolongationRequest == null)
            {
                return NotFound();
            }

            _context.ProlongationRequest.Remove(prolongationRequest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProlongationRequestExists(int id)
        {
            return _context.ProlongationRequest.Any(e => e.Id == id);
        }
    }
}
