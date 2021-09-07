using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PP.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _singInManager;
        private readonly ApplicationSettings _appSettings;

        public ApplicationUserController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager, IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _singInManager = signInManager;
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        public IEnumerable<ApplicationUser> GetAllUsers()
        {
            return _userManager.Users.AsEnumerable();
        }

        [HttpGet("r/{role}")]
        public IEnumerable<ApplicationUser> GetAllUsersWithRole(string role)
        {
            return _userManager.GetUsersInRoleAsync(role).Result.AsEnumerable();
        }

        // GET: api/ApplicationUser/s/name
        [HttpGet("r/{role}/s/{name}")]
        public async Task<IEnumerable<ApplicationUser>> GetUsersWithNameAndRoleAsync(string name, string role)
        {
            var unfiltered = await _userManager.GetUsersInRoleAsync(role);
            return unfiltered.Select(a => a).Where(b => b.UserName.Contains(name) || (b.FullName != null ? b.FullName.Contains(name) : false)).ToList();
        }

        // GET: api/ApplicationUser/
        [HttpGet("{id}")]
        public async Task<Object> FindUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return null;
            }

            return new
            {
                user.FullName,
                user.Id
            };
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> UpdateUser(string id, ApplicationUserModel model)
        {
            var user = (await _userManager.FindByIdAsync(id));
            if (user != null)
            {
                //Nie ustawiono
                user.FullName = model.FullName;
            }

            try
            {
                _userManager.UpdateAsync(user).Wait();
                return Ok();
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> PostApplicationUser(ApplicationUserModel model)
        {
            //Domyślna rola użytkownika
            model.Role = "User";
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName
            };
            try
            {
                //Tworzenie użytkownika
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                //Dodawanie roli user
                await _userManager.AddToRoleAsync(applicationUser, model.Role);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPut]
        [Route("Update")]
        //PUT : /api/ApplicationUser/Update
        public async Task<Object> updateUser(ApplicationUserModel model)
        {
            // tu leci update usera
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var userToChange = await _userManager.FindByIdAsync(userId);
            userToChange.Email = model.Email;
            userToChange.UserName = model.UserName;
            userToChange.FullName = model.FullName;

            try
            {
                //update użytkownika
                if (model.Password == "")
                {
                    var result = await _userManager.UpdateAsync(userToChange);
                    return Ok(result);
                }
                else
                {
                    await _userManager.UpdateAsync(userToChange);
                    string code = await _userManager.GeneratePasswordResetTokenAsync(userToChange);
                    var result = await _userManager.ResetPasswordAsync(userToChange, code, model.Password);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("Register/{role}")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> PostApplicationUserWithRole(int role, ApplicationUserModel model)
        {
            if (role == 1)
                model.Role = "Admin";
            else if (role == 2)
                model.Role = "Bibliotekarz";
            else if (role == 3)
                model.Role = "User";
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName
            };
            try
            {
                //Tworzenie użytkownika
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                //Dodawanie roli user
                await _userManager.AddToRoleAsync(applicationUser, model.Role);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/ApplicationUser/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                //pobranie roli użytkownika
                var role = await _userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(10),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)),
                    SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Niepoprawna nazwa użytkownika lub hasło." });
        }

        // GET: api/ApplicationUser/Detail
        [HttpGet("Detail/{id}")]
        public async Task<Object> GetUserDetail(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return null;
            }

            return new
            {
                user.FullName,
                user.Id,
                user.Email,
                user.UserName,
                user.Role
            };
        }
    }
}
