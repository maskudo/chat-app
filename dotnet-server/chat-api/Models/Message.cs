namespace ChatApi.Models
{
    public class Message
    {
        public Message(Guid id, string text, Guid sender, Guid receiver)
        {
            this.text = text;
            this.sender = sender;
            this.receiver = receiver;
            this.id = id;
            this.created_at = DateTime.UtcNow;
        }
        public Guid id { get; set; }
        public string text { get; set; } = string.Empty;
        public DateTime created_at { get; set; } = DateTime.UtcNow;

        public Guid sender { get; set; }
        public Guid receiver { get; set; }
    }
}
