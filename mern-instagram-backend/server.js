import mongoose from "mongoose";
import cors from 'cors';
import express from "express";
import Pusher from "pusher";
import dbModel from "./dbModel.js";


//app config
const app = express();
const port = process.env.PORT || 8080;

const pusher = new Pusher({
  appId: "1726125",
  key: "ad07eafb790e0d83b636",
  secret: "228d1e375fa61be23e9f",
  cluster: "ap2",
  useTLS: true
});

// middlewares

app.use(express.json());
app.use(cors());

//DB config
const connect_url = 'mongodb+srv://sahilsinghiscool:sahilsinghcool@cluster0.99q6n1c.mongodb.net/mern-instagram?retryWrites=true&w=majority'
mongoose.connect(connect_url,{
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open',()=>{
    console.log('DB Connected');

    const changeStream = mongoose.connection.collection('posts').watch()

    changeStream.on('change', (change) => {
         console.log('Change Triggered on pusher...')
         console.log(change)
         console.log('End of Change')

         if (change.operationType === 'insert'){
            console.log('Triggering Pusher ***IMG UPLOAD***')

            const postDetails = change.fullDocument;
            pusher.trigger('posts', 'inserted', {
                user: postDetails.user,
                caption: postDetails.caption,
                Image: postDetails.image
            })
         }  else{
            console.log('Unknown trigger from Pusher');
         }
    })
});


//api routes
app.get('/',(req,res) => res.status(200).send('hello world'));

app.post('/upload', async (req, res) => {
    try {
        const body = req.body;

        const data = await dbModel.create(body);
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/sync', async (req, res) => {
    try {
        const data = await dbModel.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

//listen
app.listen(port,()=> console.log(`listening on localhost:${port}`));





