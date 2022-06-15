

import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import {Elements} from "@stripe/react-stripe-js";
import Payment from "../../components/Payment";

const Container = styled.div `
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 16px;
-webkit-font-smoothing: antialiased;
display: flex;
justify-content: center;
align-content: center;
height: 100vh;
width: 100vw;
`

const Form = styled.form`
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
`

const Button = styled.button`
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
    margin-top:10%

   &:hover {
      filter: contrast(115%);
    }
    
   &:disabled {
      opacity: 0.5;
      cursor: default;

    }
      
}
`
const Input = styled.input`
  width: 100%;
  padding: 12px 10px;
  margin: 8px 10px;
  box-sizing: border-box;
  transition: width 0.4s ease-in-out;
`
const PaymentMessage = styled.div`
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
`

const Spinner = styled.div`
    color: #ffffff;
    border-radius: 50%;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);

  &:after{
    border-radius: 50%;
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
    position: absolute;
    content: '';
}

  &:before{
    position: absolute;
    content: '';
    border-radius: 50%;
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
`
const publishableKey = `${process.env.REACT_APP_STRIPE_KEY}`
console.log(publishableKey)
const stripePromise = loadStripe(publishableKey)

const CheckOut = () => {

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
      <Container>
        {
          clientSecret &&(
          <>
        <Elements options={options} stripe={stripePromise}>
            <Payment/>
        </Elements>
      
      </>)};
      </Container>
 
  )};

export default CheckOut