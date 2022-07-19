import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { PaymentElement} from "@stripe/react-stripe-js"
import { useDispatch, useSelector } from "react-redux"
import { setActiveStep } from '../../redux/checkoutRedux';
import { useState, useEffect } from 'react';
import {  useElements, useStripe } from '@stripe/react-stripe-js';


export default function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements();    
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const checkout = useSelector(state=>state.checkout)
  const activeStep = checkout.activeStep;
  const dispatch = useDispatch()

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1))
  }

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://logo-ecommerce-app.herokuapp.com/success",
      },
    },
    );

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
  
    setIsLoading(false);
  };



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>Payment method</Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
      <PaymentElement/>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
            onClick={handleBack} 
            sx={{ mt: 3, ml: 1 }}>
              Back
            </Button>
          
          <Button
            variant="contained"
            type="submit"
            //onClick={handleNext}
            sx={{ mt: 3, ml: 1 }}>
              Pay Now
          </Button>
        </Box>
    </Box>
    </React.Fragment>
  );
}