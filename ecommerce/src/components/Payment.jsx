
import { PaymentElement, 
    useStripe,
    useElements} from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { createOrder } from "../redux/apiCalls"
//import './CheckOut.module.css'

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
const calculateOrderAmount = (items) => {
    let totalCost = items.reduce(function (acc, item) { return acc + (item.price*item.quantity); }, 0)
    return totalCost;
  };

  
const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState("")
    const cart = useSelector(state=>state.cart.products)
    const orderProducts = cart.map(function(item){return{productId:item._id, title:item.title, quantity:item.quantity}})
    const currentUser = useSelector(state=>state.user.currentUser)
    const orderInfo = {userId:currentUser._id, products:orderProducts, amount:calculateOrderAmount(cart), address:address}


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
      localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
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
      <Container>
        <Form onSubmit={handleSubmit}>     
          <PaymentElement id="payment-element"/>
          <style>{"\
              .payment-element {\
                margin-bottom: 24px;}\
                "} 
                </style>
          <div>Address</div>
            <Input id= "address" type="text" placeholder="Address..." onChange={(e)=>setAddress(e.target.value)}/>
          <div>Postal Code</div>
          <Input id="postalcode" type="text" placeholder="Postal Code"/>
          <Button disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
              {isLoading ? <Spinner></Spinner> : "Pay now"}
            </span>
          </Button>
          {/* Show any error or success messages */}
          {message && <PaymentMessage>{message}</PaymentMessage>}
        </Form>
      </Container>
    );
}

export default Payment