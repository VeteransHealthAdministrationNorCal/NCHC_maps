var express = require('express');
var logger = require('morgan');
var path = require('path');
const sql = require("mssql/msnodesqlv8");
var app = express();

const main = async () => {
    const pool = new sql.ConnectionPool({
      server: "VHACDWDWHSQL33.vha.med.va.gov",
      database: "D05_VISN21Sites",
      options: {
        trustedConnection: true
      }
    });
  
    await pool.connect();
  
    const request = new sql.Request(pool);
  
    /*const query = `SELECT TOP (10) * 
    FROM [CDWWork].[Dim].[Date]`;
   */
    const query0 = 
    'SELECT TOP (1000) * FROM [D05_VISN21Sites].[LSV].[MAC_ACSC]'

    const result = await request.query(query0);
  
    //console.dir(result);
    //console.log(result.recordsets[0])
    return result.recordsets[0];
    
  };
//app.use(express.static(__dirname))
app.use(logger("short"))
var publicPath = path.resolve(__dirname,'public')
app.use(express.static(publicPath))
//
//
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
})
app.get('/GetData',function(req,res){
    var a = main() // I am getting a promise.
    a.then(function(r) {
        console.log(r)
        console.log('Here we go')
        res.json(r)
        res.end
    }, function(err) {
        console.log('fetch error',err)
        res.send(err)
     
    }).catch (function(error){
        console.log('really bad:', error)
        res.send(error)
        
    })


})

app.get('/data', function(req, res){
 res.json([{
     id:1,name:'Alon',
     id:2,name: 'Elvis'
 }])
})
app.get('/circle',function(req,res){
    res.send('<html><body><h1>My first SVG</h1><svg width="100" height = "100"> <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></body></html>');

})

var server = app.listen(5000, function () {
    console.log('Server is running.....');
});