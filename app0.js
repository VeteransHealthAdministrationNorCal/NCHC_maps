var express = require('express');
const sql = require("mssql/msnodesqlv8");
var app = express();

const main = async () => {
    const pool = new sql.ConnectionPool({
      server: "VHACDWa01.vha.med.va.gov",
      database: "CDWWork",
      options: {
        trustedConnection: true
      }
    });
  
    await pool.connect();
  
    const request = new sql.Request(pool);
  
    /*const query = `SELECT TOP (10) * 
    FROM [CDWWork].[Dim].[Date]`;
   */
    const query0 = 'select getdate()'  // Lets keep it simple..
    const result = await request.query(query0);
  
    //console.dir(result);
    //console.log(result.recordsets[0])
    return result.recordsets[0]
    
  };

app.get('/',function(res,req){
    var a = main()
    a.then(function(r) {
        console.log(r[0])
        res.write('Hello World')
        res.end()
    }, function(err) {
        console.log('fetch error',err)
        res.write(500,'internal error')
        res.end()
    }).catch (function(error){
        console.log('really bad:', error)
        res.write(500,error.message)
        res.end()
    })
    //res.setEncoding(a)



})
var server = app.listen(5000, function () {
    console.log('Server is running.....');
});