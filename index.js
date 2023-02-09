import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";


import apiKey  from "./router/ApiKey.js"

dotenv.config();
connectDatabase();
const app = express();


app.use(express.json())
app.use(cors({
    credentials: true
}))

app.use('/api/v1/apiKey', apiKey)


app.listen(process.env.PORT || 5000, () =>
    console.log(`Server started on ${process.env.PORT}`)
);