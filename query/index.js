const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
//# posts data structure example
//   {
//     j543j32: {
//       id: "j543j32",
//       title: "post title",
//       comments: [
//         { id: "tg3fs24", content: "comment!" },
//         { id: "f2eds4", content: "comment2!" },
//       ],
//     },
//   };

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
    const {type,data} = req.body;

    if(type === "PostCreated"){
        const {id, title} = data;
        posts[id] = {
            id,
            title,
            comments:[]            
        }
    }

    if(type === "CommentCreated"){
        const {id, content, postId} = data;
        const post = posts[postId];

        post.comments.push({
            id,
            content,
            postId
        })

        posts[postId] = post;
    }

    res.send({});
});

app.listen(4002, () => {
  console.log("listening on 4002 [query service]");
});
