using EventManager.Domain.Dtos;
using EventManager.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventManager.Api.Controllers
{
    [Route("api/[controller]")]
    public class ReviewController : Controller
    {
        private readonly ReviewService _reviewService;

        public ReviewController()
        {
            _reviewService = new ReviewService();
        }

        //[HttpGet]
        //[Route("Reviews")]
        [HttpGet, Route("Reviews")]
        public IActionResult GetAllReviews()
        {
            return Ok(_reviewService.GetAll());
        }

        [HttpPost]
        [Route("CreateReview")]
        public IActionResult CreateReview([FromBody] CreateReviewDto createReviewDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_reviewService.CreateReview(createReviewDto));
        }
    }
}
