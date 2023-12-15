namespace ChatApi.Models;


public record LoginResponse(User user, string token);
