import mongoose from 'mongoose';
import cors from "cors"
import dotenv from "dotenv"
// import mongoose from "mongoose"
import MovieSchema from '../models/Movies.js';

// console.log(Movie);
// const mongoose = require('mongoose');

async function connectAndUpdate() {
    const uri = ""; // Replace with your MongoDB connection URI and database name
    await mongoose.connect(uri);

    try {
        const Movies = mongoose.model('Movies', MovieSchema); // Assuming you have defined the movieSchema

        // Define the common timings array
        const commonTimings = ['15:40', '17:20', '8:40', '21:00'];

        // Update documents without the theatres field
        const result = await Movies.updateMany(
            { theatres: { $exists: false } }, // Filter for documents without the theatres field
            {
                $set: {
                    theatres: [
                        { name: 'San Jose', location: 'California', timings: commonTimings },
                        { name: 'San Francisco', location: 'California', timings: commonTimings },
                        { name: 'New York', location: 'New York', timings: commonTimings },
                    ],
                },
                // You can modify this update statement based on your specific needs
            }
        );

        console.log(`${result.nModified} documents updated successfully`);
    } finally {
        await mongoose.disconnect();
    }
}

connectAndUpdate().catch(console.error);


