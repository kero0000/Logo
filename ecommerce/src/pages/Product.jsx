import { Add, Remove } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import { publicRequest } from "../requestMethods"
import { mobile } from "../responsive"
import { useDispatch } from "react-redux"
import { addProducts } from "../redux/cartRedux"
import { addWishlist } from "../redux/wishlistRedux"

const Container = styled.div`
`
const Wrapper = styled.div`
    padding:50px;
    display:flex;
    ${mobile({ padding: "10px", flexDirection:"column"})}
`
const ImgContainer = styled.div`
    flex:1;
`
const Image = styled.img`
    width:100%;
    height:90vh;
    object-fit:cover;
    ${mobile({ height: "40vh"})}
`
const InfoContainer = styled.div`
    flex:1;
    padding:0px 50px;
    ${mobile({ padding: "10px"})}
`
const Title = styled.h1`
    font-weight:200;
`
const Desc = styled.p`
    margin:20px 0px;

`
const Price = styled.span`
    font-weight:100;
    font-size:40px;
`
const Filter=styled.div`
    display:flex;
    align-items:center;
`
const FilterColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${(props)=>props.color};
    margin:0px 5px;
    cursor:pointer;
    border-color: #9ecaed;
    box-shadow: ${(props) => props.selected ? '0 0 10px #3366ff' :  'none'};


`
const FilterContainer=styled.div`
    display:flex;
    margin:30px 0px;
    width:50%;
    justify-content:space-between;
    ${mobile({ width: "100%"})}
`
const FilterTitle=styled.span`
    font-size:20px;
    font-weight:200;
`
const FilterSize=styled.select`
    margin-left:10px;
    padding:5px;
`
const FilterSizeOption=styled.option``
const AddContainer = styled.div`
    display:flex;
    align-items:center;
    width:50%;
    justify-content:space-between;
    ${mobile({ width: "100%"})}
`
const AmountContainer = styled.div`
    display:flex;
    align-items:center;
    font-weight:700;
`
const Amount = styled.span`
    width:30px;
    height:30px;
    border-radius:10px;
    border:1px solid teal;
    align-items:center;
    display:flex;
    justify-content:center;
    margin:0px 5px;
`
const Button = styled.button`
    padding:15px;
    border:1px solid teal;
    background-color:white;
    cursor:pointer;
    font-weight:500;
    
    display:flex;
    flex-direction:column;
    &:hover{
        background-color:#f8f4f4;
    }
`

const Product = () =>{
    const location = useLocation();
    const id = location.pathname.split("/")[2]; // Reference to id portion of URL (id is initially empty)
    const [product, setProduct] = useState({}); 
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();

    // this useEffect called to fetch the product according to id when the productId is obtained 
    // from changing the URL 
    useEffect(()=>{
        // Basically this function gets the single product and render the single product image, size, colors available in html below
        const getProduct = async()=>{
            try{
                const res = await publicRequest.get("/products/find/" +id)
                setProduct(res.data);
            }catch(err){}
        };
        getProduct()
    }, [id]);

    const handleQuantity = (type) => {
        if(type === "decrease" && quantity > 0){
            setQuantity(quantity - 1);
        }
        else if (type === "increase" ){
            if(product.inStock > quantity){
                setQuantity(quantity + 1);
            }
            else{
                alert("Stock limit reached")
            }
        }
    }
    const handleClickAddCart = () => {
        dispatch(
            addProducts({...product, quantity, color, size})
        );
        alert("This item has been added to your cart")
    }

    const handleWishlist = ()=>{
        dispatch(addWishlist({...product}))
        alert("This item has been added to your wishlist")
    }

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>
                        {product.desc}
                    </Desc>
                    <Price>USD $ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => (
                            <FilterColor color={c} selected = {color === c} key={c} onClick={() => setColor(c)} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map((s)=>(
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={()=>handleQuantity("decrease")}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={()=>handleQuantity("increase")}/>
                        </AmountContainer>
                        <Button onClick={handleClickAddCart}>Add to Cart</Button>
                        <Button onClick={handleWishlist}>Add to Wishlist</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter/>
            <Footer/>
        </Container>
    )
}

export default Product