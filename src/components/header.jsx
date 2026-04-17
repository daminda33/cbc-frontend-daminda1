import { useState } from "react";
import { BiCart, BiStore } from "react-icons/bi";
import { FaHamburger } from "react-icons/fa";
import { GiHamburger, GiHamburgerMenu } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { SiShopware } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="h-[100px] bg-blue-600 text-white flex justify-center items-center gap-4 relative">
          {isOpen && (
                <div className="fixed z-30 w-[100vw] h-[100vh] bg-[#00000050] top-0 right-0 md:hidden">
                    <div className="h-full w-[350px] bg-white flex flex-col">
                        <div className="w-full bg-blue-600 h-[100px] flex pl-[45px] flex-row items-center gap-[20px]">
                            <GiHamburgerMenu className="text-white text-4xl md:hidden" onClick={
                                () => {
                                    setIsOpen(false)
                                }
                            } />
                            <img className="absolute w-[200px] h-[80px] object-cover object-scale-down md:left-[5px] cursor-pointer" onClick={() => (navigate("/"))} src="logo.png" alt="Logo" />
                        </div>
                        <div className="w-full flex flex-col p-10 gap-4">

                            <button
                                className="flex items-center gap-3 text-black text-xl px-4 py-3 rounded-lg hover:bg-blue-100 transition-all duration-200"
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate("/");
                                }}
                            >
                                <HiHome className="text-2xl" />
                                <span>Home</span>
                            </button>

                            <button
                                className="flex items-center gap-3 text-black text-xl px-4 py-3 rounded-lg hover:bg-blue-100 transition-all duration-200"
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate("/products/");
                                }}
                            >
                                <BiStore className="text-2xl" />
                                <span>Products</span>
                            </button>

                            <button
                                className="flex items-center gap-3 text-black text-xl px-4 py-3 rounded-lg hover:bg-blue-100 transition-all duration-200"
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate("/cart");
                                }}
                            >
                                <BiCart className="text-2xl" />
                                <span>My Cart</span>
                            </button>

                        </div>
                    </div>
                </div>)
            }
            
           
            <img className="absolute w-[200px] h-[80px] object-cover object-scale-down md:left-[5px] cursor-pointer" onClick={() => (navigate("/"))} src="logo.png" alt="Logo" />
            <GiHamburgerMenu className="text-white text-4xl md:hidden left-[40px] absolute" onClick={
                () => {
                    setIsOpen(true);
                }} />

            <div className="hidden md:flex w-full justify-center items-centers gap-4">
                <Link to="/" className="text-white text-2xl font-bold">Home</Link>
                <Link to="/products" className="text-white text-2xl font-bold">Products </Link>
                <Link to="/reviews" className="text-white text-2xl font-bold">Reviews </Link>
                <Link to="/contact-us" className="text-white text-2xl font-bold">Contact us</Link>
                <Link to="/about-us" className="text-white text-2xl font-bold">About us </Link>
                <Link to="/cart" className=""><BiCart className="text-white text-3xl ml-4" /></Link>
            </div>


        </header>
    )
}