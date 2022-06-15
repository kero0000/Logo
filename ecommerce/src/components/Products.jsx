import { useEffect, useState } from 'react';
import  styled  from 'styled-components'
import ProductItem from './ProductItem';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import Fuse from "fuse.js";

const Container = styled.div`
    display:flex;
    padding:20px;
    flex-wrap:wrap;
    justify-content:space-between;
`
const SearchContainer = styled.div`

    background: #f2f2f2;
    align-items:center;
    justify-content:space-between;
    display:flex;
    height:48px;
    border-radius:0; 
    position:absolute;
    transparent:all 0.3s ease;
    margin-left:40%

`
const SearchInput = styled.input`
    padding-left:20px;
    position:relative;
    font-size: 16px;
    outline:none
    border: 1px;
    width: 100%;
    height: 100%;
`

const Products= ({cat, filters, sort})=> {
    const [allProducts, setallProducts] = useState([])
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const searchProducts = (pattern)=> {
        if(!pattern){
            setProducts(allProducts)
        }
        const fuse = new Fuse(products, {
            keys:["title"]
        })
        const result = fuse.search(pattern);
        const matches = []
        if (result.length){
            result.forEach(({item})=>{
                matches.push(item);
            })
            setProducts(matches)
        }else{
            setProducts(allProducts)
        }

    }


    // useEffect hook to make async call to get products whenever a new category of products url is accessed
    useEffect(()=>{
        const getProducts = async() => {
            try{
                const res = await axios.get(
                    cat ?`https://logo-ecommerce-app.herokuapp.com/api/products?category=${cat}`
                        :"https://logo-ecommerce-app.herokuapp.com/api/products");

                setProducts(res.data); // sets  the images from the res
                setallProducts(res.data)
            }catch(err){}
        };
        getProducts();
    }, [cat]);

    // useEffect hook to call function to filter products when ANY of the filters is applied
    useEffect(() => {
        cat && setFilteredProducts(
            products.filter(item=> Object.entries(filters).every(([key, value])=>
                                    item[key].includes(value)
            ))
        );
    }, [products, cat, filters]);

    // useEffect used to sort the products when filter for price and newest is applied
    useEffect(() =>{
        if(sort=="newest"){
            setFilteredProducts((prev)=>
            [...prev].sort((a,b) => a.createdAt - b.createdAt));
        }
        else if((sort == "ascending")){
            setFilteredProducts((prev) => 
            [...prev].sort((a, b) => a.price - b.price));
        }
        else{
            setFilteredProducts((prev) => 
            [...prev].sort((a,b)=> b.price - a.price));
        }
    }, [sort])

    // added on to return 8 items on the home's component
    return (
    <>
    <SearchContainer>
        <SearchIcon onClick={() => searchProducts(products)} style={{color:"gray",fontSize:"50px", cursor:"pointer"}}/>
        <SearchInput placeholder="Search..." onChange={(e)=>searchProducts(e.target.value)}/>
    </SearchContainer>
    <Container>
        
        {cat 
        ? filteredProducts.map((item) => <ProductItem item={item} key = {item._id}/>)
        : products.slice(0,8).map((item) => <ProductItem item={item} key={item._id} />)}
    </Container>
    </>
    );
}

export default Products;