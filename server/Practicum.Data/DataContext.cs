using Microsoft.EntityFrameworkCore;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Data
{
    public class DataContext:DbContext
    {
        public DbSet<Client> Clients { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProgramFile> ProgramFiles { get; set; }
        public DbSet<ReMark> ReMarks { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"postgresql://dbpracticum_user:RQtTzSut5IDKAhH3Li0eXp1CiB1cAIVL@dpg-cvc6kjpc1ekc73enve0g-a/dbpracticum");
        }

    }
}
