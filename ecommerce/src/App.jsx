import './App.css';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuccessPayment from './pages/SuccessPayment';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';
import AccountSettings from './pages/AccountSettings';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import MainCheckout from './pages/MainCheckout';

const App = ()=>{
  const user = useSelector(state => state.user.currentUser);

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/products/:category" element={<ProductList/>}/>
            <Route path="/product/:id" element={<Product/>}/>
            <Route path= "/cart" element={<Cart/>}/>
            <Route path="/login" element={user ? <Home/> : <Login />}/>
            <Route path='/success' element={<SuccessPayment/>}></Route>
            <Route path="/register" element={<Register/>}/>
            <Route path='/profile/:username' element={user ? <Profile/> : <Login/>}/>
            <Route path='/profile/:username/settings' element={user ? <AccountSettings/> : <Login/>}/>
            <Route path='/wishlist/:username' element={user ? <Wishlist/> : <Login/>} />
            <Route path='/checkout/:username' element={user ? <MainCheckout/> : <Login/>}/>
            <Route path='/orders/:username' element={user ? <Orders/> : <Login/>}/>
          </Routes>
        </BrowserRouter>
    </>

  )
    
};

export default App;
