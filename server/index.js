import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from "cors";
import router from './routes/userRouter.js';

const app = express();

app.use(cors());
dotenv.config();
app.use(bodyParser.json());
app.use('/api/v1/',router);

const PORT=process.env.PORT||8080;
const URL=process.env.MONGODB_URL;

mongoose.connect(URL).then(()=>{
    console.log("DB connection established!!");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });

}).catch(error=>console.log(error));
