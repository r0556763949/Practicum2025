using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
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
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        optionsBuilder.UseMySQL("Server=baiwcccxbl7pdr1f7vyb-mysql.services.clever-cloud.com;Port=3306;Database=baiwcccxbl7pdr1f7vyb;User Id=ugs7cdvlqegw8llt;Password=ugs7cdvlqegw8llt;");
        //    }
        //}
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        optionsBuilder.UseMySql("Server=baiwcccxbl7pdr1f7vyb-mysql.services.clever-cloud.com;Port=3306;Database=baiwcccxbl7pdr1f7vyb;User Id=ugs7cdvlqegw8llt;Password=2pdWprc3IeckzgXrkAaV;");
        //    }
        //}
    }
}
