using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace SigmaSolutions.services
{
    public struct GSARequest
    {
        public string name;
        public DateTime fromPostedDate;
        public DateTime toPostedDate;
        public int pageSize;
        public int pageOffset;
    }

    public struct GSAResponse
    {
        public string id;
        public string name;
        public string contact;
        public string contact_info;
        public string website;
        public string exclusive;

        public string basin_number;
        public string basin_name;
        public string region;
        public string county;

        public DateTime posted;
        public DateTime postedPlus90;
        public DateTime received;
        public DateTime receivedPlus15;

    }
}
