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
using AutoMapper;


namespace Practicum.Service.Services
{
    public class ReMarkService
    {
        private readonly IReMarkRepository _remarkRepository;
        private readonly IProgramFileRepository _programFileRepository;
        private readonly IMapper _mapper;
        public ReMarkService(IReMarkRepository reMarkRepository, IProgramFileRepository programFileRepository, IMapper mapper)
        {
            _remarkRepository = reMarkRepository;
            _programFileRepository = programFileRepository;
            _mapper = mapper;
        }

        // 🔹 שליפת כל ההערות של קובץ מסוים
        public async Task<IEnumerable<ReMarkDto>> GetReMarksByFileId(int fileId)
        {
            var remarks = await _remarkRepository.GetReMarksByFileIdAsync(fileId);
            return _mapper.Map<IEnumerable<ReMarkDto>>(remarks);
        }



        public async Task<ReMarkDto> GetReMarkById(int id)
        {
            var remark = await _remarkRepository.GetByIdAsync(id);
            if (remark == null)
                return null;

            return _mapper.Map<ReMarkDto>(remark);
        }

        // 🔹 הוספת הערה לפי מזהה קובץ
        public async Task<ReMarkDto> AddReMark(int fileId, AddReMarkDto dto)
        {
            var programFile = await _programFileRepository.GetFileByIdAsync(fileId);
            if (programFile == null)
                throw new ArgumentException("Program file not found.");

            var remark = _mapper.Map<ReMark>(dto);
            remark.ProgramFileId = fileId;
            remark.ProgramFile = programFile;
            remark.CreateAt = DateTime.UtcNow;

            await _remarkRepository.AddAsync(remark);

            return _mapper.Map<ReMarkDto>(remark);
        }


        public async Task<bool> UpdateReMark(int id, string content, int clientId)
        {
            var remark = await _remarkRepository.GetByIdAsync(id);
            if (remark == null)
            {
                return false;
            }

            if (remark.ClientId != clientId)
            {
                return false; // ניסיון לעדכן הערה שלא שלך
            }

            remark.Content = content;
            remark.CreateAt = DateTime.UtcNow;
            await _remarkRepository.UpdateAsync(remark);
            //return _mapper.Map<ReMarkDto>(remark);
            return true;
        }

        public async Task<bool> DeleteReMark(int id)
        {
            var remark = await _remarkRepository.GetByIdAsync(id);
            if (remark == null)
            {
                // אם ההערה לא נמצאה, החזר false
                Console.WriteLine("No remark found with the given ID.");
                return false;
            }

            // שלב 2: מחיקת ההערה
            await _remarkRepository.DeleteAsync(id);
            return true; // מחיקה הצליחה
        }

        public async Task<bool> DeleteReMark(int id, int clientId)
        {
            var remark = await _remarkRepository.GetByIdAsync(id);
            if (remark == null)
            {
                return false;
            }

            if (remark.ClientId != clientId)
            {
                return false; // ניסיון למחוק הערה שלא שלך
            }

            await _remarkRepository.DeleteAsync(id);
            return true;
        }
    }
}

