import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from "../redux/cartRedux";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { setActiveStep } from '../redux/checkoutRedux';
import axios from 'axios';

const calculateOrderAmount = (items) => {
    let totalCost = items.reduce(function (acc, item) { return acc + (item.price*item.quantity); }, 0)
    return totalCost;
  };

const SuccessPayment = () => {
    const [orderId, setOrderId] = useState("")
    const currentUser = useSelector(state=>state.user.currentUser)
    const checkout = useSelector(state=>state.checkout);
    const cart = useSelector(state=>state.cart.products)
    const orderProducts = cart.map(function(item){return{productId:item._id, title:item.title, quantity:item.quantity, price:item.price}})
    const orderInfo = {userId:currentUser._id, customerName:checkout.customerName, products:orderProducts, amount:calculateOrderAmount(cart), address:checkout.address}
    const dispatch = useDispatch()


    useEffect(()=> {
        const createOrder = async (accessToken, orderInfo) => {
            try{
              const userRequest = axios.create({baseURL:"https://logo-ecommerce-app.herokuapp.com/api/",headers:{token:`Bearer ${accessToken}`}})
              const res = await userRequest.post("/orders", orderInfo)
              setOrderId(res.data)
              alert("Order Created!")
            }catch(err){
              alert("Order failed!")
            }
          }
        createOrder(currentUser.accessToken, orderInfo)
        dispatch(clearCart())   
        dispatch(setActiveStep(0))
    }, [])
        
        return (
        <>
            <Navbar/>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">Checkout</Typography>
                <React.Fragment>
                    <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                        Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                        Your order number is #{orderId}. We have emailed your order
                        confirmation, and will send you an update when your order has
                        shipped.
                    </Typography>
                    </React.Fragment>
                </React.Fragment>
            </Paper>
            </Container>
            <Footer />
        </>
        );
    }
    

export default SuccessPayment;