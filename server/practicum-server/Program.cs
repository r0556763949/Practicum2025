
using Microsoft.Extensions.DependencyInjection;
using Practicum.Core.IRepositories;
using Practicum.Data;
using Practicum.Data.Repositories;
using Practicum.Service.Services;
using Amazon;
using Amazon.S3;
using Microsoft.Extensions.Configuration;
using System.Text.Json.Serialization;
using Practicum.Service;
using DotNetEnv;



namespace practicum_server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //aws
            Env.Load();

            var awsAccessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY");
            var awsSecretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
            var awsRegion = Environment.GetEnvironmentVariable("AWS_REGION");
            var awsBucketName = Environment.GetEnvironmentVariable("AWS_BUCKET_NAME");

            Console.WriteLine("AccessKey: " + awsAccessKey);
            Console.WriteLine("SecretKey: " + awsSecretKey);
            Console.WriteLine("Region: " + awsRegion);
            Console.WriteLine("BucketName: " + awsBucketName);

            var s3Client = new AmazonS3Client(
                awsAccessKey,
                awsSecretKey,
                RegionEndpoint.GetBySystemName(awsRegion));

            Console.WriteLine($"Connected to S3 bucket: {awsBucketName} successfully!");


            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            //Services
            builder.Services.AddScoped<ClientService>();
            builder.Services.AddScoped<ProgramFileService>();
            builder.Services.AddScoped<ProjectService>();
            builder.Services.AddScoped<ReMarkService>();
            builder.Services.AddScoped<S3StorageService>();
            //repositories
            builder.Services.AddScoped<IClientRepository, ClientRepository>();
            builder.Services.AddScoped<IProgramFileRepository, ProgramFileRepository>();
            builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
            builder.Services.AddScoped<IReMarkRepository, ReMarkRepository>();
            //data
            builder.Services.AddDbContext<DataContext>();
            //s3
            builder.Services.AddAWSService<IAmazonS3>();
            //cores
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
            });
            var app = builder.Build();
            //cycle
            //builder.Services.AddControllers();
            //builder.Services.AddControllers().AddJsonOptions(options =>
            //{
            //    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            //    options.JsonSerializerOptions.WriteIndented = true;
            //});


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();
            //cores
            app.UseCors("AllowAllOrigins");

            app.MapControllers();

            app.Run();
        }
    }
}
