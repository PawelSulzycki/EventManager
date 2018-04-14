﻿using AutoMapper;
using EventManager.Api.ViewModels;
using EventManager.Domain.Dtos;
using EventManager.Domain.IServices;
using Microsoft.AspNetCore.Mvc;

namespace EventManager.Api.Controllers
{
    [Route("api/lecture")]
    public class LectureController : Controller
    {
        private readonly ILectureService _lectureService;
        private readonly IMapper _iMapper;

        public LectureController(ILectureService lectureService, IMapper iMapper)
        {
            _lectureService = lectureService;
            _iMapper = iMapper;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = _lectureService.GetAll();
            var lectureViewModel = _iMapper.Map<LectureViewModel>(result);

            return Ok(lectureViewModel);
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            var result = _lectureService.GetOne(id);

            if (result == null)
                return BadRequest();

            var lectureViewModel = _iMapper.Map<LectureViewModel>(result);

            return Ok(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody] CreateLectureViewModel createLectureViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var lectureDto = _iMapper.Map<LectureDto>(createLectureViewModel);
            var result = _lectureService.AddLecture(lectureDto);

            createLectureViewModel = _iMapper.Map<CreateLectureViewModel>(result);

            return Ok(createLectureViewModel);
        }

        [HttpPut]
        public IActionResult Put([FromBody] UpdateLectureViewModel updateLectureViewModel)
        {
            if (updateLectureViewModel.Id == 0 || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var lectureDto = _iMapper.Map<LectureDto>(updateLectureViewModel);

            var result = _lectureService.UpdateLecture(lectureDto);
            updateLectureViewModel = _iMapper.Map<UpdateLectureViewModel>(result);

            return Ok(updateLectureViewModel);
        }

        [HttpDelete] 
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _lectureService.Delete(id);

            if (!result)
                return BadRequest();

            return Ok();
        }
    }
}