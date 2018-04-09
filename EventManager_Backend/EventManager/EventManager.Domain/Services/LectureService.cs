using EventManager.Domain.Dtos;
using EventManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EventManager.Domain.Services
{
    public class LectureService
    {
        private readonly EventManagerContext _context;

        public LectureService()
        {
            _context = new EventManagerContext();
        }

        public LectureDto AddLecture(AddLectureDto addLectureDto)
        {
            if (!_context.Events.Any(x => x.Id == addLectureDto.EventId))
                return null;

            var lecture = new Lecture()
            {
                EventId = addLectureDto.EventId,
                Description = addLectureDto.Description,
                Name = addLectureDto.Name,
                ParticipantNumber = addLectureDto.ParticipantNumber,
                StartDate = addLectureDto.StartDate,
                EndDate = addLectureDto.EndDate
            };

            _context.Lectures.Add(lecture);
            _context.SaveChanges();

            var lectureDto = new LectureDto()
            {
                Id = lecture.Id,
                EventId = lecture.EventId,
                Description = lecture.Description,
                Name = lecture.Name,
                ParticipantNumber = lecture.ParticipantNumber,
                StartDate = lecture.StartDate,
                EndDate = lecture.EndDate
            };
            return lectureDto;
        }

        public List<LectureDto> GetAll()
        {
            var lectures = _context.Lectures.Select(x => x);

            List<LectureDto> lectureDtosList = new List<LectureDto>();

            foreach (var item in lectures)
            {
                lectureDtosList.Add(new LectureDto()
                {
                    Id = item.Id,
                    EventId = item.EventId,
                    Description = item.Description,
                    Name = item.Name,
                    ParticipantNumber = item.ParticipantNumber,
                    StartDate = item.StartDate,
                    EndDate = item.EndDate
                });
            }
            return lectureDtosList;
        }

        public LectureDto UpdateLecture(UpdateLectureDto updateLectureDto)
        {
            var result = _context.Lectures.FirstOrDefault(x => x.Id == updateLectureDto.Id);

            if (result == null)
                return null;

            result.Name = updateLectureDto.Name;
            result.Description = updateLectureDto.Description;
            result.EventId = updateLectureDto.EventId;
            result.ParticipantNumber = updateLectureDto.ParticipantNumber;
            result.StartDate = updateLectureDto.StartDate;
            result.EndDate = updateLectureDto.EndDate;

            _context.Lectures.Update(result);
            _context.SaveChanges();

            var lectureDto = new LectureDto()
            {
                Name = updateLectureDto.Name,
                Description = updateLectureDto.Description,
                EventId = updateLectureDto.EventId,
                ParticipantNumber = updateLectureDto.ParticipantNumber,
                StartDate = updateLectureDto.StartDate,
                EndDate = updateLectureDto.EndDate
            };

            return lectureDto;
        }
      
        public bool Delete(int id)
        {
            var result = _context.Lectures.FirstOrDefault(x => x.Id == id);

            if (result == null)
                return false;

            _context.Lectures.Remove(result);
            _context.SaveChanges();
            return true;
        }

        public bool SignForLecture(LectureUserDto lectureUserDto, LectureDto lectureDto)
        {
            if (!(_context.SimpleUsers.Any()) || !(_context.Lectures.Any()))
            {
                return false;
            }

            var userLectureDB = new LectureUser()
            {
                UserId = lectureUserDto.Id,
                LectureId = lectureDto.Id,

            };

            _context.LectureUsers.Add(userLectureDB);
            _context.SaveChanges();

            return true;
        }

        public List<LectureUserDto> GetLectureUser()
        {
            var tmp = _context.LectureUsers.Select(x => x);

            if (tmp == null)
            {
                return null;
            }

            List<LectureUserDto> lectureUserDtos = new List<LectureUserDto>();

            foreach (var item in tmp)
            {
                lectureUserDtos.Add(new LectureUserDto()
               {
                   Id = item.Id,
                   LectureId = item.LectureId,
                   UserId = item.UserId,

                });
            }
            return lectureUserDtos;
        }

    }
}
//