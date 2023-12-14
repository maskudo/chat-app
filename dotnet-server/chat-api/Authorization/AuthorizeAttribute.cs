namespace ChatApi.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
public class AuthorizeAttribute: Attribute , IAuthorizationFilter
{
  public void OnAuthorization (AuthorizationFilterContext context) 
  {
    var allowAnonymous  = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
    if (allowAnonymous) 
    {
      return;
    }
    //authorization check
    var user = context.HttpContext.Items["user"];
    if (user == null) {
      context.Result = new JsonResult(new  {message = "Unauthorized"}) {StatusCode = StatusCodes.Status401Unauthorized};
    }
  }
}
