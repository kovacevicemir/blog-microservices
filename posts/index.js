const express = require("express");
const bodyParser = require("body-parser")
const {randomBytes} = require("crypto");

const app = express();
app.use(bodyParser.json());

//fake database for practice
const posts = {}

app.get("/posts", (req,res)=>{
    res.send(posts);
});

app.post("/posts",(req,res)=>{
    //random id
    const id = randomBytes(4).toString("hex");
    const {title} = req.body;

    posts[id] = {
        id,title
    };

    res.status(201).send(posts[id]);
})

app.listen(4000, ()=>{
    console.log('Listening on 4000 [posts service]');
})