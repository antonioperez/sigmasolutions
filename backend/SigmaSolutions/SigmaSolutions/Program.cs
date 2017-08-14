using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Npgsql;
using Thriftly.Server;
using SigmaSolutions.services;


namespace SigmaSolutions
{
    class Program
    {
        static void Main(string[] args)
        {

            try
            {
                // Making connection with Npgsql provider
                //TODO: Add config file with connection
                string connstring = String.Format("Server=138.197.207.209;" +
                    "User Id=ecoverse;Password=solsig59;Database=sigma;");
                                
                NpgsqlConnection conn = new NpgsqlConnection(connstring);
                ThriftlyServer thriftly = new ThriftlyServer();
                MapService mapservices = new MapService();
                GSAService gsaservices = new GSAService(conn);

                thriftly.AddService(mapservices, "MapService");
                thriftly.AddService(gsaservices, "GSAService");
                thriftly.StartServer();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
