import axios from "axios";
import { useEffect, useState } from "react"
import Paginator from "../../components/paginator";
import toast from "react-hot-toast";

export default function OrdersAdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10)
    const [popupVisible, setPopupVisible] = useState(false)
    const [clickedOrder, setClickedOrder] = useState(null)
    const [orderStatus, setOrderStatus] = useState("pending")


    useEffect(() => {
        if (loading) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders/" + page + "/" + limit, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
                .then((res) => {
                    console.log(res)
                    setOrders(res.data.orders);
                    setTotalPages(res.data.totalPages)
                    setLoading(false)
                    //console.log(orders)
                })
                .catch((err) => {
                    console.error(err)
                });
        }

    }, [loading, page, limit]

    );
    //console.log(orders)


    return (

        <div className=" w-full h-full flex flex-col">
            <table className="w-full border-[3px]">
                <thead>
                    <tr>
                        <th className="p-[10px]">Order ID</th>
                        <th className="p-[10px]">email</th>
                        <th className="p-[10px]">name</th>
                        <th className="p-[10px]">Address</th>
                        <th className="p-[10px]">Phone</th>
                        <th className="p-[10px]">Status</th>
                        <th className="p-[10px]">Date</th>
                        <th className="p-[10px]">Total</th>
                    </tr>
                </thead>

                <tbody>
                    {


                        orders.map((order, index) => {

                            return (
                                <tr key={index} className="border-b-[1px] hover:bg-blue-600 hover:text-white" onClick={() => {
                                    setClickedOrder(order)
                                    setOrderStatus(order.status)
                                    setPopupVisible(true);

                                }}>
                                    <td className="p-[10px]">{order.orderID}</td>
                                    <td className="p-[10px]">{order.email}</td>
                                    <td className="p-[10px]">{order.name}</td>
                                    <td className="p-[10px]">{order.address}</td>
                                    <td className="p-[10px]">{order.phone}</td>
                                    <td className="p-[10px]">{order.status}</td>
                                    <td className="p-[10px]">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="p-[10px] text-end">{Number(order.total).toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</td>

                                </tr>
                            )

                        })
                    }

                </tbody>

            </table>
            {
                popupVisible && (
                    <div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex justify-center items-center">

                        <div className="w-[600px] h-[600px] bg-white relative p-[20px]">
                         {(orderStatus != clickedOrder.status) && <button className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-lg"
                         onClick={async()=>{
                            setPopupVisible(false);
                            try{
                                await axios.put(
                                    import.meta.env.VITE_BACKEND_URL + "/api/orders/" + clickedOrder.orderID,
                                    {
                                        status: orderStatus
                                    },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem("token")}`
                                        },
                                    }
                                );
                                toast.success("Order Updated successfully")
                                setLoading(true)
                            } 
                            catch(err){
                                toast.error("Order failed to update")
                                console.log(err)
                            }
                         }}> Save Changes </button>}

                            {/* 🔹 Order Basic Details */}
                            <h2 className="text-xl font-bold mb-2">
                                Order ID: {clickedOrder?.orderID}
                            </h2>

                            <p><b>Name:</b> {clickedOrder?.name}</p>
                            <p><b>Email:</b> {clickedOrder?.email}</p>
                            <p><b>Phone:</b> {clickedOrder?.phone}</p>
                            <p><b>Address:</b> {clickedOrder?.address}</p>
                            <p>
                                <b>Status:</b> {clickedOrder?.status}
                                <select className="ml-4 p-1 border rounded" 
                                value={orderStatus}
                                onChange={(e)=>setOrderStatus(e.target.value)}>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </p>
                            <p><b>Total:</b> Rs. {clickedOrder?.total.toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>

                            <p className="mb-4">
                                <b>Date:</b> {new Date(clickedOrder?.date).toLocaleString()}
                            </p>

                            {/* 🔹 Items List */}
                            <h3 className="text-lg font-semibold mb-2">Items:</h3>

                            <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto">
                                {
                                    clickedOrder?.items?.map((item) => (
                                        <div key={item._id} className="flex items-center gap-3 border p-2 rounded">

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-[60px] h-[60px] object-cover rounded"
                                            />

                                            <div className="flex flex-col">
                                                <span className="font-semibold">{item.name}</span>
                                                <span>Price: Rs. {item.price.toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                                <span>Qty: {item.qty}</span>
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>

                            {/* ❌ Close Button */}
                            <button
                                className="absolute w-[30px] h-[30px] top-[-30px] right-[-30px] border-[2px] cursor-pointer border-black rounded-full bg-red-400 text-black hover:bg-transparent hover:text-white"
                                onClick={() => setPopupVisible(false)}
                            >
                                X
                            </button>

                        </div>
                    </div>
                )
            }
            <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} limit={limit} setLimit={setLimit} setLoading={setLoading} />

        </div>
    )
}