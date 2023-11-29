import mongoose from 'mongoose';
import MovieSchema from '../models/Movies.js';

async function connectAndUpdate() {
    // Replace with your MongoDB connection URI and database name
    const uri = "";
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Check if the Movies model has already been compiled
        let Movies;
        if (mongoose.models.Movies) {
            Movies = mongoose.model('Movies');
        } else {
            // If not, compile the model from the schema
            Movies = mongoose.model('Movies', MovieSchema);
        }

        // Define a default seating capacity
        const defaultSeatingCapacity = 90; // Modify this to what makes sense for your application

        // Update all theaters in all movies to have the default seating capacity
        const result = await Movies.updateMany(
            { "theatres.seatingCapacity": { $exists: false } }, // This matches documents where seatingCapacity does not exist
            { $set: { "theatres.$[].seatingCapacity": defaultSeatingCapacity } } // This sets a default seatingCapacity for all theaters
        );

        console.log(`${result.nModified} documents updated successfully`);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await mongoose.disconnect();
    }
}

connectAndUpdate().catch(console.error);