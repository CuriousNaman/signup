const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

mongoose.set('strictQuery',false);
const app = express();
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://127.0.0.1/submitDB",{useNewUrlParser: true});

const submitschema = new mongoose.Schema({
    email: String,
    password: String,
    RollNum: Number
});
const Submit = mongoose.model("Submit",submitschema);

Submit.updateOne({name: "Naman"}, {$set: {RollNum: 15}})

app.get("/", function(req,res){
   res.sendFile(__dirname + "/home.html")
});

app.post("/signup", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/signupsubmit",function(req,res){
    const submit = new Submit({
    email: req.body.Email,
    password: req.body.Password,
    RollNum: req.body.Rollno
});
submit.save(function(err){
    if(err){
        console.log(err);
    }else{
        res.sendFile(__dirname + "/home.html")
    }
});
});

app.post("/loginsubmit", function(req,res){
    username =  req.body.Email;
    password =  req.body.Password;
    Submit.findOne({email: username}, function(err, foundUser){
        if(err){
            alert("your password is wrong")
        } else{
            if(foundUser) {
                if(foundUser.password === password){
                   res.render("loginsubmit")
                }
            }
        }
    })
})

app.post("/login", function(req,res){
    res.sendFile(__dirname + "/login.html");
});

app.listen(3000, function(){
    console.log("Server is running")
  });