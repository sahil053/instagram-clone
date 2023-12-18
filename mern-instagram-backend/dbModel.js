import mongoose from "mongoose";

const instance = mongoose.Schema({
    caption: String,
    user: String,
    image: String,
    Comments: [],
});

export default mongoose.model('posts', instance);