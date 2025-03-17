using Practicum.Core.IRepositories;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Service.Services
{
    public class ProgramFileService
    {
        private readonly IProgramFileRepository _programFileRepository;
        private readonly S3StorageService _s3StorageService;
        public ProgramFileService(IProgramFileRepository programFileRepository, S3StorageService s3StorageService)
        {
            _programFileRepository = programFileRepository;
            _s3StorageService = s3StorageService;
        }
        //יצירת קובץ חדש  לטבלה והחזרת הניתוב להעלאה
        public async Task<(string uploadUrl, ProgramFile file)> CreateFileAsync(int clientId, int projectId, string fileName, string description)
        {
            // יצירת קובץ מנתונים ידועים 
            var file = new ProgramFile
            {
                Name = fileName,
                Description = description,
                CreateAt = DateOnly.FromDateTime(DateTime.UtcNow),
                ClientId = clientId,
            };
            //הוספת הקובץ לטבלה
            await _programFileRepository.AddAsync(file);

            // יצירת ניתוב לאחר שID ידוע
            file.Path = $"clients/{clientId}/projects/{projectId}/files/{file.Id}/{fileName}";

            // קבלת הניתוב להעלאת קובץ
            string uploadUrl = _s3StorageService.GenerateUploadUrl(file.Path);
            if (uploadUrl == null) return (null, null);

            // עדכון הניתוב הידוע
            await _programFileRepository.UpdatePathAsync(file.Id, file.Path);

            return (uploadUrl, file);
        }
        //שליפת קבצים
        public async Task<IEnumerable<ProgramFile>> GetFilesAsync(int clientId, int projectId)
        {
            return await _programFileRepository.GetFilesByClientAndProjectAsync(clientId, projectId);
        }

        // מחיקת קובץ
        public async Task<bool> DeleteFileAsync(int clientId, int projectId, int fileId)
        {
            var file = await _programFileRepository.GetFileByIdAsync(fileId);
            if (file == null) return false;

            // אם צריך למחוק גם מ-S3
            await _s3StorageService.DeleteFileAsync(file.Path);

            await _programFileRepository.DeleteAsync(fileId);
            return true;
        }
        public async Task<string> GetDownloadUrlAsync(int fileId)
        {
            var file = await _programFileRepository.GetFileByIdAsync(fileId);
            if (file == null) return null;

            return _s3StorageService.GenerateDownloadUrl(file.Path, false); // הורדה
        }

        public async Task<string> GetViewUrlAsync(int fileId)
        {
            var file = await _programFileRepository.GetFileByIdAsync(fileId);
            if (file == null) return null;

            return _s3StorageService.GenerateDownloadUrl(file.Path, true); // צפייה
        }

    }
}
