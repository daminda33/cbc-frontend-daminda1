import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/loader"
import ImageSlider from "../../components/imageSlider"
import { addToCart, getCart } from "../../utils/cart"

export default function ProductOverviewPage() {
    const params = useParams()
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()
    const [status, setStatus] = useState("loading") // status - loading, error, success

    useEffect(
        () => {
            if (status === "loading") {
                axios.get(import.meta.env.VITE_BACKEND_URL + `/api/products/${params.productId}`).then(
                    (res) => {
                        setProduct(res.data)
                        setStatus("success")


                    }
                ).catch(
                    (error) => {
                        toast.error("Error loading")
                    }
                )
            }

        }, [status]
    )

    return (
        <div className="w-full h-full">
            {
                status == "loading" && <Loader/>
            }
            {
                status == "success" && <div className="w-full h-full flex flex-col md:flex-row ">
                        <h1 className="md:hidden text-2xl font-bold my-4 text-center">{product.name} <span className="font-light">{product.altNames.join(" | ")} </span></h1>

                    <div className="w-full md:w-[49%] h-full flex flex-col items-center justify-center">
                        <ImageSlider images={product.images} />

                    </div>

                    <div className="w-full md:w-[49%] h-full items-center flex flex-col pt-[50px]">
                        <h1 className="text-2xl font-bold hidden md:block">{product.name} <span className="font-light">{product.altNames.join(" | ")} </span></h1>
                        <p className="text-lg p-2">{product.description}</p>

                        <div className="w-full flex flex-col items-center pt-[50px]">
                            {
                                product.labelledPrice > product.price ?
                                    <div>
                                        <span className="text-2xl font-semibold line-through mr-[20px]">{product.labelledPrice.toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                        <span className="text-2xl font-semibold ">{product.price.toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>

                                    </div> :
                                    <div>
                                        <span className="text-2xl font-semibold ">{product.price.toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>

                                    </div>
                            }
                        </div>
                        <div className="w-full flex flex-row justify-center items-center gap-[10px] mt-[20px] ">
                            <button 
                            onClick={()=>{
                                navigate("/checkout", { state : { items :
                                    [{
                                        productId:product.productId,
                                        quantity: 1,
                                        name: product.name,
                                        image: product.images[0],
                                        price: product.price
                    

                                    }]
                                }})
                            }}

                            className="w-[200px] h-[50px] text-white cursor-pointer rounded-xl shadow-2xl bg-blue-900 transition-all duration-300 ease-in-out hover:bg-black hover:scale-105 active:scale-95">
                                Buy Now
                            </button>


                            <button className="w-[200px] h-[50px] text-white cursor-pointer rounded-xl shadow-2xl bg-blue-500 
                   transition-all duration-300 ease-in-out 
                   hover:bg-blue-600 hover:scale-105 active:scale-95 hover:shadow-blue-500/50" onClick={()=>{
                   // localStorage.setItem("cart","[]")
                    addToCart(product,1)
                   // console.log(product)
                    toast.success("Product is added to the cart")
                    console.log(getCart())
                   }}>
                                Add to Cart
                            </button>

                        </div>

                    </div>

                </div>
            }
            {
                status == "error" && <div>Error loading</div>
            }
        </div>
    )
}