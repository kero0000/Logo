import styled from "styled-components";
import React, { useState } from "react";
import { mobile } from "../responsive";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    width:100vw;
    height:100vh;
    background: linear-gradient(rgba(255,255,255,0.5),
                rgba(255,255,255,0.5)),
                url("https://media.istockphoto.com/photos/still-life-shot-of-exercise-equipment-in-a-gym-picture-id1320144030?b=1&k=20&m=1320144030&s=170667a&w=0&h=zRPUtgV7QbKzBYJ-VOHwNvKxRsLgWm4Z4eMi2KToJpc="),
                center;

    display:flex;
    align-items:center;
    justify-content:center;
`
const Wrapper = styled.div`
    width:40%;
    padding:20px;
    background-color:white;
    ${mobile({ width: "75%"})}
`
const Form = styled.form`
    display:flex;
    flex-wrap:wrap;
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
const Agreement = styled.span`
    font-size:12px;
    margin:25px 10px;
`
const Button = styled.button`
    width:30%;
    border:none;
    padding:15px 20px;
    background-color:teal;
    color:white;
    cursor:pointer;
    display:block;
    margin:0 auto
`
const Error = styled.span`
    color:red;
`

const Register = () => {
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [username, setusername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useDispatch()
    const {isFetching, error} = useSelector(state => state.user) 
    const navigate = useNavigate()
    
    const handleSubmit = () => {
        register(dispatch, {username, email, password, confirmPassword})
        
    }

    const handleBack = () => {
        navigate('/')
    }

    return (
        <Container>
            <Wrapper>
                <Title>Create an Account</Title>
                <Form>
                    <Input placeholder="first name" onChange={(e)=>setfirstName(e.target.value)}/>
                    <Input placeholder="last name" onChange={(e)=>setlastName(e.target.value)}/>
                    <Input placeholder="username" onChange={(e)=>setusername(e.target.value)}/>
                    <Input placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
                    <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                    <Input placeholder="confirm password" type="password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    <Agreement>By creating this account, I have read and consent to the terms and conditions and the privacy policy
                    </Agreement>
                    <Button onClick={handleSubmit} disabled={isFetching}>Create Account</Button>
                    {error && <Error>Please ensure the passwords are the same!</Error>}
                    <Button onClick={handleBack}>Go back</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register;