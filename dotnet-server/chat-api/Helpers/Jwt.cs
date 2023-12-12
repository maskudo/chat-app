using ChatApi.Models;
using Microsoft.Extensions.Options;

namespace ChatApi.Helpers;

public interface IJwtHelper
{
  public string GenerateToken(User user);
  public bool VerifyToken(string token);
}
public class JwtHelper: IJwtHelper
{
    private readonly AppSettings _appsettings;
    public JwtHelper(IOptions<AppSettings> configuration)
    {
        _appsettings = configuration.Value;
        Console.WriteLine(_appsettings.Secret);
    }

    public string GenerateToken(User user)
    {
        return "Token";
    }
    public bool VerifyToken(string token)
    {
        return true;
    }
}
