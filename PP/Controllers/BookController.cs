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
	public class BookController : ControllerBase
	{
		private readonly MyContext _context;

		public BookController(MyContext context)
		{
			_context = context;
		}

		// GET: api/Book
		[HttpGet]
		public async Task<ActionResult<IEnumerable<BookWithAvaliable>>> GetBook()
		{
			var books = await _context.Book.ToListAsync();
			var obj = new List<BookWithAvaliable>();

			books.ForEach(book =>
			{
				obj.Add(new BookWithAvaliable
				{
					Id = book.Id,
					Title = book.Title,
					AuthorId = book.AuthorId,
					Count = book.Count,
					AvaliableCount = countCurrentNumber(book)
				});
			});
			return obj;
		}

	// GET: api/Book/title
	[HttpGet("t/{title}")]
	public async Task<ActionResult<IEnumerable<BookWithAvaliable>>> GetBook(string title)
	{
		var books = await _context.Book.Where(x => x.Title.Contains(title)).ToListAsync();
		var obj = new List<BookWithAvaliable>();

		books.ForEach(book =>
		{
			obj.Add(new BookWithAvaliable
			{
				Id = book.Id,
				Title = book.Title,
				AuthorId = book.AuthorId,
				Count = book.Count,
				AvaliableCount = countCurrentNumber(book)
			});
		});
		return obj;
	}

	// GET: api/Book/5
	[HttpGet("{id}")]
	public async Task<ActionResult<BookWithAvaliable>> GetBook(int id)
	{
		var book = await _context.Book.FindAsync(id);

		if (book == null)
		{
			return NotFound();
		}

		var obj = new BookWithAvaliable
		{
			Id = book.Id,
			Title = book.Title,
			AuthorId = book.AuthorId,
			Count = book.Count,
			AvaliableCount = countCurrentNumber(book)
		};

		return obj;
	}

	// PUT: api/Book/5
	// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
	[HttpPut("{id}")]
	public async Task<IActionResult> PutBook(int id, Book book)
	{
		if (id != book.Id)
		{
			return BadRequest();
		}

		var borrowingSum = _context.Borrowing
			.Select(a => a)
			.Where(b => b.BookId == book.Id && b.FinishDate == null)
			.Count();
		if (book.Count < borrowingSum)
		{
			return Conflict();
		}

		_context.Entry(book).State = EntityState.Modified;

		try
		{
			await _context.SaveChangesAsync();
		}
		catch (DbUpdateConcurrencyException)
		{
			if (!BookExists(id))
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

	// POST: api/Book
	// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
	[HttpPost]
	public async Task<ActionResult<Book>> PostBook(Book book)
	{
		if (_context.Book
			.Select(e => e)
			.Where(t => t.Title == book.Title)
			.Any())
			return BadRequest(new { message = "Książka z daną nazwą już istnieje" });
		_context.Book.Add(book);
		await _context.SaveChangesAsync();

		CreatedAtAction("GetBook", new { id = book.Id }, book);
		if (_context.Book
			.Select(e => e.Title)
			.Where(t => t == book.Title)
			.Any())
			return Ok();
		else
			return BadRequest(new { message = "Nie udało się dodać książki" });
	}

	// DELETE: api/Book/5
	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteBook(int id)
	{
		var book = await _context.Book.FindAsync(id);
		if (book == null)
		{
			return NotFound();
		}
		//TODO: SLeyn
		//Kaskadowe usuwanie borrowings
		_context.Book.Remove(book);
		await _context.SaveChangesAsync();

		return NoContent();
	}

	private int countCurrentNumber(Book book)
	{
		return book.Count - this._context.Borrowing
			.Select(a => a)
			.Where(b => b.Book == book && b.FinishDate == null)
			.Count();
	}

	private bool BookExists(int id)
	{
		return _context.Book.Any(e => e.Id == id);
	}
}
}
