using Amazon.S3.Model;
using Amazon.S3;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Practicum.Service
{
    public class S3StorageService
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;
        public S3StorageService(IAmazonS3 s3Client, IConfiguration configuration)
        {
            _s3Client = s3Client;
            _bucketName = Environment.GetEnvironmentVariable("AWS_BUCKET_NAME");
        }

        public string GenerateUploadUrl(string filePath)
        {
            try
            {
                var request = new GetPreSignedUrlRequest
                {
                    BucketName = _bucketName,
                    Key = filePath,
                    Verb = HttpVerb.PUT,
                    Expires = DateTime.UtcNow.AddMinutes(15)
                };

                return _s3Client.GetPreSignedURL(request);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error generating upload URL: {e.Message}");
                return null;
            }
        }
        public async Task<string> DownloadFileToLocalAsync(string filePath, string localPath)
        {
            try
            {
                var request = new GetObjectRequest
                {
                    BucketName = _bucketName,
                    Key = filePath
                };

                using var response = await _s3Client.GetObjectAsync(request);
                await using var fileStream = File.Create(localPath);
                await response.ResponseStream.CopyToAsync(fileStream);

                return localPath;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error downloading file: {e.Message}");
                return null;
            }
        }
        public async Task DeleteFileAsync(string filePath)
        {
            var deleteRequest = new DeleteObjectRequest
            {
                BucketName = _bucketName,
                Key = filePath
            };
            await _s3Client.DeleteObjectAsync(deleteRequest);
        }
        public string GenerateDownloadUrl(string filePath, bool isView = false)
        {
            try
            {
                var request = new GetPreSignedUrlRequest
                {
                    BucketName = _bucketName,
                    Key = filePath,
                    Verb = HttpVerb.GET,
                    Expires = DateTime.UtcNow.AddMinutes(15),
                    ResponseHeaderOverrides = new ResponseHeaderOverrides()
                };

                if (isView)
                {
                    // צפייה: מאפשר לדפדפן להציג את הקובץ ישירות אם אפשר
                    request.ResponseHeaderOverrides.ContentDisposition = "inline";
                }
                else
                {
                    // הורדה: מאלץ את הקובץ להורדה
                    request.ResponseHeaderOverrides.ContentDisposition = "attachment";
                }

                return _s3Client.GetPreSignedURL(request);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error generating download URL: {e.Message}");
                return null;
            }
        }


    }
}

