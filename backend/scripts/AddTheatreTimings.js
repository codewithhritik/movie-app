
import mongoose from 'mongoose';
// import Movies from '../models/Movies.js';
import Movies from '../models/Movies.js'
import Theatre from '../models/Theatre.js';
import ShowTiming from '../models/ShowTiming.js';

// function createSeatsMatrix(seatingCapacity) {
//     const rows = Math.ceil(seatingCapacity / 10); // Each row can have 10 seats
//     const seatsMatrix = [];

//     const convertSeatToString = (seat) => {
//         // console.log(seat)
//         const rowLabel = String.fromCharCode('A'.charCodeAt(0) + seat.rowIndex);
//         const seatLabel = seat.seatIndex + 1; // Adding 1 to convert from 0-based index to 1-based seat number
//         return `${rowLabel}${seatLabel}`;
//     }
//     // Loop through rows
//     for (let i = 0; i < rows; i++) {
//         const seatsRow = [];
  
//         // Loop through seats in a row
//         for (let j = 0; j < 10; j++) {
//             // Calculate the seat number
//             const seatNumber = convertSeatToString({ rowIndex: i, seatIndex: j });

//             // Create a seat object with initial values
//             const seat = {
//                 seatNumber,
//                 status: 'available',
//                 user: null, // Initially, no user is assigned
//             };
  
//             // Add the seat object to the row
//             seatsRow.push(seat);
//         }
  
//         // Add the row to the seats matrix
//         seatsMatrix.push(seatsRow);
//     }
//     // console.log(`For ${seatingCapacity} this is the seatsMatrix --> ${seatsMatrix}`)
//     return seatsMatrix;
// }

function createSeatsMatrix(seatingCapacity) {
    const rows = Math.ceil(seatingCapacity / 10); // Each row can have 10 seats
    const seatsMatrix = [];
  
    // Loop through rows
    for (let i = 0; i < rows; i++) {
      const seatsRow = [];
  
      // Loop through seats in a row
      for (let j = 0; j < 10; j++) {
        // Create a seat object with an initial status of 'available'
        const seat = { status: 'available', seatNumber: convertSeatToString({ rowIndex: i, seatIndex: j }), user: null };
  
        // Add the seat object to the row
        seatsRow.push(seat);
      }
  
      // Add the row to the seats matrix
      seatsMatrix.push(seatsRow);
    }
  
    return seatsMatrix;
  }

// Assuming convertSeatToString is defined as you provided
const convertSeatToString = (seat) => {
    // console.log(seat)
    const rowLabel = String.fromCharCode('A'.charCodeAt(0) + seat.rowIndex);
    const seatLabel = seat.seatIndex + 1; // Adding 1 to convert from 0-based index to 1-based seat number
    return `${rowLabel}${seatLabel}`;
}

