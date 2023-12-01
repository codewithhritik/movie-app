import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './BookingConfirmation.css'
// import { useNavigate } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom';
import convertSeatToString from '../../utility/convertSeatToString';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Button from '../../components/Button/Button';

const BookingConfirmation = () => {

    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.user) || '';
    console.log(userData);

    const location = useLocation();
    console.log(location.state);
    const movie = location.state?.movie;
    const timing = location.state?.timing;
    const theatreName = location.state?.theatre;
    const theatre = location.state?.movie.theatres.filter((t) => t.name === theatreName);
    // console.log(theatre);
    const discount_before_6pm = theatre.discount_before_6pm;
    const discount_on_Tuesdays = theatre.discount_on_Tuesdays;
    const seats = location.state?.seats;
    const selectedSeats = location.state?.selectedSeats;
    const date = location.state?.date;
    console.log(date);
    
    
    

    const handleRewardUse = () => {
        setUseRewardPoints(!useRewardPoints)
    };

    const handleConfirmPayment = async () => {
        const user = userData._id; // Replace with the actual user ID
        const currentMovie = movie._id; // Replace with the actual movie ID
        console.log("DATE -->", timing);
        const currentTheatre = theatre[0]._id;
        const ticketPrice = total // Replace with the actual theatre ID
        // const ticketPrice = 10; 

        console.log("User -->",user)
        console.log("currentMovie -->",currentMovie);
        console.log("currentTheatre -->",currentTheatre);
        console.log("TicketPrice", ticketPrice);
        console.log(selectedSeats);

        axios.post('http://localhost:8000/api/booking', {
            user: user,
            movie: currentMovie,
            theatre: currentTheatre,
            seats: selectedSeats,
            ticketPrice: ticketPrice,
            date: date,
            timing: timing
        }).then(response => {
            console.log('Booking response:', response.data);
            navigate('/payment-success')
            // Update your Redux store with the booking data if needed
          })
          .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
            // Handle errors appropriately
        });

    }

    const [useRewardPoints, setUseRewardPoints] = useState(false);

    
    // useEffect(() => {
    //   setTotalPayment(calculateTotalPayment());
    // }, [])
    
    const [total, setTotal] = useState(0);
    const [remainingRewardPoints, setRemainingRewardPoints] = useState(0);

    const updateTotalAndPoints = () => {
        const onlineServiceFee = userData.membership === 'free' ? (1.50 * selectedSeats.length) : 0;
        const baseTotal = 15.00 * selectedSeats.length + onlineServiceFee;
        const rewardPointsUsed = useRewardPoints ? Math.min(baseTotal, userData.rewardsPoints) : 0;
        const newTotal = Math.max(baseTotal - rewardPointsUsed, 0);
        const newRemainingPoints = useRewardPoints ? Math.max(userData.rewardsPoints - rewardPointsUsed, 0) : userData.rewardsPoints;
        setRemainingRewardPoints(newRemainingPoints);
        setTotal(newTotal);
        // console.log(newRemainingPoints);
        
      };
    
      // Update totals and points whenever relevant values change
      useEffect(() => {
        updateTotalAndPoints();
      }, [selectedSeats, useRewardPoints, userData]);

  return (
    <div className='booking-confirmation'>
        <div className='booking-detail'>
            <h1>Booking Detail</h1>
            <h2>Schedule</h2>
        </div>
        <div className='movie-title-container'>
            <div className='movie-title-header'>
                Movie Title :
            </div>
            <div className='movie-title'>
                {movie.title}
            </div>
        </div>
        <div className='booking-confirmation-date'>
            <div className='movie-title-header'>
                Date
            </div>
            <div className='movie-title'>
                {date}, 2023
            </div>
        </div>
        <div className='tickets'>
            <p>
                Tickets {`(${selectedSeats.length})`}
            </p>
            <p>Hours</p> 
        </div>
        <div className='ticket-details'>
            <div className='seat-numbers'>
                {selectedSeats.map((seat, id) => {
                    return(
                        <div key={id}>
                            {convertSeatToString(seat)}
                        </div>
                    )
                })}
            </div>
            <div>
                {timing.timing}
            </div>
        </div>
        <div className='transaction'>
            <div className='transaction-detail'>
                Transaction Detail 
            </div>
            <div className='regular-seat'>
                <div>
                    REGULAR SEAT
                </div>
                <div>
                    $15.00 x {selectedSeats.length}
                </div>
            </div>
            <div className='online-service-fee'>
                <div>
                    Online Service Fee
                </div>
                <div>
                    {userData.membership === 'free' ? `$1.50 x ${selectedSeats.length}` : `0`}
                </div>
            </div>
            <div className='total-payment'>
                <div className='total'>Total Payment</div>
                <div>
                    {`$${total}`}
                </div>
            </div>
            <div className='reward-points'>
                Reward Points 
                <div>
                {`${remainingRewardPoints}`}
                </div>
            </div>
            <div className='confirm-btn'>
                <div onClick={handleRewardUse}>
                    <Button text={useRewardPoints ? `Don't use Reward Points` : 'Use Reward Points'} />
                </div>
                <div onClick={handleConfirmPayment}>
                    <Button className="btn" text={'Confirm payment'}/>
                </div>
            </div>
            </div>
            
        </div>
   
  )
}

export default BookingConfirmation
