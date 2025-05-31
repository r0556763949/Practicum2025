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

            Console.WriteLine($"[INIT] Bucket Name: {_bucketName ?? "NULL"}");
        }

        public string GenerateUploadUrl(string filePath)
        {
            try
            {
                Console.WriteLine($"[GenerateUploadUrl] Generating for path: {filePath}");

                var request = new GetPreSignedUrlRequest
                {
                    BucketName = _bucketName,
                    Key = filePath,
                    Verb = HttpVerb.PUT,
                    Expires = DateTime.UtcNow.AddMinutes(15)
                };

                var url = _s3Client.GetPreSignedURL(request);

                Console.WriteLine($"[GenerateUploadUrl] Success. URL: {url}");
                return url;
            }
            catch (Exception e)
            {
                Console.WriteLine($"[GenerateUploadUrl] Error: {e}");
                return null;
            }
        }

        public async Task<string> DownloadFileToLocalAsync(string filePath, string localPath)
        {
            try
            {
                Console.WriteLine($"[DownloadFileToLocalAsync] Downloading '{filePath}' to '{localPath}'");
                Console.WriteLine($"[DownloadFileToLocalAsync] Bucket: {_bucketName}");

                var request = new GetObjectRequest
                {
                    BucketName = _bucketName,
                    Key = filePath
                };

                using var response = await _s3Client.GetObjectAsync(request);
                Console.WriteLine($"[DownloadFileToLocalAsync] Response status: {response.HttpStatusCode}");

                await using var fileStream = File.Create(localPath);
                await response.ResponseStream.CopyToAsync(fileStream);

                Console.WriteLine($"[DownloadFileToLocalAsync] File saved successfully.");
                return localPath;
            }
            catch (AmazonS3Exception s3Ex)
            {
                Console.WriteLine($"[DownloadFileToLocalAsync] S3 Error: {s3Ex.Message} | Code: {s3Ex.ErrorCode}");
                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine($"[DownloadFileToLocalAsync] General Error: {e}");
                return null;
            }
        }

        public async Task DeleteFileAsync(string filePath)
        {
            try
            {
                Console.WriteLine($"[DeleteFileAsync] Deleting: {filePath}");

                var deleteRequest = new DeleteObjectRequest
                {
                    BucketName = _bucketName,
                    Key = filePath
                };

                var result = await _s3Client.DeleteObjectAsync(deleteRequest);
                Console.WriteLine($"[DeleteFileAsync] Deleted. HTTP Status: {result.HttpStatusCode}");
            }
            catch (Exception e)
            {
                Console.WriteLine($"[DeleteFileAsync] Error: {e}");
            }
        }

        public string GenerateDownloadUrl(string filePath, bool isView = false)
        {
            try
            {
                Console.WriteLine($"[GenerateDownloadUrl] Generating for path: {filePath}, isView: {isView}");

                var request = new GetPreSignedUrlRequest
                {
                    BucketName = _bucketName,
                    Key = filePath,
                    Verb = HttpVerb.GET,
                    Expires = DateTime.UtcNow.AddMinutes(15),
                    ResponseHeaderOverrides = new ResponseHeaderOverrides()
                };

                if (isView)
                    request.ResponseHeaderOverrides.ContentDisposition = "inline";
                else
                    request.ResponseHeaderOverrides.ContentDisposition = "attachment";

                var url = _s3Client.GetPreSignedURL(request);
                Console.WriteLine($"[GenerateDownloadUrl] URL: {url}");
                return url;
            }
            catch (Exception e)
            {
                Console.WriteLine($"[GenerateDownloadUrl] Error: {e}");
                return null;
            }
        }
    }
    }

