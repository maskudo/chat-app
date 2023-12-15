using ChatApi.Helpers;
namespace ChatApi.Authorization;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;

    public JwtMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context, IJwtHelper jwtHelper)
    {
        if (context.Request.Headers.ContainsKey("Authorization"))
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var userId = jwtHelper.VerifyToken(token);
            if (userId != null)
            {
                context.Items["user"] = userId;
            }
        }
        await _next(context);
    }
}
