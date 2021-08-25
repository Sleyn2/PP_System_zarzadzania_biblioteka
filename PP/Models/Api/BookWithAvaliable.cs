using System.Collections.Generic;

namespace PP.Models.Api
{
    public class BookWithAvaliable
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public string Title { get; set; }
        public int Count { get; set; }
        public int AvaliableCount { get; set; }
    }
}
