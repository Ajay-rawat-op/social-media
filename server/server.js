import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
});
import express from 'express'
const app = express();
import PostRoute from './Routes/Post.route.js'
import { connectWithMongoose } from './DB/Connection1.db.js';
import cors from 'cors'

connectWithMongoose();
app.use(cors({
    origin:['http://localhost:3000'],
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/v1',PostRoute);

app.listen(8000, () => {
    console.log("http://localhost:8000")
})