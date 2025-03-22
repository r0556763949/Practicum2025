
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
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;




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
            var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
            var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
            var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");

            Console.WriteLine("AccessKey: " + awsAccessKey);
            Console.WriteLine("SecretKey: " + awsSecretKey);
            Console.WriteLine("Region: " + awsRegion);
            Console.WriteLine("BucketName: " + awsBucketName);
            Console.WriteLine("JWT_KEY: " + jwtKey);

            var s3Client = new AmazonS3Client(
                awsAccessKey,
                awsSecretKey,
                RegionEndpoint.GetBySystemName(awsRegion));

            Console.WriteLine($"Connected to S3 bucket: {awsBucketName} successfully!");



            var builder = WebApplication.CreateBuilder(args);
            //ENV
            builder.Configuration.AddEnvironmentVariables();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.CustomSchemaIds(type => type.FullName); // משתמש בשם המלא של המחלקה
            });

            //Services
            builder.Services.AddScoped<ClientService>();
            builder.Services.AddScoped<ProgramFileService>();
            builder.Services.AddScoped<ProjectService>();
            builder.Services.AddScoped<ReMarkService>();
            builder.Services.AddScoped<S3StorageService>();
            builder.Services.AddScoped<JwtService>();
            builder.Services.AddScoped<PasswordServicecs>();
            //repositories
            builder.Services.AddScoped<IClientRepository, ClientRepository>();
            builder.Services.AddScoped<IProgramFileRepository, ProgramFileRepository>();
            builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
            builder.Services.AddScoped<IReMarkRepository, ReMarkRepository>();
           


            //data
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<DataContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
            //jwt
          
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
                        ValidateIssuer = true,
                        ValidIssuer = jwtIssuer,
                        ValidateAudience = true,
                        ValidAudience = jwtAudience,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                });

            builder.Services.AddAuthorization();
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
