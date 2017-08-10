using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Thriftly.Server;
using SigmaSolutions.services;


namespace SigmaSolutions
{
    class Program
    {
        static void Main(string[] args)
        {
            ThriftlyServer thriftly = new ThriftlyServer();
            MapService mapservices = new MapService();
            try
            {
                thriftly.AddService(mapservices, "MapService");
                thriftly.StartServer();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
