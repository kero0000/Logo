import { FavoriteBorder,  SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import  styled  from 'styled-components';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addWishlist, removeWishlist } from '../redux/wishlistRedux';
import { useState } from 'react';

const Info = styled.div`
    opacity:0;
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background-color:rgba(0,0,0,0.2);
    z-index:3;
    display:flex;
    align-items:center;
    justify-content:center;
    transition:all 0.5s ease;
    cursor: pointer;
`
const Container = styled.div`
    flex:1;
    margin:50px; //need adjust for different pics with different sizes
    min-width:280px; //need adjust for different pics with different sizes
    height:350px;
    justify-content:center:
    align-items:center;
    display:flex;
    background-color:#f5fbfd;
    position:relative;
    &:hover ${Info}{
        opacity:1; // turn on the 3 icons upon hovering the images
    }
`
const Circle = styled.div`
height:200px;
width:200px;
border-radius:50%;
background-color:white;
position:absolute;
`
const Image = styled.img`
    height:75%;
    z-index:2;
`

const Icon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    background-color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:10px;
    transition:all 0.5s ease;
    &:hover{
        background-color: #e9f5f5;
        transform:scale(1.1);
    }
`


const ProductItem= ({item})=> {
    const wishlist = useSelector((state)=>state.wishlist)
    const index = wishlist.products.find(x => x._id === item._id)
    const [inWishlist, setinWishlist] = useState(index !== undefined);
    const dispatch = useDispatch()

    const handleFavourite = (x) => {
        if(x === 0){
            dispatch(addWishlist({...item}))
            setinWishlist(true)
        }
        else{
            dispatch(removeWishlist({...item}))
            setinWishlist(false)
        }
    }

    return (
    <Container>
        <Circle/>
        <Image src={item.img}/>
        <Info>
            <Icon>
                <ShoppingCartOutlined/>
            </Icon>
            <Icon>
                <Link to={`/product/${item._id}`}>
                <SearchOutlined/>
                </Link>
            </Icon>
            <Icon>
                { !inWishlist &&
                    <FavoriteBorder onClick={() => handleFavourite(0)}/>}

                { inWishlist &&
                    <FavoriteIcon onClick={() => handleFavourite(1)}/>}
            </Icon>
        </Info>
    </Container>
    );
}

export default ProductItem