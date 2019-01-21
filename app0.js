var express = require('express');
var logger = require('morgan');
var path = require('path');
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
  
    const query0 = 'select getdate()';  // Lets keep it simple..
    const result = await request.query(query0);
  
    return result.recordsets[0][0][''];
    
};

app.use(logger("short"));

var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/',function(req,res){
    var a = main()
    a.then(function(r) {
        res.json({"result": r});
        res.end()
    }, function(err) {
        console.log('fetch error',err)
        res.write('internal error')
        res.end()
    }).catch (function(error){
        console.log('really bad:', error)
        res.write('error.message')
        res.end()
    })
    //res.setEncoding(a)
});

var server = app.listen(5000, function () {
    console.log('Server is running.....');
});
