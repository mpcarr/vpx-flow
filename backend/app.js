var express = require("express");
var cors = require('cors')
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());


app.get("/", function(req, res) {
    console.log("Sending Result");
    res.status(200).send(code);
});

app.post("/", function(req, res) {

    let code = '';
    for(const sub of req.body)
    {
        code+=sub.code
    }

    console.log(code);
    fs.writeFile("flow.vbs", code, ()=>{
        console.log("done");
    });
    res.status(200).send(true);
});

app.listen(8000, function(){
    console.log("server has started");
});