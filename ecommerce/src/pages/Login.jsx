import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
    width:100vw;
    height:100vh;
    background: linear-gradient(rgba(255,255,255,0.5),
                rgba(255,255,255,0.5)),
                url("https://media.istockphoto.com/photos/still-life-shot-of-exercise-equipment-in-a-gym-picture-id1320144030?b=1&k=20&m=1320144030&s=170667a&w=0&h=zRPUtgV7QbKzBYJ-VOHwNvKxRsLgWm4Z4eMi2KToJpc="),
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
const Button = styled.button`
    width:20%;
    border:none;
    padding:15px 20px;
    background-color:teal;
    color:white;
    cursor:pointer;
    margin:20px 0px;
    margin-bottom:10px;
    &:disabled{
        color:green;
        cursor:not-allowed;
    }
`
const Link=styled.a`
    margin:5px 0px;
    font-size:!2px;
    text-decoration:underline;
    cursor:pointer;
`

const Error = styled.span`
    color:red;
`

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    const handleClick = () => {
        // login from apiCalls, pass in user info
        login(dispatch, { username, password })
    }

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                    <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <Button onClick={handleClick} disabled={isFetching}>Login</Button>
                    {error && <Error>Wrong password or username!</Error>}
                    <Link>Forget Password</Link>
                    <Link>Create a new account</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login;