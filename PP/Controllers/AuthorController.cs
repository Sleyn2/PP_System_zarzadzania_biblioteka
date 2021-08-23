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
	public class AuthorController : ControllerBase
	{
		private readonly MyContext _context;

		public AuthorController(MyContext context)
		{
			_context = context;
		}

		// GET: api/Author
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Author>>> GetAuthor()
		{
			return await _context.Author.ToListAsync();
		}

		// GET: api/Author/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Author>> GetAuthor(int id)
		{
			var author = await _context.Author.FindAsync(id);

			if (author == null)
			{
				return NotFound();
			}

			return author;
		}
		// GET: api/Author/{name}
		[HttpGet("find/{firstName}/{lastName}")]
		public async Task<ActionResult<bool>> GetAuthor(string firstName, string lastName)
		{
			var author = await _context.Author.ToListAsync();

			if (author == null)
			{
				return false;
			}
			if (author.Where(x => x.FirstName == firstName && x.LastName == lastName).ElementAt(0) != null)
				return true;
			return false;
		}

		// PUT: api/Author/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutAuthor(int id, Author author)
		{
			if (id != author.Id)
			{
				return BadRequest();
			}

			_context.Entry(author).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!AuthorExists(id))
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

		// POST: api/Author
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<Author>> PostAuthor(Author author)
		{
			_context.Author.Add(author);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetAuthor", new { id = author.Id }, author);
		}

		// DELETE: api/Author/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteAuthor(int id)
		{
			var author = await _context.Author.FindAsync(id);
			if (author == null)
			{
				return NotFound();
			}

			_context.Author.Remove(author);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private bool AuthorExists(int id)
		{
			return _context.Author.Any(e => e.Id == id);
		}
	}
}
