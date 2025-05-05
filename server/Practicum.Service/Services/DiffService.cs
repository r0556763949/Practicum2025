using Amazon.S3.Model;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenCvSharp;
using Amazon.Util.Internal;
using static OpenCvSharp.ML.LogisticRegression;
using System.Text.Json;
using RestSharp;
using System;
using System.IO;
using System.Text.Json;

namespace Practicum.Service.Services
{
    public class DiffService
    {
        private readonly S3StorageService _s3StorageService;
        public DiffService(S3StorageService s3StorageService)
        {
            _s3StorageService = s3StorageService;
        }
        public string ConvertPdfToImage(string pdfPath, string outputDirectory)
        {
            var uniqueId = Guid.NewGuid().ToString("N").Substring(0, 8); // קצר וייחודי
            var outputFilePrefix = Path.Combine(outputDirectory, $"page-{uniqueId}");

            var startInfo = new ProcessStartInfo
            {
                FileName = "poppler\\Library\\bin\\pdftoppm.exe", // נתיב ל־pdftoppm.exe
                Arguments = $"-png \"{pdfPath}\" \"{outputFilePrefix}\"",
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                CreateNoWindow = true
            };

            using (var process = Process.Start(startInfo))
            {
                process.WaitForExit();
                if (process.ExitCode != 0)
                {
                    var error = process.StandardError.ReadToEnd();
                    throw new Exception("PDF to Image conversion failed: " + error);
                }
            }

            return outputFilePrefix + "-1.png";
        }
        public async Task<string> CompareTwoPlansAsync(string pathFile1,  string pathFile2)
        {
            var localPath1 = Path.GetTempFileName() + ".pdf";
            Console.WriteLine("localPath1: " ,localPath1);
            var localPath2 = Path.GetTempFileName() + ".pdf";

            await _s3StorageService.DownloadFileToLocalAsync(pathFile1, localPath1);
            await _s3StorageService.DownloadFileToLocalAsync(pathFile2, localPath2);

            var image1 = ConvertPdfToImage(localPath1, Path.GetTempPath());
            var image2 = ConvertPdfToImage(localPath2, Path.GetTempPath());

            var diffImagePath = CompareImagesWithAI(image1, image2); // נכתוב את זה אחר כך
            return diffImagePath;
        }
        private Mat AlignImages(Mat img1, Mat img2)
        {
            // גלאי תכונות ORB
            var orb = ORB.Create(5000);

            // מצא keypoints ו-descriptors
            KeyPoint[] keypoints1, keypoints2;
            Mat descriptors1 = new Mat();
            Mat descriptors2 = new Mat();
            orb.DetectAndCompute(img1, null, out keypoints1, descriptors1);
            orb.DetectAndCompute(img2, null, out keypoints2, descriptors2);

            // matcher בין ה-descriptors
            var bf = new BFMatcher(NormTypes.Hamming, crossCheck: true);
            var matches = bf.Match(descriptors1, descriptors2);

            if (matches.Length < 4)
            {
                throw new Exception("Not enough matches to compute homography.");
            }

            // מיין לפי איכות
            matches = matches.OrderBy(m => m.Distance).ToArray();

            // קח רק את הטובים
            var numGoodMatches = (int)(matches.Length * 0.15); // 15% מהטובים
            matches = matches.Take(numGoodMatches).ToArray();

            // הפוך ל-Point2f arrays
            var points1 = matches.Select(m => keypoints1[m.QueryIdx].Pt).ToArray();
            var points2 = matches.Select(m => keypoints2[m.TrainIdx].Pt).ToArray();

            // מצא הומוגרפיה
            var homography = Cv2.FindHomography(InputArray.Create(points2), InputArray.Create(points1), HomographyMethods.Ransac);

            // warp את img2 שתתאים ל-img1
            Mat aligned = new Mat();
            Cv2.WarpPerspective(img2, aligned, homography, img1.Size());

            return aligned;
        }

        private string CompareImagesWithAI(string imagePath1, string imagePath2)
        {
            // טען את התמונות
            Mat img1 = Cv2.ImRead(imagePath1);
            Mat img2 = Cv2.ImRead(imagePath2);

            // ודא שהן נטענות כראוי
            if (img1.Empty() || img2.Empty())
            {
                throw new Exception("One or both images could not be loaded.");
            }

            // ודא שהן באותו גודל – אם לא, לא תהיה השוואה תקינה
            if (img1.Size() != img2.Size())
            {
                throw new Exception("Images are not the same size.");
            }
            Mat alignedImg2 = AlignImages(img1, img2);
            Mat diff = new Mat();
            Cv2.Absdiff(img1, alignedImg2, diff);
            // צור תמונה של ההבדלים
            //Mat diff = new Mat();
            //Cv2.Absdiff(img1, img2, diff);

            // הפוך את ההבדל ליותר ברור – סף (threshold)
            Mat gray = new Mat();
            Cv2.CvtColor(diff, gray, ColorConversionCodes.BGR2GRAY);
            Cv2.ImWrite("gray_output.png", gray);
            Mat thresh = new Mat();
            Cv2.Threshold(gray, thresh, 5, 255, ThresholdTypes.Binary); // תוכל להתאים את הסף כאן

            int diffPixels = Cv2.CountNonZero(thresh);
            Console.WriteLine($"DIFFERENT PIXELS COUNT: {diffPixels}");
            // הפוך את האזורים השונים לאדומים על התמונה המקורית
            Mat mask = new Mat();
            Cv2.CvtColor(thresh, mask, ColorConversionCodes.GRAY2BGR);
            Mat highlighted = img2.Clone();
            highlighted.SetTo(new Scalar(0, 0, 255), mask); // אזורים שונים באדום

            // שמור את התמונה החדשה לקובץ זמני
            var outputPath = Path.Combine(Path.GetTempPath(), $"diff-{Guid.NewGuid()}.png");
            Cv2.ImWrite(outputPath, highlighted);
            Console.WriteLine("DIFF SAVED TO: " + outputPath);
            return outputPath;
        }

//public async Task<string> ComparePlansWithAPIAI(string imagePath1, string imagePath2, string openAiApiKey)
//    {
//        var client = new RestClient("https://api.openai.com/v1/chat/completions");
//        var request = new RestRequest(Method.Post);
//        request.AddHeader("Authorization", $"Bearer {openAiApiKey}");
//        request.AddHeader("Content-Type", "application/json");

//        var imageBase64_1 = Convert.ToBase64String(File.ReadAllBytes(imagePath1));
//        var imageBase64_2 = Convert.ToBase64String(File.ReadAllBytes(imagePath2));

//        var body = new
//        {
//            model = "gpt-4-vision-preview",
//            messages = new object[]
//            {
//            new { role = "user", content = new object[]
//                {
//                    new { type = "text", text = "Compare these two architectural floor plans and describe any meaningful differences." },
//                    new { type = "image_url", image_url = new { url = $"data:image/png;base64,{imageBase64_1}" } },
//                    new { type = "image_url", image_url = new { url = $"data:image/png;base64,{imageBase64_2}" } }
//                }
//            }
//            },
//            max_tokens = 1000
//        };

//        request.AddJsonBody(JsonSerializer.Serialize(body));

//        var response = await client.ExecuteAsync(request);
//        return response.Content;
//    }

}
}
