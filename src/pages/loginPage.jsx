import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const clientId = "942076200283-16oeaeu2qkgodqat04ua0chq51h792m6.apps.googleusercontent.com";
const clientSecret = "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"

export default function LoginPage(){
    const [password,setPassword] = useState("");
    const [email,setEmail]=useState("");
    const navigate = useNavigate();
    const googleLogin = useGoogleLogin({
        onSuccess: (response)=>{
            axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/google-login",{
                token : response.access_token
            }).then(
                (response)=>{
                    console.log(response.data)
                    localStorage.setItem("token",response.data.token)
                    toast.success("Login successful")
                    if(response.data.role== "admin"){
                        navigate("/admin")
                    }else if (response.data.role == "user"){
                        navigate("/")
                    }

                }
            ).catch(
                (error)=>{
                    console.log(error)
                    toast.error("Google Login Failed")
                }
            )
        }
    })

    function Login(){
     
        console.log(email,password)
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login",{
            email:email,
            password:password
        }).then(
            (response)=>{
                console.log(response.data)
                localStorage.setItem("token",response.data.token)
                toast.success("Login Successful")
                if(response.data.role == "admin"){
                    navigate("/admin")

                }else if (response.data.role == "user"){
                    navigate("/")

                }
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("Login Failed")
            }
        )

    }

    return(
        
        <div className="w-full h-screen flex justify-center items-center bg-[url(./loginbg.jpg)] bg-cover bg-center">
            <div className="w-[500px] h-[500px] backdrop-blur-sm shadow-2xl bg-blue-50 rounded-3xl items-center flex flex-col justify-center relative">
                <h1 className="absolute top-[20px] text-2xl text-white font-bold text-center my-5">Login</h1>
                <div className="w-[350px] flex flex-col">
                    <span className="text-lg text-white">Email</span> 
                    <input onChange={(e)=>{setEmail(e.target.value)}} type="text" className="w-[350px] h-[40px] border border-white rounded-xl text-white">
                    </input>
                </div>
                <div className="w-[350px] flex flex-col">
                    <span className="text-lg text-white">Password</span>
                    <input onChange={(e)=>{setPassword(e.target.value)
                        
                    }} type="password" className="w-[350px] h-[40px] border border-white rounded-xl text-white">
                    </input>
                </div>
                <button onClick={Login} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-lg hover:bg-blue-950 mt-5">Login</button>
                <button onClick={googleLogin} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-lg hover:bg-blue-950 mt-5">Google Login</button>
                <p className="text-white">Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link> from here</p>
                <p className="text-white"> Forget password? <Link to="/forget" className="text-blue-500">reset password</Link> from here</p>
            </div>
        </div>
    )   

}