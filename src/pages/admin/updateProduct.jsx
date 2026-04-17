import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";



export default function UpdateProductPage(){

const location =  useLocation()    
const [productId, setProductId] = useState(location.state.productId);
const [productName, setProductName] = useState(location.state.name);
const [alternativeNames, setAlternativeNames] = useState(location.state.altNames.join(","));
const [price, setPrice] = useState(location.state.price);
const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
const [images, setImages] = useState([]);
const [description, setDescription] = useState(location.state.description);
const [stock, setStock] = useState(location.state.stock);
const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
const [category, setCategory] = useState(location.state.category);
const navigate = useNavigate()

async function handleSubmit(){

    const promisesArray = [];

    for(let i=0;i<(images.length);i++){

        const promise = uploadFile(images[i]);
        promisesArray[i] = promise;
            }

    const responses = await Promise.all(promisesArray)
    

    const altNamesInArray = alternativeNames.split(",")
    const productData = {
            productId: productId,
            name: productName,
            altNames: altNamesInArray,
            price: price,
            labelledPrice: labelledPrice,
            images: responses,
            description: description,
            stock: stock,
            isAvailable: isAvailable,
            category: category 
    }

    if (responses.length == 0){
        productData.images = location.state.images
    }

const token = localStorage.getItem("token");
 console.log(token)

if (token == null){
    window.location.href = "/login";
    return;
}

    axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/"+productId, productData, 
        {
            headers:{
                Authorization: "Bearer " + token,
            }
        
    }).then(
        (res)=>{
                    toast.success("Product updated successfully")
                    navigate("/admin/products")
                    console.log(res)
            
        }
    ).catch(
        (error)=>{
            console.error("Error adding product"+error)
        }
    )
    
}


    return(
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[600px] h-[600px] border-2 flex flex-col flex-row rounded-md p-2 flex-wrap justify-between">
               
                <div className="w-[200px] flex flex-col gap-1">
                <label className="text-sm font-semibold">Product ID</label>
                    <input disabled
                        type="text" 
                        className="w-full border h-[40px] rounded-sm"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                    />
                </div>

                <div className="w-[300px] flex flex-col gap-1">
                    <label className="text-sm font-semibold">Product Name</label>
                    <input 
                        type="text" 
                        className="w-full border h-[40px] rounded-sm"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>

                <div className="w-[200px] flex flex-col gap-1">
                    <label className="text-sm font-semibold">Alternative Names</label>
                    <input 
                        type="text" 
                        className="w-full border h-[40px] rounded-sm"
                        value={alternativeNames}
                        onChange={(e) => setAlternativeNames(e.target.value)}
                    />
                </div>

                <div className="w-[200px] flex flex-col gap-1">
                    <label className="text-sm font-semibold">Price</label>
                    <input 
                        type="text" 
                        className="w-full border h-[40px] rounded-sm"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="w-[200px] flex flex-col gap-1">
                    <label className="text-sm font-semibold">Labelled Price</label>
                    <input 
                        type="text" 
                        className="w-full border h-[40px] rounded-sm"
                        value={labelledPrice}
                        onChange={(e) => setLabelledPrice(e.target.value)}
                    />
                </div>

                <div className="w-[200px] flex flex-col gap-1">
                    <label className="text-sm font-semibold">images</label>
                    <input 
                        multiple
                        type= "file"
                        onChange={(e) => {
                             setImages(e.target.files)
                            }
                        }
                        className="w-full border-2 h-10 rounded-md"
                    />
                </div>

                <div className="w-[500px] flex flex-col gap-1">
                    <label className="text-sm font-semibold">Description</label>
                    <textarea 
                        className="w-full border h-[100px] rounded-sm"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="w-[500px] flex flex-col gap-1">
                    <label className="text-sm font-semibold">Stock</label>
                    <input 
                        type="text" 
                        className="w-full border h-[40px] rounded-sm"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>

                <div className="w-[200px] flex flex-col gap-1">
                    <label className="text-sm font-semibold">IsAVailable</label>
                    <select 
                        className="w-full border h-[40px] rounded-sm"
                        value={isAvailable}
                        onChange={(e) => setIsAvailable(e.target.value)}
                    >
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                </div>

                <div className="w-[200px] flex flex-col gap-1">
                    <label className="text-sm font-semibold">Category</label>
                    <select 
                        className="w-full border h-[40px] rounded-sm"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="body">Cream</option>
                        <option value="Face">Facewash</option>
                        <option value="hair">Shampoo</option>
                    </select>
                </div>

                <div className="w-[500px] justify-center flex flex-row gap-1 py-5">
                    <Link to={"/admin/products"} className="w-[100px] h-[30px] p-0.5 border flex justify-center text-sm text-white bg-black rounded-sm">Cancel</Link>
                    <button onClick={handleSubmit} className="w-[100px] h-[30px] border flex justify-center p-0.5 text-sm text-black bg-white rounded-sm">Update</button>
                </div>


            </div>
        </div>
    ) 
}