using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace EventManager.Domain.Dtos
{
    public class CreateReviewDto
    {
        [Required]
        public int LectureId { get; set; }

        [Required]
        public string Comment { get; set; }

        [Required]
        public string Nickname { get; set; }

        [Required]
        public int Rate { get; set; }

        [Required]
        public int ReviewerId { get; set; }

    }
}
