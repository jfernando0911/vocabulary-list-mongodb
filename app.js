const express = require("express");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/phraseSaver', { useNewUrlParser: true } );


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
  console.log("We are connected");
});

let VocabularySchema = new mongoose.Schema({ 
    VocabularyString: String          
});

let vocabulary = mongoose.model("vocabulary", VocabularySchema);   


app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get("/", function(req, res){
    vocabulary.find({}, function (err, word) {
   
        if (err) return handleError(err);
        res.render("index.ejs", {word});
        
       
    });
});

app.post("/addVocabulary", (req, res)=>{

    vocabulary.create({ VocabularyString: req.body.vocabulary }, function (err, small) {
        if (err) return handleError(err);
        // saved!
        console.log(small);
      });
    
    res.redirect("/");
    
});





app.listen(3000, function(){
    console.log("The server is running");  
});