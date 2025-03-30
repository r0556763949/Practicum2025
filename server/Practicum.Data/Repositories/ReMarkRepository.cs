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
    public class ReMarkRepository: IReMarkRepository
    {
        private readonly DataContext _context;

        public ReMarkRepository(DataContext context)
        {
            _context = context;
        }
        // 🔹 שליפת כל ההערות של קובץ מסוים
        public async Task<IEnumerable<ReMark>> GetReMarksByFileIdAsync(int fileId)
        {
            return await _context.ReMarks
                .Where(r => r.ProgramFile.Id == fileId) // 🔹 שליפה לפי קובץ
                .ToListAsync();
        }

        public async Task<ReMark> GetByIdAsync(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Invalid ID. ID must be greater than zero.", nameof(id));
            }

            // חפש את ה-ReMark לפי המזהה
            var remark = await _context.ReMarks.FindAsync(id);

            // אם לא נמצא, ניתן לזרוק שגיאה או להחזיר null
            if (remark == null)
            {
                throw new KeyNotFoundException($"ReMark with ID {id} not found.");
            }

            return remark;
        }

        public async Task AddAsync(ReMark remark)
        {
            _context.ReMarks.Add(remark);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(ReMark remark)
        {
            _context.ReMarks.Update(remark);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var remark = await _context.ReMarks.FindAsync(id);
            if (remark != null)
            {
                _context.ReMarks.Remove(remark);
                await _context.SaveChangesAsync();
            }
        }
    }
}
