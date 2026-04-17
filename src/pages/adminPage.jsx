import { Link, Route, Routes } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductPage from "./admin/addProductAdminPage";
import UpdateProductPage from "./admin/updateProduct";
import OrdersAdminPage from "./admin/ordersPageAdmin";

export default function AdminPage(){
    return(
        <div className="w-full h-screen bg-amber-100 flex">
            
            <div className="w-[300px] h-full flex-col justify-center items-center bg-white">
            <span className="text-blue-900 text-3xl  ">Admin Panel</span>
            <Link className=" h-[50px] w-full text-2xl gap-2 flex border p-2 mt-5" to="/admin/products"> <FaBoxOpen /> Products</Link>
            <Link className=" h-[50px] w-full text-2xl gap-2 flex border p-2" to="/admin/orders"><FaShoppingBag />Orders</Link>
            <Link className=" h-[50px] w-full text-2xl gap-2 flex border p-2" to="/admin/users"><FaUsers />Users</Link>
            <Link className=" h-[50px] w-full text-2xl gap-2 flex border p-2" to="/admin/settings"><IoSettings />Settings</Link>
            </div>

            <div className="w-[calc(100%-300px)] h-full bg-white">
            <Routes path="/*">
            <Route path="/" element={<h1>Dashboard</h1>}/>
            <Route path="/products" element={<ProductsAdminPage/>}/>
            <Route path="/newProduct" element={<AddProductPage/>}/>
            <Route path="/updateProduct" element={<UpdateProductPage/>}/>
            <Route path="/orders" element={<OrdersAdminPage/>}/>
            <Route path="/other" element={<h1>Other</h1>}/>
            </Routes>
            
        </div>
        </div>
    )
}