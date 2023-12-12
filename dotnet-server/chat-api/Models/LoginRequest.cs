namespace ChatApi.Models;

using System.ComponentModel.DataAnnotations;

public class LoginRequest
{
    [Required]
    public string username { get; set; } = string.Empty;

    [Required]
    public string password { get; set; } = string.Empty;


}
