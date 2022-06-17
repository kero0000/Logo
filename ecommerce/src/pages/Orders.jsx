import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Navbar from "../components/Navbar"
import { getOrder } from "../redux/apiCalls";
import { userRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div``
const Wrapper = styled.div`
    padding:20px;
    ${mobile({ padding: "10px"})}
`
const Title = styled.h1`
    font-weight:300;
    text-align:center;
`
const Top = styled.div`
    padding:20px;
    display:flex;
    align-items:center;
    justify-content:space-between;
`

const TopButton = styled.button`
    padding:10px;
    font-weight:600;
    cursor:pointer;
    border:${(props)=>props.type==="filled" && "none"};
    background-color:${(props)=>props.type==="filled" ? "black" : "transparent"};
    color:${(props)=>props.type==="filled" && "white"};
    &:hover{
        background-color:#484848;
        border:2px solid #fcf5e1;
    }

`
const TopTexts = styled.div`
${mobile({ display: "none"})}`

const TopText=styled.span`
    text-decoration:underline;
    cursor:pointer;
    margin:0px 10px;
`
const Bottom = styled.div`
    display:flex;
    justify-content:space-between;
    ${mobile({ flexDirection: "column"})}
`

const Info=styled.div`
    flex:3;
`
const Order=styled.div`
    display:flex;
    justify-content:space-between;
    ${mobile({ flexDirection: "column"})}
`
const OrderDetail=styled.div`
    flex:2;
    display:flex;
`
const Image=styled.img`
    width:200px;
`
const Details=styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`
const OrderId=styled.span``
const OrderAmount=styled.span``
const OrderProducts=styled.span`
`
const OrderStatus = styled.span``


const Orders = () => {
    const accessToken = useSelector(state=>state.user.currentUser.accessToken)
    const id = useSelector(state=>state.user.currentUser._id)
    const [isLoading, setisLoading] = useState(true)
    const [orders, setOrders] = useState([]);

    useEffect( ()=>{
        const getProducts = async (accessToken, id) => {
            try{
                const userRequest = axios.create({baseURL:"https://logo-ecommerce-app.herokuapp.com/api",headers:{token:`Bearer ${accessToken}`}})
                const res = await userRequest.get(`/orders/find/${id}`)
                setOrders(res.data)
                setisLoading(false);
            }catch(err){}
        };
        getProducts(accessToken, id)
    },[]);


    return (
       <Container>
           <Navbar/>
           <Announcement/>
            <Wrapper>
                <Title>Order History</Title>
                {isLoading ? (
                    <div>Loading... Please wait for a moment.</div>
                ) :(
                    <>
                    {orders.map((order)=> (
                        <Order>
                            <OrderDetail>
                            <Image src="https://cdn-icons-png.flaticon.com/512/3500/3500833.png"/>
                                <Details>
                                    <OrderId><b>Order : </b>{order._id}</OrderId>
                                    <OrderStatus><b>Order Status: </b>{order.status}</OrderStatus>
                                    <OrderAmount><b>Amount: </b>USD ${order.amount}</OrderAmount>
                                    <OrderProducts>{order.products.map((product)=>(
                                        <div>
                                            <b>Products: </b>{product.title}
                                            <b>Qty: </b>{product.quantity}
                                            
                                        </div>))}
                                    </OrderProducts>
                                </Details>
                            </OrderDetail>  
                        </Order>
                        
                    ))}
                    </>
                )}
            </Wrapper>
       </Container>
    )
}

export default Orders