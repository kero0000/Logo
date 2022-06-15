import Navbar from "../components/Navbar"
import styled from 'styled-components'
import Announcement from "../components/Announcement"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import {Settings, ShoppingCartOutlined } from "@mui/icons-material";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userRedux";


const Container = styled.div`
    width:100%;
`

const Header = styled.h1`
    font-family:Arial
    display:flex;
    margin-left:255px;
    padding:5px;
`

const Center = styled.div`
height: 30vh;
margin-left: -250px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`

const Right = styled.div`
float:right;
width:300px;
`

const LogOutButton = styled.button`
    color: white;
    background-color: #008CBA;
    padding: 15px 24px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor:pointer;
    &:hover{
        background-color:#417dc1;
        border:2px solid ;
    }
`
const Hr = styled.hr`
    background-color:#eee;
    border:none;
    height:1px;
`


const Profile = () => {
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    const handleListItem = (value) => {
        if (value === "View Wishlist"){
            navigate(`/wishlist/${currentUser.username}`)
        }
        else if (value === "AS"){
            navigate(`/profile/${currentUser.username}/settings`)
        }
        else if (value === "View Cart"){
            navigate("/cart")
        }
        else if (value === "Order Details"){
            navigate(`/orders/${currentUser.username}`)
        }
    }

    const handleLogOut = () => {
        dispatch(logOut())
        navigate('/')
    }

    return (
        <Container>
            <Navbar/>
                <Announcement/>
                <Hr/>
                <Center>
                    <Header>My Account</Header>
                    <List sx={{ marginLeft: '240px', maxWidth: 360, bgcolor: 'background.paper'}}>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <Settings/>
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Account settings" sx={{ "&:hover": { color: "blue" } , cursor:'pointer'}} onClick={()=>handleListItem("AS")}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Order Details" sx={{ "&:hover": { color: "blue" } , cursor:'pointer'}}  onClick={() => handleListItem("Order Details")}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <FormatListBulletedIcon/>
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="View Wishlist" sx={{ "&:hover": { color: "blue" } , cursor:'pointer'}} onClick={() => handleListItem("View Wishlist")}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <ShoppingCartOutlined/>
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="View Cart" sx={{ "&:hover": { color: "blue" } , cursor:'pointer'}}  onClick={() => handleListItem("View Cart")}/>
                        </ListItem>
                        </List>
                </Center>
                <Right>
                    <LogOutButton onClick={handleLogOut}>Log Out</LogOutButton>
                </Right>
        </Container>
    )
}

export default Profile