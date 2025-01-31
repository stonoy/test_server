import React, { useState } from 'react'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const Landing = () => {
  const {user} = useSelector(state => state.user)
  const [processing, setProssing] = useState(false)
  const [hasPaymentSucessful, setHasPaymentSuccessful] = useState(false)

  const verifyPayment = async() => {
    try {
      const resp = await customFetch.get("/payment/verify")

      if (resp?.data?.paymentReceived == "successful"){
        setHasPaymentSuccessful(true)
      }
    } catch (error) {
      console.log(error?.response?.data?.msg)
      toast.error(error?.response?.data?.msg)
    }
  }

  const initiatePayment = async(theType) => {
    setProssing(true)
    try {
      const resp = await customFetch.get(`/payment/initiate/${theType}`)

      // console.log(resp?.data)

      const {amount, key, id, notes: {name, email, type}} = resp?.data

      const options = {
        key, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: type,
        description: 'Test Transaction',
        order_id: id, // This is the order_id created in the backend
        
        prefill: {
          name,
          email,
        },
        theme: {
          color: '#F37254'
        },
        handler: verifyPayment,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
    setProssing(false)
  }

  return (
    <div className='flex justify-center items-center h-screen gap-4'>
      {
        ["gold", "silver", "admin"].includes(user?.role) || hasPaymentSucessful ?
        <h1>Welcome permium user</h1>
        :
        <>
          <button onClick={() => initiatePayment("gold")} disabled={processing} className='p-4 border-2 text-amber-600 text-2xl font-bold'>Gold</button>
          <button onClick={() => initiatePayment("silver")} disabled={processing} className='p-4 border-2 text-slate-600 text-2xl font-bold'>Silver</button>
        </>
      }
    </div>
  )
}

export default Landing