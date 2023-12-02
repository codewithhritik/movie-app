import express from "express"
import Booking from "../../models/Booking.js"

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user')
            .populate('movie')
            .populate('theatre')
            
        res.status(200).json(bookings)
    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.get("/analytics-dashboard-30", async (req, res) => {
    const daysAgo = 30; // or 60, 90 based on the requirement
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);

    try {
        const analyticsData = await Booking.aggregate([
            {
                $lookup: {
                    from: "theatres",
                    localField: "theatre",
                    foreignField: "_id",
                    as: "theatreData"
                }
            },
            {
                $lookup: {
                    from: "movies",
                    localField: "movie",
                    foreignField: "_id",
                    as: "movieData"
                }
            },
            {
                $unwind: "$theatreData"
            },
            {
                $unwind: "$movieData"
            },
            {
                $group: {
                    _id: {
                        theatreName: "$theatreData.name",
                        movie: "$movieData.title"
                    },
                    totalBookings: { $sum: 1 },
                    totalSeatsBooked: { $sum: { $size: "$seats" } }
                }
            },
            {
                $sort: {
                    "_id.theatreName": 1,
                    "_id.movie": 1
                }
            }
        ]);

        res.status(200).json(analyticsData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

export default router