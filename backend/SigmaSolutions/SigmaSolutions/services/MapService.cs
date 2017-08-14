using Thriftly.Server;

using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Drive.v3.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;


using File = Google.Apis.Drive.v3.Data.File;
using System.Security.Cryptography.X509Certificates;

namespace SigmaSolutions.services
{
    class MapService
    {

        static string[] Scopes = { DriveService.Scope.Drive };
        static string ApplicationName = "SigmaSolutions";
        static UserCredential credential;
        static DriveService service;

        public MapService ()
        {
            using (var stream = new FileStream("client_id.json", FileMode.Open, FileAccess.Read))
            {
                string credPath = System.Environment.GetFolderPath(
                    System.Environment.SpecialFolder.Personal);
                credPath = Path.Combine(credPath, ".credentials/drive-dotnet-temp.json");

                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
            }

            service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });
        }


        [PublishedAttribute]
        public string uploadFile()
        {
            try
            {
                    var fileMetadata = new File()
                {
                    Name = "photo.jpg"
                };
                FilesResource.CreateMediaUpload request;
                using (var stream = new System.IO.FileStream("client_id.json",
                                        System.IO.FileMode.Open))
                {
                    request = service.Files.Create(
                        fileMetadata, stream, "application/json");
                    request.Fields = "id";
                    request.Upload();
                }
                var file = request.ResponseBody;
                }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return "";
        }

        private static string GetMimeType(string fileName)
        {
            string mimeType = "application/unknown";
            string ext = System.IO.Path.GetExtension(fileName).ToLower();
            Microsoft.Win32.RegistryKey regKey = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(ext);
            if (regKey != null && regKey.GetValue("Content Type") != null)
                mimeType = regKey.GetValue("Content Type").ToString();
            return mimeType;
        }


       

        [PublishedAttribute]
        public string[] findfile(string userguid, string filename)
        {
            List<string> filelist = new List<string>();
            // Define parameters of request.
            try
            {
                FilesResource.ListRequest listRequest = service.Files.List();
                listRequest.PageSize = 4;
                listRequest.Fields = "nextPageToken, files(id, name)";
                //listRequest.Q = "";

                // List files.
                IList<File> files = listRequest.Execute().Files;
                if (files != null && files.Count > 0)
                {
                    foreach (var f in files)
                    {
                        if (!String.IsNullOrEmpty(f.Name))
                            filelist.Add(f.Name);
                    }
                }
                else
                {
                    throw new Exception("No files found.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return filelist.ToArray();

        }

        [PublishedAttribute]
        public string[] uploadZipfile(string userguid, string filename)
        {
            List<string> filelist = new List<string>();
            // Define parameters of request.
            try
            {
                FilesResource.ListRequest listRequest = service.Files.List();
                listRequest.PageSize = 4;
                listRequest.Fields = "nextPageToken, files(id, name)";
                //listRequest.Q = "";

                // List files.
                IList<Google.Apis.Drive.v3.Data.File> files = listRequest.Execute().Files;
                if (files != null && files.Count > 0)
                {
                    foreach (var f in files)
                    {
                        if (!String.IsNullOrEmpty(f.Name))
                            filelist.Add(f.Name);
                    }
                }
                else
                {
                    throw new Exception("No files found.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return filelist.ToArray();
        }

    }
}
