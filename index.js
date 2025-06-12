import express from 'express'
import dotenv from "dotenv"
import bodyParser from 'body-parser'
import cors from "cors"
import preditRouter from './router/predit-router.js'
import { spawn } from "child_process"


import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
// router
import authRouter from './router/auth-router.js'

const app = express()
const port = process.env.PORT || 4000;
dotenv.config()

connectDB();


// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  cors({
    origin: ["https://eduwise-ten.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

// Router
 app.use("/api/auth", authRouter)
 app.use("/api/predict", preditRouter)


// Router
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})