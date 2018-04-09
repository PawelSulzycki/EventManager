using System;
using System.Collections.Generic;
using System.Text;


namespace EventManager.Domain.Dtos
{

    public class LectureUserDto
    {
        public int Id { get; set; }

        public int LectureId { get; set; }

        public virtual LectureDto LectureDto { get; set; }

        public int UserId { get; set; }
    }
}

