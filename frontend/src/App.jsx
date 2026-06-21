import {BrowserRouter,Routes,Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

import AdminDashboard from "./admin/AdminDashboard";


function App(){

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={<Home/>}/>

<Route path="/products" element={<Products/>}/>

<Route path="/login" element={<Login/>}/>

<Route path="/register" element={<Register/>}/>

<Route path="/cart" element={<Cart/>}/>

<Route path="/checkout" element={<Checkout/>}/>

<Route path="/orders" element={<Orders/>}/>

<Route path="/profile" element={<Profile/>}/>

<Route path="/admin" element={<AdminDashboard/>}/>

</Routes>


<Footer/>


</BrowserRouter>

)

}

export default App;