import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectMongoDB from "./db/connectMongoDB.js";
dotenv.config()

import userRoute from "./routes/user.route.js"
import contactRoute from "./routes/contact.route.js"

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/user', userRoute)
app.use('/api/contact', contactRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB()
})