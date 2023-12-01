import Theatre from "./Theatre";
import Movies from "./Movies";
import User from "./User";

const BookingSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movies',
      required: true,
    },
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theatre',
      required: true,
    },
    seat: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    showTimings: {
        
    }

  });
  
//   const Booking = mongoose.model('Booking', BookingSchema);
export default mongoose.model('Booking', BookingSchema);
  

