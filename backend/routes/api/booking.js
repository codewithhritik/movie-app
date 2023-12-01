// routes/booking.js
import express from "express"
import User from "../../models/User.js"
import Booking from '../../models/Booking.js'
import Movies  from '../../models/Movies.js'
import Theatre from '../../models/Theatre.js'
import ShowTiming from '../../models/ShowTiming.js';


const router = express.Router();

const convertSeatToString = (seat) => {
    // console.log(seat)
    const rowLabel = String.fromCharCode('A'.charCodeAt(0) + seat.rowIndex);
    const seatLabel = seat.seatIndex + 1; // Adding 1 to convert from 0-based index to 1-based seat number
    return `${rowLabel}${seatLabel}`;
}

router.post('/', async (req, res) => {
  try {
    const { user, movie, theatre, seats, ticketPrice, date, timing } = req.body;
    
    // console.log("Body ---->",req.body);
   
    const booking = new Booking({ user, movie, theatre, ticketPrice, date, timing, seats: [] });

    // console.log("Booking------------------------------------",booking);

    const movieObj = await Movies.findById(movie);
    const theatreObj = await Theatre.findById(theatre);
    console.log("THEATER OBJECT --->",theatreObj.timings[0]._id);
    const showTimingObj = await ShowTiming.findById(theatreObj.timings[0]); // Adjust this based on your actual data structure
    

    // console.log("MOVIE OBJECT --->",movieObj);
    // console.log("THEATER OBJECT --->",theatreObj);
    // console.log("SHOWTIMING OBJECT --->",showTimingObj);
    // console.log("Seats -->", seats);

    // const bookings = {};

    // Iterate through each seat and create a booking
    for (const seat of seats) {
        const { rowIndex, seatIndex } = seat;

        // // Update the booking object with seat information
        // booking.seats.push({
        //   seat: convertSeatToString(seat),
        //   status: 'unavailable',
        //   user,
        // });

        booking.seats.push(convertSeatToString(seat));
  
        // Find the relevant movie, theatre, and show timing
        


        // Find and update the specific seat
        const seatObj = showTimingObj.seats[rowIndex][seatIndex];
        seatObj.status = 'unavailable';
        seatObj.user = user;
  
        // Save the changes
        await movieObj.save();
        await theatreObj.save();
        await showTimingObj.save();
    }

    // console.log("BOOKING", booking)
    // Convert the bookings object into an array for response
    // const bookingsArray = Object.values(booking);
    // console.log("Bookings array --> ",bookingsArray);
    
    await booking.save();
    // const populatedBooking = await Booking.populate(booking, { path: 'user movie theatre timing' });
    // console.log("Populated Booking",populatedBooking);
    await User.updateOne({ _id: user }, { $push: { bookings: booking._id } });
    




    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;



// Create an object to store bookings
    // const bookings = {};

    // Iterate through each seat and create a booking
    // for (const seat of seats) {
    //     // const { rowIndex, seatIndex } = seat;

    //     // Update the booking object with seat information
    //     // booking.seats.push({
    //     //   seat: convertSeatToString(seat),
    //     //   status: 'unavailable',
    //     //   user,
    //     // });

    //     booking.seats.push(convertSeatToString(seat));
  
    //     // Find the relevant movie, theatre, and show timing
    //     const movieObj = await Movies.findById(movie);
    //     const theatreObj = await Theatre.findById(theatre);
    //     const showTimingObj = await ShowTiming.findById(theatreObj.timings[0]); // Adjust this based on your actual data structure
  

    //     console.log("MOVIE OBJECT --->",movieObj);
    //     console.log("THEATER OBJECT --->",theatreObj);
    //     console.log("SHOWTIMING OBJECT --->",showTimingObj);


    //     // // Find and update the specific seat
    //     // const seatObj = showTimingObj.seats[rowIndex][seatIndex];
    //     // seatObj.status = 'unavailable';
    //     // seatObj.user = user;
  
    //     // // Save the changes
    //     // await movieObj.save();
    //     // await theatreObj.save();
    //     // await showTimingObj.save();
    // }

    // Convert the bookings object into an array for response
    // const bookingsArray = Object.values(bookings);