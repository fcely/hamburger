var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"))

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "burgers_db"
});


connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});



app.get('/',function(req,res){

  connection.query("SELECT * FROM orders order by ord_status", function(err, data) {
    if (err) {
      throw err;
    }

var raw_ord=[]
var finished_ord=[]

for(i=0;i<data.length;i++){
  console.log(i)


if(data[i].ord_status===0){
  raw_ord.push(data[i])
} else {
  finished_ord.push(data[i])
}

}
res.render("index", { raw_Order: raw_ord, finished_Order:finished_ord })
  })


})



// this updates the status of the buger
app.post('/api/eat/:id',function(req,res){



  connection.query("UPDATE orders set ord_status=1 where ?",{id:req.params.id}, function(err, data) {
    if (err) {
      throw err;
    }

res.send(200)

  })

})



// this add a new order to the list
app.post('/api/orders/new',function(req,res){

  var ord_desc=req.body.order_desc
 
  
  
    connection.query("Insert into orders (ord_desc,ord_status) values  (?,?)",[ord_desc,0] , function(err, data) {
      if (err) {
        throw err;
      }
      return res.redirect('/')

    })
  })





// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
