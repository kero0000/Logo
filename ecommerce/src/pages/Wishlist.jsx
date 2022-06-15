import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
import { removeWishlist } from "../redux/wishlistRedux";
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
    border:2px solid #4CAF50;
}
    ${mobile({ marginBottom: "20px"})}
`

const Hr = styled.hr`
    background-color:#eee;
    border:none;
    height:1px;
`
const Wishlist = () => {
    const wishlist = useSelector((state) => state.wishlist)
    const dispatch = useDispatch()

    const handleRemove = (product) => {
        dispatch(removeWishlist(product))
    }
    
    return(
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <Title> Wishlist</Title>
                <Top>
                    <TopTexts>
                        <TopText>Your Wishlist ({wishlist.quantity}) </TopText>
                    </TopTexts>
                </Top>
                <Bottom>
                    <Info>
                        {wishlist.products.map((product) => (
                            <Product>
                            <ProductDetail>
                                <Image src={product.img}/>
                                <Details>
                                    <ProductName><b>Product:</b> {product.title} </ProductName>
                                    <ProductColor color={product.color}/>
                                    {product.size.map((s) => (
                                        <ProductSize><b>Size: </b>{s}</ProductSize>))
                                    }
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductQuantityContainer>
                                    <ProductQuantity> Stock count: {product.inStock}</ProductQuantity>
                                </ProductQuantityContainer>
                                <ProductPrice>USD $ {product.price}</ProductPrice>
                                <RemoveProduct onClick={() => handleRemove(product)}>Remove from wishlist</RemoveProduct>
                            </PriceDetail>
                        </Product>
                        ))}
                        <Hr/>
                    </Info>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    );
}

export default Wishlist