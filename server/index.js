const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const sendMessageRouter = require('./routes/sendMessageRouter')
const config = require('config')
const PORT = config.get('serverPort')
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", sendMessageRouter)
const start = async () => {
    try {
       await mongoose.connect(config.get('dbUrl'))
        app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
    } catch (e) {
        console.error("DB connection failed", e)
        process.exit(1)
    }
}

start()