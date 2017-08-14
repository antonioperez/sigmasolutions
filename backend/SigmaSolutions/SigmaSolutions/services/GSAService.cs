using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Thriftly.Server;
using Npgsql;
using System.Data;

namespace SigmaSolutions.services
{
    class GSAService
    {
        public NpgsqlConnection conn;
 
        private DataTable dt = new DataTable();
        public GSAService(NpgsqlConnection db)
        {
            conn = db;
        }

        /**
         * <summary>
         * Function will return an array of gsas that meet the passed criteria. 
         * If no criteria is passed, all gsas will be returned. Values are searched by using
         * a like condition on its related column. Supports pagination.
         * 
         * search.name        string Searches gsa.name
         * search.pageSize    int    the amount of records that should be sent in the response
         * search.pageOffset  int    used to show the next set of results starting at the passed value. 
         * </summary>
         * <param name="search">search parameters</param>
         * <returns>gsa response array</returns>
         **/
        [PublishedAttribute]
        public GSAResponse[] getGSAs(GSARequest search)
        {
            List<GSAResponse> gsas = new List<GSAResponse>(); ;
            conn.Open();
            string sql = "SELECT * FROM posted_gsa Where 1=1 ";

            search.name = search.name.Trim();
            if (!String.IsNullOrEmpty(search.name))
            {
                sql += " AND name ilike @name ";
            }

            sql += " Order by name";
            if (search.pageSize >= 1 && search.pageOffset >= 0)
            {
                sql += " OFFSET " + (search.pageOffset.ToString()) + " ROWS FETCH NEXT " + search.pageSize.ToString() + " ROWS ONLY";
            }

            // data adapter making request from our connection
            NpgsqlCommand cmd = new NpgsqlCommand(sql,conn);
            cmd.Parameters.AddWithValue("@name", "%" + search.name + "%");

            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            conn.Close();
            DataSet dataset = new DataSet();
            da.Fill(dataset, "GSA");


            foreach (DataRow row in dataset.Tables["GSA"].Rows)
            {
                GSAResponse gsa = this.fillGSA(row);
                gsas.Add(gsa);
            }

            return gsas.ToArray();

        }

        private GSAResponse fillGSA(DataRow row)
        {
            GSAResponse gsa = new GSAResponse();
            gsa.id = row["id"].ToString();
            gsa.name = row["name"].ToString();
            gsa.contact = row["contact"].ToString();
            gsa.contact_info = row["contact_information"].ToString();
            gsa.website = row["website"].ToString();
            gsa.exclusive = row["exclusive"].ToString();

            gsa.basin_number = row["basin_number"].ToString();
            gsa.basin_name = row["basin_name"].ToString();
            gsa.region = row["region"].ToString();
            gsa.county = row["county"].ToString();

            gsa.posted = Convert.ToDateTime(row["posted"]);
            gsa.postedPlus90 = Convert.ToDateTime(row["posted_plus_90"]);
            gsa.received = Convert.ToDateTime(row["received"]);
            gsa.receivedPlus15 = Convert.ToDateTime(row["received_plus_15"]);
            return gsa;
        }

    }
}
