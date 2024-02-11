const mongoose = require('mongoose');

main().then(()=>console.log(`database connection successful`))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/feelify');
}

// creating Schema

const postSchema= new mongoose.Schema({
    username:String,
    title:String,
    content:String
})

// creating model
const Post= mongoose.model("post",postSchema);

module.exports=Post;
