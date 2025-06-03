using Practicum.Core.DTOs;
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
        // והחזרת הניתוב להעלאה
        public async Task<(string uploadUrl, string filePath)> CreateFileAsync(int clientId, int projectId, string fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName))
                throw new ArgumentException("File name cannot be empty.", nameof(fileName));

            string filePath = $"clients/{clientId}/projects/{projectId}/files/{Guid.NewGuid()}/{fileName}";
            string uploadUrl = _s3StorageService.GenerateUploadUrl(filePath);

            return (uploadUrl, filePath);
        }

        // שלב 2️⃣: אישור העלאה והוספה למסד הנתונים
        public async Task<ProgramFile> ConfirmUploadAsync(int clientId, int projectId, string fileName, string description, string filePath)
        {
            var file = new ProgramFile
            {
                Name = fileName,
                Description = description,
                Path = filePath,
                CreateAt = DateOnly.FromDateTime(DateTime.UtcNow),
                ClientId = clientId,
            };

            await _programFileRepository.AddAsync(file);
            return file;
        }
        //שליפת קבצים ממסד הנתונים לפי פרויקט מסוים
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
        public async Task<(ProgramFile file, string uploadUrl)> UpdateFileAsync(int clientId, int projectId, int fileId, FileUpdateRequestDto request)
        {
            var file = await _programFileRepository.GetFileByIdAsync(fileId);
            if (file == null || file.ClientId != clientId )
                return (null, null);

            // עדכון שדות בסיסיים
            file.Name = request.FileName;
            file.Description = request.Description;

            await _programFileRepository.UpdateAsync(file);

            // אם המשתמש רוצה להחליף את הקובץ – נחזיר URL חדש לאותו path
            string uploadUrl = null;
            if (request.ReplaceContent)
            {
                uploadUrl = _s3StorageService.GenerateUploadUrl(file.Path); // שומר על אותו path, כלומר מחליף קובץ
            }

            return (file, uploadUrl);
        }


        public async Task<int?> GetFileOwnerIdAsync(int fileId)
        {
            return await _programFileRepository.GetFileOwnerIdAsync(fileId);
        }
        public async Task<string> GetFilePathAsync(int fileId)
        {
            var file = await _programFileRepository.GetFileByIdAsync(fileId);
            return file?.Path;
        }
    }
}
