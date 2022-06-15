import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'
import styled from "styled-components";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from "../redux/cartRedux";
import { createOrder } from "../redux/apiCalls";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    height: 70vh;
    width: 100vw;
`
const MessageContainer = styled.div`
    
`
const Message = styled.div`
    font-size:200%
`



const SuccessPayment = () => {
    const navigate = useNavigate()
    const currentUser = useSelector(state=>state.user.currentUser)
    const dispatch = useDispatch()
    const orderInfo = localStorage.getItem('orderInfo')
    ? JSON.parse(localStorage.getItem('orderInfo'))
    : [];


    useEffect(()=> {

        createOrder(currentUser.accessToken, orderInfo);
        dispatch(clearCart())
        localStorage.removeItem('orderInfo')
        setTimeout(()=> {
            navigate('/')
        }, 5000)
    }, [])

    return (
        <Container>
            <MessageContainer>
                <CheckCircleRoundedIcon style={{color:'green',fontSize:'150px', display:'flex', alignItems: 'center',
                    justifyContent: 'center',height: '30vh',}}/>
                <Message>Payment is Successful!</Message>
                <Message>Wait a moment, you will be redirected shortly</Message>
            </MessageContainer>
        </Container>
    )
}

export default SuccessPayment;