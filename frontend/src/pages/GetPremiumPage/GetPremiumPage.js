import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './GetPremiumPage.css'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom';

function GetPremiumPage() {
  const navigate = useNavigate();

  const getPremium = () => {
    navigate('/payment-success');
  }

  return (
    <div>
      <Navbar />
      <div className="get-premium-container">
        <div className="get-premium-card">
            <h1 className="premium-text">Premium Membership</h1>
            <div className="transaction-details">
                <div className="detail">
                    <span>Transaction Detail</span>
                    <span>$15.00</span>
                </div>
                <div className="detail">
                    <span>Premium Membership (1 Year)</span>
                </div>
                <hr />
                <div className="total-payment">
                    <span>Total payment</span>
                    <span>$15.00</span>
                </div>
                </div>
                <div className="button-container" onClick={getPremium}>
                    <Button text='Get Premium' />
                </div>
            </div>
      </div>
    </div>
  )
}

export default GetPremiumPage
