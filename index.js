const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const { url } = require('inspector');

mongoose.set('strictQuery',false);
const app = express();
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb+srv://admin-naman:namansoni99@cluster0.nwubt4c.mongodb.net/submitDB", {useNewUrlParser: true, useUnifiedTopology: true});

const submitschema = new mongoose.Schema({
    name: String,
    class: String,
    RollNum: Number
});
const Submit = mongoose.model("Submit",submitschema);

Submit.updateOne({name: "Naman"}, {$set: {RollNum: 15}})


// Submit.deleteOne({name: "Naman"},function(err){
// if(err){
//     console.log(err)
// }else{
//     console.log("Successfully deleted")
// }
// });

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
    res.send("Thank you for your response");
   let total = {
     name : req.body.Name,
     claass : req.body.Class,
     rollno : req.body.Rollno
   };
    const submit = new Submit({
    name: total.name,
    class: total.claass,
    RollNum: total.rollno
});
submit.save();
app.get("/:topic",function(req,res){
    let topic = (req.params.topic);

    if(total.name === topic){
        res.send("Hello");
    }else{
        console.log("Doesn't exist");
    }
});
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);

app.listen(port, function(){
    console.log("Server is running")
  });