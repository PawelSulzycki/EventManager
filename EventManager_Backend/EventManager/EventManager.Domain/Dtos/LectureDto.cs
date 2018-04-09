using System;
using System.Collections.Generic;
using System.Text;

namespace EventManager.Domain.Dtos
{
    public class LectureDto
    {

        public LectureDto()
        {
            LectureUsers = new List<LectureUserDto>();
            Reviews = new List<ReviewDto>();
        }

        public int Id { get; set; }

        public string Description { get; set; }

        public string Name { get; set; }

        public int EventId { get; set; }

        public int ParticipantNumber { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public List<LectureUserDto> LectureUsers { get; set; }

        public List<ReviewDto> Reviews { get; set; }
    }
}