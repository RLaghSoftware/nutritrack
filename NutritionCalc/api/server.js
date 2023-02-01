const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
 
const app = express(); //sets up backend
 
app.use(cors());
// parse application/json
app.use(bodyParser.json({
 
}));
  var mysql = require('mysql');
//create database connection
const conn = mysql.createConnection({
    host     : 'localhost',
    database : 'nutritionCalc',   // the name of your db
    user     : 'root',     // your root username
    password : 'your_current_password'
});
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');

  });
  
  app.get('/entries', (req, res) => {
 //creates query from sent parameters, runs query on connected DB, then returns results
 //creates data for query
    let data = {
      sTime: req.query.sTime,
      eTime: req.query.eTime
    };
    if (data.sTime == '')
    {
      data.sTime = "1970-01-01"
    }
    if (data.eTime == '')
    {
      data.eTime = "2038-01-12"
    }
   //creates query with data
    let sql = "SELECT * FROM tracker WHERE created_at BETWEEN " + JSON.stringify(data.sTime) +" AND " + JSON.stringify(data.eTime) +";"
    conn.query(sql, (err, results) => {
      if(err) throw err;
    //sends results of query
      res.json(results);
    }); 
});

app.get('/entries-grouped', (req, res) => {
  //creates query from sent parameters, runs query on connected DB, then returns results
  //creates data for query
     let data = {
       sTime: req.query.sTime,
       eTime: req.query.eTime
     };
     if (data.sTime == '')
     {
       data.sTime = "1970-01-01"
     }
     if (data.eTime == '')
     {
       data.eTime = "2038-01-12"
     }
    //creates query with data
     let sql = "select created_at, sum(Calories) AS TotCal, sum(Protein) AS totProt, sum(Fat) AS totFat, sum(Carbs) AS totCarb from tracker WHERE created_at BETWEEN " + JSON.stringify(data.sTime) +" AND " + JSON.stringify(data.eTime) +"group by (created_at);"
     conn.query(sql, (err, results) => {
       if(err) throw err;
     //sends results of query
       res.json(results);
     }); 
 });
 
   
  //add new user
  app.post('/store-data',(req, res) => {
    //creates query from sent parameters, runs query on connected DB, then returns results
 //creates data for query
    let data = {
        created_at: req.body.Date,
        Calories: '0'+req.body.Calories,
        Carbs: '0'+req.body.Carbs,
        Protein: '0'+req.body.Protein,
        Fat: '0'+req.body.Fat
    
    
    };

    if (data.created_at == '')
    {
      var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
   
    var date = year + "-" + month + "-" + day;
      data.created_at = date;
    }

    
 // creates query with data
    let sql = "INSERT INTO tracker (created_at, Calories, Carbs, Protein, Fat) VALUES ( "+ JSON.stringify(data.created_at) + ", "+ JSON.stringify(data.Calories) + ", "+ JSON.stringify(data.Carbs) + ", "+ JSON.stringify(data.Protein) + ", "+ JSON.stringify(data.Fat) + ")" ;
  // excecutes query on connected DB
  
    query = conn.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
   
      });
  });

  // removes post givin the ID
  app.delete('/remove-with-id',(data, res) => {

    let d = {
      ID: JSON.stringify(data.body.entry),
  
  };

 
   // creates query with data
   let sql = "delete from tracker where ID LIKE "+ JSON.stringify(d.ID) + ";" ;
   // excecutes query on connected DB
   
     query = conn.query(sql, function (error, results, fields) {
         if (error) throw error;
         console.log(results);
    
       });


  })
// conects to local host
  app.listen(3000, () => {
    console.log("Server running successfully - on 3000");
 
  });

 