import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import ProductPage from "./productPage";
import ProductOverviewPage from "./productOverview";
import CartPage from "./cart";
import CheckOutPage from "./checkOutPage";
import AboutUs from "../aboutus";

export default function ClientWebPage(){
    return(
        <div className=" w-full h-screen max-h-screen">
            <Header/>
            <Routes path="/*">
            <Route path="/" element={<h1>Home Page</h1>}/>
            <Route path="/products" element={<ProductPage/>}/>
            <Route path="/reviews" element={<h1>reviews</h1>}/>
            <Route path="/overview/:productId" element={<ProductOverviewPage/>}/>
            <Route path="/about-us" element={<AboutUs/>}/>
            <Route path="/contact-us" element={<h1>Contact us</h1>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/checkout" element={<CheckOutPage/>}/>
            </Routes>
            </div>
    )
}