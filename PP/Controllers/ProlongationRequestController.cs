using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PP.Models;
using PP.Models.Api;
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
        public async Task<ActionResult<List<ProlongRequest>>> GetProlongationRequest()
        {
            var list = await _context.ProlongationRequest.ToListAsync();
            List<ProlongRequest> prolongRequests = new List<ProlongRequest>();
            list.ForEach(x =>
            {
                var borrowing = _context.Borrowing.Select(a => a).Where(b => b.Id == x.BorrowingId).First();
                var bookName = _context.Book.Select(a => a).Where(b => b.Id == borrowing.BookId).First().Title;
                var userName = _context.User.Select(a => a).Where(b => b.Id == borrowing.UserId).First().UserName;
                prolongRequests.Add(new ProlongRequest
                {
                    BookName = bookName,
                    Id = x.Id,
                    UserName = userName,
                    CheckInDate = borrowing.CheckInDate.Value.ToString("dd/MM/yyyy"),
                    CheckoutDate = borrowing.CheckoutDate.Value.ToString("dd/MM/yyyy"),
                });
            });
            return prolongRequests;
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
        [Route("{id}")]
        public async Task<ActionResult<ProlongationRequest>> PostProlongationRequest(int id)
        {
            var temp = (await _context.ProlongationRequest.Select(a => a).Where(b => b.BorrowingId == id).ToListAsync());
            if (temp.Count > 0)
                return BadRequest();
            var borrowing = await _context.Borrowing.FindAsync(id);
            ProlongationRequest obj = new ProlongationRequest
            {
                Borrowing = borrowing,
                NewFinishDate = borrowing.CheckInDate.Value.AddMonths(1)
            };
            _context.ProlongationRequest.Add(obj);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProlongationRequest", new { id = obj.Id }, obj);
        }

        // DELETE: api/ProlongationRequest/5
        [HttpDelete("reject/{id}")]
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

        // DELETE: api/ProlongationRequest/5
        [HttpDelete("accept/{id}")]
        public async Task<IActionResult> AcceptProlongationRequest(int id)
        {
            var prolongationRequest = await _context.ProlongationRequest.FindAsync(id);
            if (prolongationRequest == null)
            {
                return NotFound();
            }
            var borrowing = await _context.Borrowing.FindAsync(prolongationRequest.BorrowingId);

            borrowing.CheckInDate = prolongationRequest.NewFinishDate;

            _context.Entry(borrowing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
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
