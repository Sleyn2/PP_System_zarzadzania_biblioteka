using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PP.Enums;
using PP.Models;
using PP.Models.Api;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowingController : ControllerBase
    {
        private readonly MyContext _context;
        private UserManager<ApplicationUser> _userManager;

        public BorrowingController(MyContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Borrowing/canBorrow
        [HttpGet("canBorrow/{bookId}")]
        public async Task<ActionResult> CanBorrow(int bookId)
        {
            var userId = User.Claims.First(u => u.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var book = _context.Book
                .Select(a => a)
                .Where(b => b.Id == bookId)
                .First();

            if (_context.Borrowing
                .Select(x => x)
                .Where(y => (y.Book == book && y.User == user)
                && y.FinishDate == null)
                .Any())
                return BadRequest();
            else return Ok();
        }

        // GET: api/Borrowing/all
        [HttpGet("all")]
        public async Task<ActionResult<List<BorrowingBook>>> GetAllBorrowings()
        {
            var data = await _context.Borrowing
                .Select(a => a)
                .Where(b => b.FinishDate != null)
                .ToListAsync();
            var map = new List<BorrowingBook>();
            data.ForEach(item =>
            {
                var bookName = _context.Book.Select(a => a).Where(b => b.Id == item.BookId).First().Title;
                var userName = _context.User.Select(a => a).Where(b => b.Id == item.UserId).First().UserName;
                map.Add(new BorrowingBook
                {
                    Id = item.Id,
                    BookName = bookName,
                    UserName = userName,
                    Status = ((BorrowingStatus)item.Status).ToString(),
                    CheckInDate = item.CheckInDate.HasValue ? item.CheckInDate.Value.ToString("dd/MM/yyyy") : null,
                    CheckoutDate = item.CheckoutDate.HasValue ? item.CheckoutDate.Value.ToString("dd/MM/yyyy") : null,
                    FinishDate = item.FinishDate.HasValue ? item.FinishDate.Value.ToString("dd/MM/yyyy") : null
                });
            });
            return map;
        }

        // GET: api/Borrowing/all
        [HttpGet("allPrivate")]
        public async Task<ActionResult<List<BorrowingBook>>> GetAllPrivateBorrowings()
        {
            var userId = User.Claims.First(u => u.Type == "UserID").Value;
            var data = await _context.Borrowing
                .Select(a => a)
                .Where(b => b.UserId == userId)
                .ToListAsync();
            var map = new List<BorrowingBook>();
            data.ForEach(item =>
            {
                var bookName = _context.Book.Select(a => a).Where(b => b.Id == item.BookId).First().Title;
                var userName = _context.User.Select(a => a).Where(b => b.Id == userId).First().UserName;
                map.Add(new BorrowingBook
                {
                    Id = item.Id,
                    BookName = bookName,
                    UserName = userName,
                    Status = ((BorrowingStatus)item.Status).ToString(),
                    CheckInDate = item.CheckInDate.HasValue ? item.CheckInDate.Value.ToString("dd/MM/yyyy") : null,
                    CheckoutDate = item.CheckoutDate.HasValue ? item.CheckoutDate.Value.ToString("dd/MM/yyyy") : null,
                    FinishDate = item.FinishDate.HasValue ? item.FinishDate.Value.ToString("dd/MM/yyyy") : null
                });
            });
            return map;
        }

        // GET: api/Borrowing/ongoing
        [HttpGet("ongoing")]
        public async Task<ActionResult<List<BorrowingBook>>> GetOngoingBorrowings()
        {
            var data = await _context.Borrowing
                .Select(a => a)
                .Where(b => b.FinishDate == null && b.Status == 1)
                .ToListAsync();
            var map = new List<BorrowingBook>();
            data.ForEach(item =>
            {
                var bookName = _context.Book.Select(a => a).Where(b => b.Id == item.BookId).First().Title;
                var userName = _context.User.Select(a => a).Where(b => b.Id == item.UserId).First().UserName;
                map.Add(new BorrowingBook
                {
                    Id = item.Id,
                    BookName = bookName,
                    UserName = userName,
                    Status = ((BorrowingStatus)item.Status).ToString(),
                    CheckInDate = item.CheckInDate.HasValue ? item.CheckInDate.Value.ToString("dd/MM/yyyy") : null,
                    CheckoutDate = item.CheckoutDate.HasValue ? item.CheckoutDate.Value.ToString("dd/MM/yyyy") : null,
                    FinishDate = item.FinishDate.HasValue ? item.FinishDate.Value.ToString("dd/MM/yyyy") : null
                });
            });
            return map;
        }

        // GET: api/Borrowing/reserved
        [HttpGet("reserved")]
        public async Task<ActionResult<List<BorrowingBook>>> GetReservedBorrowings()
        {
            var data = await _context.Borrowing
                .Select(a => a)
                .Where(b => b.FinishDate == null && b.Status == 2)
                .ToListAsync();
            var map = new List<BorrowingBook>();
            data.ForEach(item =>
            {
                var bookName = _context.Book.Select(a => a).Where(b => b.Id == item.BookId).First().Title;
                var userName = _context.User.Select(a => a).Where(b => b.Id == item.UserId).First().UserName;
                map.Add(new BorrowingBook
                {
                    Id = item.Id,
                    BookName = bookName,
                    UserName = userName,
                    Status = ((BorrowingStatus)item.Status).ToString(),
                    CheckInDate = item.CheckInDate.HasValue ? item.CheckInDate.Value.ToString("dd/MM/yyyy") : null,
                    CheckoutDate = item.CheckoutDate.HasValue ? item.CheckoutDate.Value.ToString("dd/MM/yyyy") : null,
                    FinishDate = item.FinishDate.HasValue ? item.FinishDate.Value.ToString("dd/MM/yyyy") : null
                });
            });
            return map;
        }

        // GET: api/Borrowing/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Borrowing>> GetBorrowing(int id)
        {
            var borrowing = await _context.Borrowing.FindAsync(id);

            if (borrowing == null)
            {
                return NotFound();
            }

            return borrowing;
        }

        // PUT: api/Borrowing/checkin/5
        [HttpPut("checkin/{id}")]
        public async Task<IActionResult> EditBorrowing(int id)
        {

            var obj = _context.Borrowing.Select(x => x).Where(b => b.Id == id).First();
            obj.Status = 3;
            obj.FinishDate = System.DateTime.Now;

            _context.Entry(obj).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BorrowingExists(id)) return NotFound();
                else throw;
            }
            return NoContent();
        }
        // PUT: api/Borrowing/checkout/5
        [HttpPut("checkout/{id}")]
        public async Task<IActionResult> BorrowBook(int id)
        {
            var obj = _context.Borrowing.Select(x => x).Where(b => b.Id == id).First();
            obj.Status = 1;
            obj.CheckoutDate = System.DateTime.Now;
            obj.CheckInDate = System.DateTime.Now.AddMonths(1);

            _context.Entry(obj).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BorrowingExists(id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        // POST: api/Borrowing
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{bookId}")]
        public async Task<ActionResult<Borrowing>> PostBorrowing(int bookId)
        {
            var userId = User.Claims.First(u => u.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var book = _context.Book.Select(a => a).Where(b => b.Id == bookId).First();

            var borrowing = new Borrowing();
            //przypisanie kluczy obcych
            borrowing.User = user;
            borrowing.Book = book;
            borrowing.FinishDate = null;
            borrowing.CheckInDate = null;
            borrowing.CheckoutDate = null;
            borrowing.Status = 2;

            _context.Borrowing.Add(borrowing);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetBorrowing", new { id = borrowing.Id }, borrowing);
        }

        // DELETE: api/Borrowing/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBorrowing(int id)
        {
            var obj = _context.Borrowing.Select(x => x).Where(b => b.Id == id).First();
            obj.FinishDate = System.DateTime.Now;
            if (obj.Status == 1) obj.Status = 3;

            _context.Entry(obj).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BorrowingExists(id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        private bool BorrowingExists(int id)
        {
            return _context.Borrowing.Any(e => e.Id == id);
        }
    }
}
