import { Search} from "@mui/icons-material";
import { Avatar, Badge } from "@mui/material"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import React from "react";
import styled from 'styled-components'
import {mobile} from "../responsive";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
    height:60px;
    ${mobile({ height: "50px"})};
`
const Wrapper = styled.div`
    padding:10px 20px;
    display: flex;
    justify-contetn:space-between;
    ${mobile({ padding: "10px 0px"})};
`;
const Left = styled.div`
flex:1;
display:flex;
align-items:center;
`
const Center = styled.div`flex:1;
text-align: center;
cursor:pointer;
`
const Right = styled.div`flex:1;
display:flex;
align-items:center;
justify-content:flex-end;
${mobile({ justifyContent: "center", flex:2})}
`
const Language = styled.span`
    font-size:14px;

    ${mobile({ display: "none"})}
    &:hover{
        color: blue;
        cursor:pointer
    }
`

const Links = styled.div`
    display: flex;
    align-items:center;
    margin-left:25px;
    padding:5px;

    &:hover{
        color: blue;
        cursor:pointer
    }
`

const Logo = styled.h1`
font-size:20px;
font-weight:bold;
${mobile({ fontSize: "24px"})}
`
const MenuItem = styled.div`
font-size:14px;
cursor:pointer;
margin-left:25px;
${mobile({ fontSize: "12px", marginLeft:"10px"})}
`

const Contact = styled.div`
margin-left:30px
`
const Help = styled.div``

const Navbar = ()=> {
    // retrieves the cartQuantity stored in redux state
    const cartQuantity = useSelector(state=>state.cart.quantity);
    const currentUser = useSelector(state => state.user.currentUser);
    const userPresent = currentUser === null
    const navigate = useNavigate()

    const handleRegister = () => {
        navigate('/register')
    }

    const handleSignIn = () => {
        navigate('/login')
    }
    const handleLogo = () => {
        navigate('/')
    }

    const handleAvatar = () => {
        if (currentUser !== null){
            const username = currentUser.username
            navigate(`/profile/${username}`)
        }
    }
    const handleCart = () => {
        navigate('/cart')
    }

    return(
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <Links>
                        <Contact>Contact us</Contact>
                    </Links>
                    <Links>
                        <Help>Help</Help>
                    </Links>
                </Left>
                <Center><Logo onClick={handleLogo}>Logo</Logo></Center>
                <Right>
                    {userPresent &&
                        <>
                            <MenuItem onClick={handleRegister}>Register</MenuItem>
                            <MenuItem onClick={handleSignIn}>Sign In</MenuItem></>
                        }

                    {!userPresent &&
                        <>
                            <Avatar src="/broken-image.jpg" onClick={handleAvatar} style={{cursor:"pointer"}}/></>
                        }   
                    <MenuItem>
                        <Badge badgeContent={cartQuantity} color ="primary" onClick={handleCart}>
                            <ShoppingCartOutlinedIcon/>
                    </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>

        </Container>
    )
}

export default Navbar