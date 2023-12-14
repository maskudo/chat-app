namespace ChatApi.Authorization;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;

    public JwtMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        if (context.Request.Headers.ContainsKey("Authorization"))
        {
          // some validation 
          Console.WriteLine("has Authorization header");
          context.Items["user"] = "user";
        }
        await _next(context);
    }
}
