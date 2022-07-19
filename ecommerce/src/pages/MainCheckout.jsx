import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {Elements} from "@stripe/react-stripe-js";

import Checkout from "../components/PaymentComponents/Checkout";

const publishableKey = `${process.env.REACT_APP_STRIPE_KEY}`
const stripePromise = loadStripe(publishableKey)

const MainCheckout = () => {

    const [clientSecret, setClientSecret] = useState("");
    const cart = useSelector(state => state.cart.products)
  
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("https://logo-ecommerce-app.herokuapp.com/api/checkout/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);
  
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };

    return (
      <>
        {
          clientSecret &&(
          <>
        <Elements options={options} stripe={stripePromise}>
            <Checkout/>
        </Elements>
      
      </>)};
      </>
 
  )};

export default MainCheckout