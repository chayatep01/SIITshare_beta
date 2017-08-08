var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

//conntect to mongo db
mongoose.connect("mongodb://localhost/siitshare", {useMongoClient: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

//mongoose model
var blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);


//routing
app.get("/",function(req,res){
  res.redirect("/blogs");
});

app.get("/blogs",function(req ,res){
  Blog.find({},function(err,blogs){
    if(err){
      console.log("eror!");
    } else {
      res.render("index",{blogs:blogs});
    }
  });
});


app.listen(3030, process.env.IP, function(){
    console.log("blog is running");
});
