
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
using Practicum.Core.DTOs;




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


            var s3Client = new AmazonS3Client(
                awsAccessKey,
                awsSecretKey,
                RegionEndpoint.GetBySystemName(awsRegion)
                );

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
            builder.Services.AddScoped<EmailService>();
            builder.Services.AddScoped<DiffService>();
            builder.Services.AddScoped<QuestionnaireService>();
            builder.Services.AddScoped<QuestionnaireFillService>();
            builder.Services.AddScoped<APIAIService>();
            //s3
            builder.Services.AddSingleton<IAmazonS3>(sp =>
            {
                var awsAccessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY");
                var awsSecretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
                var awsRegion = Environment.GetEnvironmentVariable("AWS_REGION");

                var credentials = new Amazon.Runtime.BasicAWSCredentials(awsAccessKey, awsSecretKey);
                var region = Amazon.RegionEndpoint.GetBySystemName(awsRegion ?? "eu-west-1");

                return new AmazonS3Client(credentials, region);
            });
            //repositories
            builder.Services.AddScoped<IClientRepository, ClientRepository>();
            builder.Services.AddScoped<IProgramFileRepository, ProgramFileRepository>();
            builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
            builder.Services.AddScoped<IReMarkRepository, ReMarkRepository>();
            builder.Services.AddScoped<IQuestionnaireFillRepository, QuestionnaireFillRepository>();
            builder.Services.AddScoped<IQuestionnaireRepository, QuestionnaireRepository>();
            //mapping
            builder.Services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<MappingProfile>(); 
            });


            //data
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            //builder.Services.AddDbContext<DataContext>(options =>
            //    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
            builder.Services.AddDbContextPool<DataContext>(options =>
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

            
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            //uptimerobot
            app.MapMethods("/health", new[] { "GET", "HEAD" }, () => Results.Ok("Alive"));

            //cores
            app.UseCors("AllowAllOrigins");
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
