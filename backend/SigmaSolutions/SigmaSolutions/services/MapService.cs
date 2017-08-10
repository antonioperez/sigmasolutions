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

namespace SigmaSolutions.services
{
    class MapService
    {
        static string[] Scopes = { DriveService.Scope.DriveReadonly };
        static string ApplicationName = "Sigma Map Services";

        public UserCredential credential;

        public MapService ()
        {
            using (var stream =new FileStream("client_id.json", FileMode.Open, FileAccess.Read))
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
        }

        private DriveService getService()
        {
            DriveService service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });
            return service;
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
            DriveService service = getService();
            FilesResource.ListRequest listRequest = service.Files.List();
            listRequest.PageSize = 30;
            listRequest.Fields = "nextPageToken, files(id, name)";
            //listRequest.Q = "";

            // List files.
            IList<Google.Apis.Drive.v3.Data.File> files = listRequest.Execute().Files;
            if (files != null && files.Count > 0)
            {
                foreach (var f in files)
                {
                    if (f != null)
                        filelist.Add(f.Name);
                }
            }
            else
            {
                throw new Exception("No files found.");
            }

            return filelist.ToArray();

        }

        [PublishedAttribute]
        public string[] uploadZipfile(string userguid, string filename)
        {
            List<string> filelist = new List<string>();
            // Define parameters of request.
            DriveService service = getService();
            FilesResource.ListRequest listRequest = service.Files.List();
            listRequest.PageSize = 30;
            listRequest.Fields = "nextPageToken, files(id, name)";
            //listRequest.Q = "";
        
            return filelist.ToArray();

        }

    }
}
