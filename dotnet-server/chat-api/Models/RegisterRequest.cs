namespace ChatApi.Models;

using System.ComponentModel.DataAnnotations;

public class RegisterRequest
{
    [Required]
    public string username { get; set; } = string.Empty;

    [Required]
    public string password { get; set; } = string.Empty;

    public string avatarImage { get; set; } = "https://www.dlf.pt/dfpng/maxpng/276-2761324_default-avatar-png.png";

}
