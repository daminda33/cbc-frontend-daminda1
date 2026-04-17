import { useEffect, useState } from "react"
import { TbTrash } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckOutPage() {
    const token = localStorage.getItem("token")
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("Please login to checkout");
            navigate("/login");
            return
        } else {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(
                (res) => {
                    setUser(res.data);
                    setName(res.data.firstName)
                    console.log(user)
                }
            ).catch((err) => {
                console.error(err);
                toast.error("Failed to fetch user details");
                navigate("/login")
            })
        }
    }, [name])

    const [cart, setCart] = useState(location.state.items || []);

    if (location.state.items == null) {
        toast.error("Please add products to the cart");
        navigate("/products")
    }

    function getTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.quantity * item.price
        })
        return total;
    }

    async function placeOrder() {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error(" Please login to place the order");
            navigate("/login")
            return;
        }

        if (name === "" || address === "" || phone === "") {
            toast.error("please fill all the fields")
            return;
        }

        const order = {
            address: address,
            phone: phone,
            items: []
        };

        cart.forEach((item) => {
            order.items.push({
                productId: item.productId,
                qty: item.quantity
            })
        })

        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", order,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                })
            toast.success("Order is placed successfully")
        } catch (err) {
            console.error(err)
            toast.error("Failed to place the order")
            return;
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col py-5 md:py-10 items-center px-2">

            {
                cart.map((item, index) => {
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

                            {/* Quantity */}
                            <div className="w-full md:w-[200px] flex flex-row justify-center items-center my-2 md:my-0">
                                <button
                                    className="flex items-center justify-center w-[30px] h-[30px] rounded-lg text-white bg-blue-600 cursor-pointer hover:bg-blue-400"
                                    onClick={() => {
                                        const newCart = [...cart]
                                        newCart[index].quantity -= 1;
                                        if (newCart[index].quantity <= 0) {
                                            newCart.splice(index, 1)
                                        }
                                        setCart(newCart)
                                    }}>
                                    -
                                </button>

                                <span className="mx-[10px]">{item.quantity}</span>

                                <button
                                    className="flex items-center justify-center w-[30px] h-[30px] rounded-lg text-white bg-blue-600 cursor-pointer hover:bg-blue-400"
                                    onClick={() => {
                                        const newCart = [...cart]
                                        newCart[index].quantity += 1;
                                        setCart(newCart)
                                    }}>
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

                            {/* Delete */}
                            <button
                                className="w-[30px] h-[30px] absolute md:right-[-40px] right-[10px] top-[10px] md:top-auto cursor-pointer bg-red-700 text-white rounded-full flex justify-center shadow items-center border-[2px] hover:bg-white hover:text-black"
                                onClick={() => {
                                    const newCart = [...cart]
                                    newCart.splice(index, 1)
                                    setCart(newCart)
                                }}>
                                <TbTrash />
                            </button>

                        </div>
                    )
                })
            }

            {/* Total + Button */}
            <div className="md:w-[800px] w-full m-2.5 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between p-4 gap-3 relative">

                <button
                    onClick={placeOrder}
                    className="w-full md:w-[150px] h-[50px] cursor-pointer rounded-lg border-2 bg-blue-500 hover:bg-white hover:text-black text-white"
                >
                    Place Order
                </button>

                <span className="font-bold text-xl md:text-2xl text-center md:text-right">
                    Total: {getTotal().toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </span>

            </div>

            {/* Form */}
            <div className="w-full md:w-[800px] m-2.5 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-center gap-3 p-4">

                <input
                    className="w-full md:w-[200px] border border-gray-500 rounded-lg p-[10px]"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="w-full md:w-[200px] border border-gray-500 rounded-lg p-[10px]"
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <input
                    className="w-full md:w-[200px] border border-gray-500 rounded-lg p-[10px]"
                    type="text"
                    placeholder="Enter your phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

            </div>

        </div>
    )
}