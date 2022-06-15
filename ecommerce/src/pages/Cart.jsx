import styled from "styled-components";
import React, { useEffect } from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeProducts } from "../redux/cartRedux";

const KEY = process.env.REACT_APP_STRIPE_KEY;


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
const Product=styled.div`
    display:flex;
    justify-content:space-between;
    ${mobile({ flexDirection: "column"})}
`
const ProductDetail=styled.div`
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
const ProductName=styled.span``
const ProductColor=styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${props=>props.color};
`
const ProductSize=styled.span`

`
const PriceDetail=styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`
const ProductQuantityContainer = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:20px;
`
const ProductQuantity = styled.div`
    font-size:24px;
    margin:5px;
    ${mobile({ margin: "5px 15px"})}
`
const ProductPrice = styled.div`
    font-size:30px;
    font-weight:200;
    ${mobile({ marginBottom: "20px"})}
`

const Hr = styled.hr`
    background-color:#eee;
    border:none;
    height:1px;
`

const Summary = styled.div`
    flex:1;
    border: 0.5px solid lightgray;
    border-radius:10px;
    padding:20px;
    height:50vh;
`
const SummaryTitle = styled.h1`
    font-weight:200;
`
const SummaryItem = styled.div`
    margin:30px 0px;
    display:flex;
    justify-content:space-between;
    font-weight:${props=>props.type === "Total" && "500"};
    font-size:${props=>props.type === "Total" && "24px"};

`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``

const Button = styled.button`
    width:40%;
    padding:10px;
    margin:40px 50px;
    background-color:black;
    color:white;
    font-weight:600;
    cursor:pointer;
    &:hover{
        background-color:#484848;
        border:2px solid ;
    }
`

const RemoveProduct = styled.button`
color: white;
background-color: #008CBA;
padding: 8px 6px;
text-align: center;
display: inline-block;
font-size: 14px;
cursor:pointer;
margin-top:25px;
&:hover{
    background-color:#417dc1;
    border:2px solid;
}
    ${mobile({ marginBottom: "20px"})}
`

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector(state =>state.user.currentUser.username)

    const handleContinueShopping = () => {
        navigate('/')
    }

    const handleRemove = (product) => {
        dispatch(removeProducts(product))
    }

    const handleCheckOut = () => {
        navigate(`/checkout/${username}`)
    }


    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton onClick={handleContinueShopping}>Continue Shopping</TopButton>
                    <TopTexts>
                        <TopText>Your Wishlist </TopText>
                    </TopTexts>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product) => (
                            <Product>
                            <ProductDetail>
                                <Image src={product.img}/>
                                <Details>
                                    <ProductName><b>Product:</b> {product.title} </ProductName>
                                    <ProductColor color={product.color}/>
                                    <ProductSize><b>Size: </b>{product.size}</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductQuantityContainer>
                                    <ProductQuantity>{product.quantity}</ProductQuantity>
                                </ProductQuantityContainer>
                                <ProductPrice>USD $ {product.price *product.quantity}</ProductPrice>
                                <RemoveProduct onClick={() => handleRemove(product)}>Remove from cart</RemoveProduct>
                            </PriceDetail>
                        </Product>
                        ))}
                        <Hr/>
                    </Info>
                    <Summary>
                        <SummaryTitle>Order Summary</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>USD $ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>USD$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>- USD $5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem  type="Total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>USD ${cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <Button onClick={handleCheckOut}>CHECKOUT NOW</Button>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default Cart;