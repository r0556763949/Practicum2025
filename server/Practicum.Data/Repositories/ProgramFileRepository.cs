using Microsoft.EntityFrameworkCore;
using Practicum.Core.IRepositories;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Data.Repositories
{
    public class ProgramFileRepository : IProgramFileRepository
    {
        private readonly DataContext _context;
        public ProgramFileRepository(DataContext context) { _context = context; }

        //הוספת קובץ לטבלה
        public async Task AddAsync(ProgramFile file)
        {
            _context.ProgramFiles.Add(file);
            await _context.SaveChangesAsync();
        }
        //עדכון ניתוב קובץ בטבלה
        public async Task UpdatePathAsync(int fileId, string path)
        {
            var file = await _context.ProgramFiles.FindAsync(fileId);
            if (file != null)
            {
                file.Path = path;
                await _context.SaveChangesAsync();
            }
        }
        //שליפת קבצים של לקוח מסוים מהטבלה
        public async Task<IEnumerable<ProgramFile>> GetFilesByClientAndProjectAsync(int clientId, int projectId)
        {
            return await _context.ProgramFiles
                .Where(f => f.ClientId == clientId && f.Path.Contains($"projects/{projectId}/"))
                .ToListAsync();
        }
        //מחיקת קובץ מהטבלה
        public async Task DeleteAsync(int fileId)
        {
            var file = await _context.ProgramFiles.FindAsync(fileId);
            if (file != null)
            {
                _context.ProgramFiles.Remove(file);
                await _context.SaveChangesAsync();
            }
        }
        //שליפת קובץ באמצעות ID
        public async Task<ProgramFile> GetFileByIdAsync(int fileId)
        {
            return await _context.ProgramFiles.FindAsync(fileId);
        }

        public async Task<int?> GetFileOwnerIdAsync(int fileId)
        {
            var file = await _context.ProgramFiles.FindAsync(fileId);
            return file.ClientId; // הנח שיש לך שדה OwnerId במודל ProgramFile
        }
    }
}

