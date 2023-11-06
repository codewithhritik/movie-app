import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import moviesRoute from "./routes/api/movies.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT;

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Connected to MongoDB")
    } catch(error) {
        throw error
    }
}

// // Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

app.use("/api/movies", moviesRoute)

app.get("/", (req, res) => {
    res.send('API running')
})

app.listen(PORT, ()  => {
    connect()
    console.log(`Server started on port ${PORT}`)
});