using System.Text.Json.Serialization;

namespace ChatApi.Models
{
    public class User
    {
        public User(Guid id, string username, string passwordHash, string avatarImage)
        {
            this.username = username;
            this.passwordHash = passwordHash;
            this.avatarImage = avatarImage;
            this.id = id;
        }
        public Guid id { get; set; }
        public string username { get; set; } = string.Empty;
        public string avatarImage { get; set; } = "https://www.dlf.pt/dfpng/maxpng/276-2761324_default-avatar-png.png";

        [JsonIgnore]
        public string passwordHash { get; set; } = string.Empty;
    }
}
