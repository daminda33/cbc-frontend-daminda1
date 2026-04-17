import { useState } from "react"
import { addToCart, getCart, getTotal } from "../../utils/cart"
import { TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const navigate = useNavigate()
    const [cart, setCart] = useState(getCart());

    return (
        <div className="w-full min-h-screen flex flex-col py-5 md:py-10 items-center px-2">
            {
                cart.map((item) => {
                    return (
                        <div 
                            key={item.productId} 
                            className="w-full md:w-[800px] m-2.5 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center relative p-3 md:p-0"
                        >

                            {/* Image */}
                            <img 
                                src={item.image} 
                                className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover rounded-lg" 
                            />

                            {/* Name + Price */}
                            <div className="w-full md:w-[400px] flex flex-col justify-center p-2 md:p-[20px]">
                                <span className="text-lg md:text-2xl font-bold text-center md:text-left">
                                    {item.name}
                                </span>
                                <span className="font-semibold text-center md:text-left">
                                    {item.price.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="w-full md:w-[200px] flex flex-row justify-center items-center my-2 md:my-0">
                                <button
                                    className="flex items-center justify-center w-[30px] h-[30px] rounded-lg text-white bg-blue-600 cursor-pointer hover:bg-blue-400"
                                    onClick={() => {
                                        addToCart(item, -1);
                                        setCart(getCart())
                                    }}
                                >
                                    -
                                </button>

                                <span className="mx-[10px]">{item.quantity}</span>

                                <button
                                    className="flex items-center justify-center w-[30px] h-[30px] rounded-lg text-white bg-blue-600 cursor-pointer hover:bg-blue-400"
                                    onClick={() => {
                                        addToCart(item, 1);
                                        setCart(getCart())
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            {/* Item Total */}
                            <div className="w-full md:w-[100px] flex items-center justify-center md:justify-end p-2">
                                <span className="font-semibold">
                                    {(item.quantity * item.price).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </span>
                            </div>

                            {/* Delete Button */}
                            <button
                                className="w-[30px] h-[30px] absolute md:right-[-40px] right-[10px] top-[10px] md:top-auto cursor-pointer bg-red-700 text-white rounded-full flex justify-center shadow items-center border-[2px] hover:bg-white hover:text-black"
                                onClick={() => {
                                    addToCart(item, -item.quantity);
                                    setCart(getCart())
                                }}
                            >
                                <TbTrash />
                            </button>

                        </div>
                    )
                })
            }

            {/* Bottom Total Section */}
            <div className="md:w-[800px] w-full m-2.5 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between p-4 gap-3 relative">

                <button
                    className="w-full md:w-[150px] h-[50px] cursor-pointer rounded-lg border-2 bg-blue-500 hover:bg-white hover:text-black text-white"
                    onClick={() =>
                        navigate("/checkout", { state: { items: cart } })
                    }
                >
                    Checkout
                </button>

                <span className="font-bold text-xl md:text-2xl text-center md:text-right">
                    Total: {getTotal().toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </span>

            </div>
        </div>
    )
}