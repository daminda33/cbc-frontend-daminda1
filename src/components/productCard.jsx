import { Link } from "react-router-dom"

export default function ProductCard(props){
    const product = props.product

    return(
        <Link to={"/overview/"+product.productId} className="w-[300px] h-[400px] flex flex-col shadow-2xl rounded-2xl overflow-hidden">
            <img src={product.images[0]} className="w-full h-[275px] object-cover"/>
            <div className="w-full h-[125px] bg-white flex flex-col p-2">
                <span className="text-gray-300 text-[12px}">
                    {product.productId}
                </span>
                <h1 className="text-lg font-bold">
                    {product.name} {" "}
                    <span className="text-gray-300 text-[12px]">{product.category}</span>
                </h1>
                
                <div>
                        {
                            product.labelledPrice > product.price ?
                            (
                                <p>
                                    <span className="line-through mr-2">{product.labelledPrice.toFixed(2)}</span>
                                    <span>{product.price.toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                </p>
                                
                            )
                             : <span>{product.price.toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        }
                        
                </div>
                    

            </div>

            </Link>
            
    )
}                                                                                                                                                                       