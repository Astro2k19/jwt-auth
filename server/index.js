const dotenv = require('dotenv')
const express = require('express')
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require('./routers/index.js')
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cors = require('cors')
const credentials = require("./middlewares/credentials");
dotenv.config()

const app = express()
app.use(credentials)
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(morgan('combined'))

app.use('/', router)

app.use('*', (req, res) => {
    res.status(404).json('Not Found!')
})

app.use(errorMiddleware)

const startApp = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(process.env.PORT, () => {
            console.log(`server is running on ${process.env.PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

startApp()
