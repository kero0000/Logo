import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@mui/icons-material'
import  styled  from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
    display:flex;
    ${mobile({ flexDirection: "column"})}
`
const Center = styled.div`
    flex:1;
    padding:20px;
    ${mobile({ display: "none"})}
`
const Left = styled.div`
    flex:1;
    flex-direction:column;
    display:flex;
    padding:20px;
`
const Right = styled.div`
    flex:1;
    padding:20px;
`
const Logo = styled.h1``

const Desc = styled.p`
    margin:20px 0px;
`;
const SocialContainer = styled.div`
    display:flex;
    cursor:pointer;
`
const SocialIcon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    color:white;
    background-color:#${props=>props.color};
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:20px;
`
const Title=styled.h3`
    margin-bottom:30px;    
`
const List=styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    display:flex;
    flex-wrap:wrap;
`
const ListItem=styled.li`
    width:50%;
    margin-bottom:10px;
    
    &:hover{
        color:blue;
        text-decoration:underline

    }
`

const ContactItem=styled.div`
    margin:5px;
`
const Payment=styled.img`
    width:50%;
`

//ewew

const Footer= ()=> {
    return (
    <Container>
        <Left>
            <Logo>Alpha</Logo>
            <Desc>
                Newly designed clothing wear for sporting action.
                Check us out in our public social pages below !
            </Desc>
            <SocialContainer>
                <SocialIcon color = "3B5999">
                    <Facebook/>
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Instagram/>
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Pinterest/>
                </SocialIcon>
                <SocialIcon color="E60023">
                    <Twitter/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Men's Fashion</ListItem>
                <ListItem>Women's Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Terms</ListItem>
                <ListItem>Wishlist</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem><Room style={{marginRight:"10px"}}/>51 Hougang Drive, Singapore</ContactItem>
            <ContactItem><Phone style={{marginRight:"10px"}}/>+65 1234567</ContactItem>
            <ContactItem><MailOutline style={{marginRight:"10px"}}/>placeholder@123.com</ContactItem>
            <Payment src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7WSS_zadLnqmstH30Tuh09QDdl03Ad8mZvw&usqp=CAU"/>
        </Right>
    </Container>
    );
}

export default Footer;