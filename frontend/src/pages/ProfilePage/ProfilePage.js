import React, {useEffect, useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './ProfilePage.css'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Button from '../../components/Button/Button'
import BookingCard from '../../components/BookingCard/BookingCard'


const ProfilePage = () => {

  const userData = useSelector((state) => state.auth.user);
  console.log(userData);

  // const [rewardPoints, setRewardPoints] = useState(userData.rewardsPoints);
  // const [bookings, setBookings] = useState(userData.bookings);

  // useEffect(() => {
  //   // const bookings = userData.bookings
  //   setRewardPoints(userData ? userData.rewardsPoints : 0);
  //   setBookings(userData ? userData.bookings : [])
  // }, [])
  
  
  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div className='profile-user-info'>
          <h1>Hello, {userData ? userData.name : ''}</h1>
        </div>
        <div className='profile-reward-points'>
            <h1>Membership - {userData ? userData.membership === 'free' ? 'REGULAR' : 'PREMIUM' : ""}</h1>
        </div>
        <div className='profile-reward-points'>
            <h1>Reward Points - {userData ? userData.rewardsPoints : 0}</h1>
        </div>
        {/* <div className='toggle-btns'>
            <Button text={'Upcoming'} />
            <Button text={'History'} />
        </div> */}
        <div className='profile-booking'>
          {userData ? userData.bookings.reverse().map((booking) => {
            console.log(booking)
            return (
              <div key={booking._id}>
                  <BookingCard data={booking} />
              </div>
            )
          }) : ''}
        </div>
    </div>
  )
}




export default ProfilePage;
