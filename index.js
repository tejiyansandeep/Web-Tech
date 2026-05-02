const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/blogDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const Post = mongoose.model("Post", {
    title: String,
    content: String
});

app.post("/posts", async (req, res) => {
    const post = await Post.create(req.body);
    res.json(post);
});

app.get("/posts", async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.get("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
});

app.put("/posts/:id", async (req, res) => {
    const post = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(post);
});

app.delete("/posts/:id", async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.get("/", (req, res) => {
    res.send("Amit's Blog API");
});

app.get("/", (req, res) => res.send("Mongo API Running"));

app.get("/api/message", (req, res) => {
    res.json({
        message: "Hello from backend" });
});
 
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});