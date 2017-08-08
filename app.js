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


//index route
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
//new route
app.get("/blogs/new",function(req,res){
  res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    // create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            // then, redirect to the index
            res.redirect("/blogs");
        }
    });
});

app.listen(8080, process.env.IP, function(){
    console.log("blog is running");
});
