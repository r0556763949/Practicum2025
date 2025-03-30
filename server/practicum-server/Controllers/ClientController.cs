using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI;
using Practicum.Core.DTOs;
using Practicum.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace practicum_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ClientService _clientService;
        public ClientController(ClientService clientService)
        {
            _clientService = clientService;
        }
        //GET: api/<ClientController>
        [HttpGet]
        public ActionResult<IEnumerable<ClientDto>> GetAllClients()
        {
            var clients = _clientService.GetAllClients();
            return Ok(clients);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClientDto>> Get(int id)
        {
            var client = await _clientService.GetClientByIdAsync(id);
            if (client == null)
            {
                return NotFound();
            }
            return Ok(client);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ClientDto clientDto)
        {
            if (clientDto == null)
            {
                return BadRequest("Client data is null.");
            }

            await _clientService.CreateClientAsync(clientDto);
            return Ok();
        }


        // PUT api/<ClientController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{clientId}")]
        public async Task<IActionResult> Delete(int clientId)
        {
            try
            {
                // קריאה לשירות כדי למחוק את הלקוח
                await _clientService.DeleteClientAsync(clientId);

                // החזרת תשובה עם מצב 204 No Content
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Client with ID {clientId} not found.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
