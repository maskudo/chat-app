
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChatApi.Models;
using ChatApi.Authorization;

namespace chat_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly MessageContext _context;

        public MessageController(MessageContext context)
        {
            _context = context;
        }

        // GET: api/Message
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
        {
            return await _context.Messages.ToListAsync();
        }

        // GET: api/Message/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessage(Guid id)
        {
            var message = await _context.Messages.FindAsync(id);

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }

        [HttpGet("{sender}/{receiver}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessageBySenderReceiver(Guid sender, Guid receiver)
        {
            var msg = await _context.Messages.Where(msg => msg.sender == sender && msg.receiver == receiver).ToListAsync();
            return msg;
        }

        // POST: api/Message
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Message>> PostMessage(MessageRequest message)
        {
            Console.Write("messge" + message.ToString());
            var msg = new Message(Guid.NewGuid(), message.text, message.sender, message.receiver);
            _context.Messages.Add(msg);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetMessage", new { id = msg.id }, msg);
        }

        private bool MessageExists(Guid id)
        {
            return _context.Messages.Any(e => e.id == id);
        }
    }
}
