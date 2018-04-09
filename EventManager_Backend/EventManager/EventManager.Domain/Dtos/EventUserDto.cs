using System;
using System.Collections.Generic;
using System.Text;

namespace EventManager.Domain.Dtos
{
    public class EventUserDto
    {
        public int Id { get; set; }

        public int EventId { get; set; }

        public virtual EventDto EventDto { get; set; }

        public int UserId { get; set; }
    }
}
