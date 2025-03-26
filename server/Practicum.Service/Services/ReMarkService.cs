using Amazon.S3;
using Amazon.S3.Model;
using Practicum.Core.IRepositories;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Practicum.Core.DTOs;


namespace Practicum.Service.Services
{
    public class ReMarkService
    {
        private readonly IReMarkRepository _remarkRepository;
        private readonly IProgramFileRepository _programFileRepository;
        public ReMarkService(IReMarkRepository reMarkRepository, IProgramFileRepository programFileRepository)
        {
            _remarkRepository = reMarkRepository;
            _programFileRepository = programFileRepository;
        }

        // 🔹 שליפת כל ההערות של קובץ מסוים
        public async Task<IEnumerable<ReMarkDto>> GetReMarksByFileId(int fileId)
        {
            var remarks = await _remarkRepository.GetReMarksByFileIdAsync(fileId); // await בשורה זו
            return remarks.Select(r => new ReMarkDto
            {
                Id = r.Id,
                Content = r.Content,
                CreateAt = r.CreateAt,
                ClientId = r.ClientId,
                ProgramFileId = r.ProgramFileId
            }).ToList();
        }



        public async Task<ReMarkDto> GetReMarkById(int id)
        {
            var remark = await _remarkRepository.GetByIdAsync(id);
            if (remark == null)
            {
                return null; // או זרוק חריגה אם צריך
            }

            return new ReMarkDto
            {
                Id = remark.Id,
                Content = remark.Content,
                CreateAt = remark.CreateAt,
                // כל שדה שצריך להמיר
            };
        }

        // 🔹 הוספת הערה לפי מזהה קובץ
        public async Task<ReMarkDto> AddReMark(int fileId, AddReMarkDto dto)
        {
            var programFile = await _programFileRepository.GetFileByIdAsync(fileId);  // שליפת הקובץ
            if (programFile == null)
                throw new ArgumentException("Program file not found.");

            var remark = new ReMark
            {
                Content = dto.Content,
                CreateAt = DateTime.UtcNow,
                ProgramFileId = fileId,
                ProgramFile = programFile,
               ClientId = dto.ClientId // או להגדיר אותו בהנחה שהלקוח נשלח ממקום אחר
            };

            await _remarkRepository.AddAsync(remark);

            // החזרת DTO עם המידע הדרוש
            var remarkDto = new ReMarkDto
            {
                Id = remark.Id,
                Content = remark.Content,
                CreateAt = remark.CreateAt,
                ClientId = remark.ClientId,
                ProgramFileId = remark.ProgramFileId
            };

            return remarkDto;
        }


        public async Task<ReMark> UpdateReMark(int id, ReMark updatedRemark)
        {
            var remark = await _remarkRepository.GetByIdAsync(id);
            if (remark == null) return null;

            remark.Content = updatedRemark.Content;
            remark.CreateAt = DateTime.UtcNow; 
            await _remarkRepository.UpdateAsync(remark);
            return remark;
        }

        public async Task<bool> DeleteReMark(int id)
        {
            var remark = await _remarkRepository.GetByIdAsync(id);
            if (remark == null) return false;

            await _remarkRepository.DeleteAsync(id);
            return true;
        }
    }
}

