import {useDispatch, useSelector} from 'react-redux';

import { useState } from "react";
import styled from "styled-components";
import { login, updateAccount } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Container = styled.div`
    width:100vw;
    height:80vh;
    background: linear-gradient(rgba(255,255,255,0.5),
                rgba(255,255,255,0.5)),
                center;

    display:flex;
    background-size:cover;
    align-items:center;
    justify-content:center;
`
const Wrapper = styled.div`
    width:25%;
    padding:20px;
    background-color:white;
    ${mobile({ width: "75%"})}
`
const Form = styled.form`
    display:flex;
    flex-direction:column;
`
const Title = styled.h1`
    font-size:24px;
    font-weight:300;
`
const Input = styled.input`
    flex:1;
    min-width:40%;
    margin:20px 10px 0px 0px;
    padding:10px;
`
const UpdateButton = styled.button`
    width:20%;
    border:none;
    padding:15px 20px;
    background-color:teal;
    text-align: center;
    display: inline-block;
    color:white;
    cursor:pointer;
    margin:30px 0px;
    margin-bottom:10px;
    &:disabled{
        color:green;
        cursor:not-allowed;
    }
`

const BackButton = styled.button`
    width:20%;
    border:none;
    padding:15px 20px;
    background-color:teal;
    text-align: center;
    display: inline-block;
    color:white;
    cursor:pointer;
    margin:30px 0px;
    margin-bottom:10px;
    &:disabled{
        color:green;
        cursor:not-allowed;
    }
`

const AccountSettings = () => {
    const currentUser = useSelector(state=>state.user.currentUser)
    const id = currentUser._id;
    const navigate = useNavigate()
    const [newUserName, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch()
    const [newEmail, setNewEmail] = useState("")
    const {isFetching, error} = useSelector(state=>state.user)


    const handleUpdate = (e) => {
        e.preventDefault();
        updateAccount(dispatch, id, currentUser.accessToken, {username: newUserName, password:newPassword, email:newEmail})
    }

    const handleBack = ()=> {
        navigate(`/profile/${currentUser.username}`)
    }

    return(
        <Container>
        <Wrapper>
            <Title>Update Account Settings</Title>
            <Form>
                <Input placeholder="username" onChange={(e) => setNewUsername(e.target.value)}/>
                <Input placeholder='email' onChange={(e) => setNewEmail(e.target.value)}/>
                <Input placeholder="password" type="password" onChange={(e) => setNewPassword(e.target.value)}/>
                <UpdateButton onClick={handleUpdate} disabled = {isFetching}>Update</UpdateButton>
                <BackButton onClick={handleBack}>Back</BackButton>
            </Form>
        </Wrapper>
    </Container>
    )

};

export default AccountSettings