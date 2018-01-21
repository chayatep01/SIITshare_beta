var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

//connect to mongo db
mongoose.connect("mongodb://localhost/siitshare", {useMongoClient: true});
//mongoose.connect('mongodb://demosiitshare:PrjVAAMxet6Um4JTmpB0RW4V7Rp8zQbm8tTY2Dnf1l8WNnZt5CPCLEQx5J28P5rO9r9dcEo27TMgdHWlUsPbZg==@demosiitshare.documents.azure.com:10255/mean-dev?ssl=true&sslverifycertificate=true', {useMongoClient: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

//blogs model
var blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);
//comment box model
var replySchema = new mongoose.Schema({
  message : String ,
  name :String ,
  created: {type: Date, default: Date.now}
});
var Reply = mongoose.model("Reply" , replySchema);


//INDEX ROUTE
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
//NEW ROUTE
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

//SHOW ROUTE
app.get("/blogs/:id",function(req,res){
  Blog.findById(req.params.id,function(err,foundBlog){
    if (err){
      res.redirect("/blogs")
    } else {

      res.render("show" , {blog:foundBlog});
    }
  })
});



app.get("/blogs/:id/reply",function(req,res){
  res.render("reply")
});




app.listen(5555, process.env.MONGODB_URL, function(){
    console.log("blog is running");
});
