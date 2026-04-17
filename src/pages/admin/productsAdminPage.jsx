import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";


export default function ProductsAdminPage() {

    const [products, setProducts] = useState([])
    //  const [a,setA]=useState(0)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(
        () => {
            if (isLoading) {
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then(
                    (res) => {
                        setProducts(res.data)
                        setIsLoading(false)
                    }
                )
            }
        }
        , [isLoading]
    )
    const navigate = useNavigate();

    return (
        <div className="w-full h-full border-2">
            {isLoading? (
                <Loader/>
                ): (
            <table>
                <thead>
                    <tr>
                        <th className="p-2.5 t">Image</th>
                        <th className="p-2.5 t">Product ID</th>
                        <th className="p-2.5">Name</th>
                        <th className="p-2.5">Price</th>
                        <th className="p-2.5">Category</th>
                        <th className="p-2.5">Stock</th>
                        <th className="p-2.5">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(
                            (product, index) => {

                                return (
                                    <tr key={index}>
                                        <td>
                                            <img src={product.images[0]} className="w-12 h-12" />
                                        </td>
                                        <td className="p-2.5">{product.productId}</td>
                                        <td className="p-2.5">{product.name}</td>
                                        <td className="p-2.5">{product.price}</td>
                                        <td className="p-2.5">{product.category}</td>
                                        <td className="p-2.5">{product.stock}</td>
                                        <td className="p-2.5 flex flex-row justify-center items-center">
                                            <BiTrash className="bg-red-800 rounded-full p-1 text-3xl text-white cursor-pointer onClick" onClick={
                                                () => {
                                                    const token = localStorage.getItem("token")
                                                    if (token == null) {
                                                        navigate("/login");
                                                        return;
                                                    }
                                                    axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + product.productId,
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`
                                                            }
                                                        }

                                                    ).then(
                                                        (res) => {
                                                            console.log("Product Deleted succcesfully");
                                                            toast.success(" Product deleted successfully")
                                                            setIsLoading(!isLoading)

                                                        }
                                                    ).catch(
                                                        (error) => {
                                                            toast.error("Failed to delete")
                                                        }
                                                    )

                                                }
                                            } />
                                            <BiEdit className="bg-blue-500 p-1.5 rounded-full text-white text-3xl shadow-black cursor-pointer ml-2.5" onClick={() =>
                                                navigate("/admin/updateProduct", {
                                                    state: product
                                                })
                                            } />
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }

                </tbody>
            </table>)}


            <Link to={"/admin/newProduct"} className="p-5 text-white bg-black right-[60px] bottom-[60px] fixed rounded-full">
                <BiPlus className="text-3xl" />
            </Link>
        </div>

    )
}