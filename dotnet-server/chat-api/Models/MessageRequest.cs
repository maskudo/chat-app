

namespace ChatApi.Models
{
    public class MessageRequest
    {
        public string text { get; set; } = string.Empty;
        public Guid sender {get; set;}
        public Guid receiver {get; set;}
    }
}
