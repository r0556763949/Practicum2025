using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.IRepositories
{
    public interface IReMarkRepository
    {
        Task<IEnumerable<ReMark>> GetReMarksByFileIdAsync(int fileId); // 🔹 נוספה פונקציה לשליפת הערות לפי קובץ
        Task<ReMark> GetByIdAsync(int id);
        Task AddAsync(ReMark remark);
        Task UpdateAsync(ReMark remark);
        Task DeleteAsync(int id);
    }
}
