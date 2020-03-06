const express = require("express");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newTest', {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
  console.log("We are connected");
});

let VocabularySchema = new mongoose.Schema({ 
    VocabularyString: String          
});

let vocabulary = mongoose.model("vocabulary", VocabularySchema);   

app.set('view engine', 'html');
app.use(express.static('public'));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/addVocabulary", (req, res)=>{
    let newVocabulary = new vocabulary({VocabularyString: req.body.vocabulary});
    newVocabulary.save(function(err){
            if(err) return console.log(err);
        });


   res.redirect("/");
});



app.listen(3000, function(){
    console.log("The server is running");  
});