async function connectAndUpdate() {
    const uri = "mongodb+srv://orientalsquad202:orientalsquad202@movieapp.dh2z3qm.mongodb.net/movie_theater?retryWrites=true&w=majority"; // Replace with your MongoDB connection URI
    await mongoose.connect(uri);

    try {
        async function populateSeats() {
            const showTimings = await ShowTiming.find();
            // console.log(showTimings[0].seats);
            for (const timing of showTimings) {
                console.log(timing)
                // Create a new seats matrix based on your logic
                const seatsMatrix = createSeatsMatrix(90);  // Use your logic to determine seating capacity
                // console.log(seatsMatrix)
                // Update the timing's seats with the newly created matrix
                timing.seats = seatsMatrix;
          
                // Save the updated timing to the database
                await timing.save();
              }
            // // Loop through each theatre
            // for (const theatre of theatres) {
            //     // Loop through each show timing in the theatre
            //     for (const showTiming of theatre.timings) {
            //     // Find the timing document based on the show timing's ID
            //     const timing = await ShowTiming.findById(showTiming._id);
            //     // console.log("Timing -->",timing.seats);
            //     if (timing) {
            //         // Create a new seats matrix based on seating capacity
            //         const seatsMatrix = createSeatsMatrix(theatre.seatingCapacity);

            //         console.log(seatsMatrix)
            //         // Update the timing's seats with the newly created matrix
            //         timing.seats = seatsMatrix;

            //         // console.log(timing.seats)
            //         // Save the updated timing to the database
            //         await timing.save();
            //     }
            //     }
            // }
            // Loop through each theatre
            // for (const theatre of theatres) {
            //     // Loop through each show timing in the theatre
            //     for (const showTiming of theatre.timings) {
            //         // Create a new seats matrix based on seating capacity
            //         const seatsMatrix = createSeatsMatrix(theatre.seatingCapacity);
            //         // console.log(seatsMatrix)
            //         // Update the show timing's seats with the newly created matrix
            //         showTiming.seats = seatsMatrix;
            //         // console.log(showTiming.seats)
            //         // Save the updated showTiming to the database
            //         await showTiming.save();
            //     }
            // }

        }
        // Find all theatres
        // const theatres = await Theatre.find();
        // console.log(theatres);
        // const movies = await Movies.find().populate({
        //     path: 'theatres',
        //     populate: {
        //       path: 'timings',
        //     },
        //   });
        //   console.log(movies[0].theatres[0].timings[0].seats);



        // const theatres = await Theatre.find().populate('timings');
        // // console.log(theatres[0].timings[0].seats)

        // // Loop through each theatre
        // for (const theatre of theatres) {
        //     // Loop through each timing in the theatre
        //     for (const timing of theatre.timings) {
        //     // Create a new seats matrix based on seating capacity
        //     const seatsMatrix = createSeatsMatrix(theatre.seatingCapacity);
        //     // console.log(seatsMatrix);
        //     // console.log("Timing -->",timing)

        //     // Update the timing's seats with the newly created matrix
        //     timing.seats = seatsMatrix;
        //     // console.log(timing.seats)
        //     }
        //     // console.log(theatre.timings[0].seats);
        //     // Save the updated theatre to the database
        //     await theatre.save();
        // }
        // await theatres.save();
        

        // console.log(theatres[0].timings[0].seats)

        // console.log(theatres[0].timings[0]);
        // for (const timing of showTimings) {
        //     timing.seats = timing.seats.map((seat, index) => ({
        //         user: seat.user || null, // Populate user if available
        //         status: seat.status || 'available', // Set a default status if not available
        //         seatNumber: seat.seatNumber || convertSeatToString({ rowIndex: Math.floor(index / 10), seatIndex: index % 10 }),
        //     }));
        
        //     console.log(showTimings[0]);
            // console.log(timing);
        // timing.seats = timing.seats.map((seat) => ({
        //     user: seat.user, // Populate user if available
        //     status: seat.status || 'available', // Set a default status if not available
        //     seatNumber: seat.seatNumber || '', // Set a default seat number if not available
        // }));

        // await timing.save();
        // }


        // console.log(theatres);
        // Iterate through each theatre
        // for (const theatre of theatres) {
        //   const updatedTimings = [];
        //   const updatedShowTimings = [];
        //   const defaultTimings = ['12:40', '15:30', '18:10', '20:45'];
        // //   console.log(theatre);
        //   // Iterate through existing timings
        //   for (const timing of defaultTimings) {
        //     // Create a new ShowTiming object
        //     const newTiming = new ShowTiming({
        //       timing,
        //       seats: createSeatsMatrix(theatre.seatingCapacity),
        //     });
    
        //     // Save the new timing to the database
        //     const savedTiming = await newTiming.save();
    
        //     // Add the ObjectId of the new timing to the updated timings array
        //     updatedTimings.push(savedTiming._id);
    
        //     // Add the new timing object to the updated showTimings array
        //     updatedShowTimings.push(savedTiming);
        //   }

        //   console.log("Updated Timings ----->", updatedTimings);
        //   console.log("Updated ShowTimings ---->", updatedShowTimings)
    
        //   // Update the timings field in the theatre document
        //   theatre.timings = updatedTimings;
    
        //   // Update the showTimings field in the theatre document
        //   theatre.showTimings = updatedShowTimings;
    
        //   // Save the updated theatre document
        //   await theatre.save();
        // }
        await populateSeats();
        console.log('Theatres updated successfully.');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}


connectAndUpdate().catch(console.error);


// import mongoose from 'mongoose';


// import cors from "cors"
// import dotenv from "dotenv"
// // import MovieSchema from '../models/Movies.js';
// import Movies from '../models/Movies.js';

// // console.log(Movie);
// // const mongoose = require('mongoose');

// // const Movies = mongoose.model('Movies')

// async function connectAndUpdate() {
//     const uri = "mongodb+srv://orientalsquad202:orientalsquad202@movieapp.dh2z3qm.mongodb.net/movie_theater?retryWrites=true&w=majority"; // Replace with your MongoDB connection URI and database name
//     await mongoose.connect(uri);

//     try {
//         console.log("Movies -- > ",Movies);
//         const MovieSchema = mongoose.Schema;
//         console.log("Movies Schema -->", MovieSchema);
//         const Movies = mongoose.model('Movies', MovieSchema); // Assuming you have defined the movieSchema

//         // Define the common timings array
//         const commonTimings = ['15:40', '17:20', '8:40', '21:00'];

//         // Update documents without the theatres field
//         const result = await NewMovies.updateMany(
//             { theatres: { $exists: true } }, // Filter for documents without the theatres field
//             {
//                 $set: {
//                     theatres: [
//                         { name: 'San Jose', location: 'California', timings: commonTimings },
//                         { name: 'San Francisco', location: 'California', timings: commonTimings },
//                         { name: 'Las Vegas', location: 'Las Vegas', timings: commonTimings },
//                     ],
//                 },
//                 // You can modify this update statement based on your specific needs
//             }
//         );

//         console.log(`${result.nModified} documents updated successfully`);
//     } finally {
//         await mongoose.disconnect();
//     }
// }

// connectAndUpdate().catch(console.error);


