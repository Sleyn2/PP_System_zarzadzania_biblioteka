using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PP.Models
{
    public class LibInfo
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Adress { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Adress2 { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string EmailAdress { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(12)")]
        public string Phone { get; set; }
    }
}
