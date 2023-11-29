import React from 'react'
import './PaymentSuccess.css'
import Button from '../../components/Button/Button'
import Icon from '@mdi/react';
import { mdiCheckCircle } from '@mdi/js';

const PaymentSuccess = () => {
  return (
    <div className='payment-success'>
      <div className='payment-success-container'>
        <div className='payment-success-title'>
          Payment Success
        </div>
        <div className='payment-success-logo'>
          <Icon path={mdiCheckCircle} size={9} />
        </div>
        <div className='payment-success-buttons'>
          <div className='payment-success-viewticket'>
            <Button text={'View Ticket'}/>
          </div>
          <div className='payment-success-viewticket'>
            <Button text={'Back To Home Page'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
