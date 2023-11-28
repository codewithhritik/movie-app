import mongoose from "mongoose";
// import TheatreSchema from "./Theatre";

const TheatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    timings: [{
        type: String, // Assuming timings are represented as strings for simplicity
        required: true
    }]
});

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    theatres: [TheatreSchema]
})

export default mongoose.model("Movies", MovieSchema);