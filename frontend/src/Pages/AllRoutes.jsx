import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Profile } from "./Profile";
import { AllProducts } from "./AllProducts";
import { Cart } from "./Cart";
import { MyStore } from "./MyStore";

export const AllRoutes = () =>{
    return (
        <Routes>
            <Route path="/login" element = {<Login />} />
            <Route path="/signup" element = {<Signup />} />
            <Route path="/" element = {<Home />} />
            <Route path='/profile'element={<Profile />} />
            <Route path='/allproducts'element={<AllProducts />} />
            <Route path='/cart'element={<Cart />} />
            <Route path='/mystore'element={<MyStore />} />
        </Routes>
    )
}