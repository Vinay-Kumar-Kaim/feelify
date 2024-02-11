const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Post = require("./models/post.js")
const path = require('path')
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate')


app.set("view engine", "ejs")  //path ejs file
app.set("views", path.join(__dirname, 'views'));  // to run server from outside
app.use(express.static(path.join(__dirname, 'public/css'))) // path css file
app.use(express.static(path.join(__dirname, 'public/js'))) // path js file
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate) // ejs mate


// connecting mongo db
main().then(() => console.log('connection sucessfull')).catch((err) => console.log(err))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/feelify');
}

// main page

app.get("/feelify", async (req, res) => {
    const allPost = await Post.find({})
    res.render("mainpage.ejs", { allPost })
})
// get new form
app.get("/feelify/new", (req, res) => {
    res.render("new.ejs")
})


// create post or submit new form data
app.post("/feelify", async (req, res) => {
    const newPost = new Post(req.body.post)
    await newPost.save();
    res.redirect("/feelify")
})
// show route
app.get("/feelify/:id", async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.render("show.ejs", { post })


})


//edit route
app.get("/feelify/:id/edit", async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id)
    res.render("edit.ejs", { post })
})

//update route
app.patch("/feelify/:id", async (req, res) => {
    let { id } = req.params;
    await Post.findByIdAndUpdate(id, { ...req.body.post })
    res.redirect("/feelify")
})

app.delete("/feelify/:id", async (req, res) => {
    let { id } = req.params;
    await Post.findByIdAndDelete(id)

    res.redirect("/feelify")
})



app.listen(5000, () => {
    console.log("listening to port 5000");
})
