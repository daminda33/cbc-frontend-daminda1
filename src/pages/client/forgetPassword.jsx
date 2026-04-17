import axios from "axios";
import { use, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

  export default function ForgetPasswordPage(){
    const [email,setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
    

    async function sendOtp(){
        try{
            await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/send-otp", {email:email});
            toast.success("OTP sent successfully")
            setEmailSent(true)

        }catch(err){
            console.error(err)
            toast.error("Failed to send OTP")
        }
    }

    async function resetPassword(){
        if(newPassword !== confirmPassword){
            toast.error("Passwords do not match")
            return
        }
        try{
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password", {
                email : email,
                otp: otp,
                newPassword: newPassword
                });
            toast.success("Password reset successfully");
            navigate("/login")
        }catch(error){
            console.log(error)
            console.log(err.response.data); 
            toast.error("Failed to reset password")
        }
    }

    return(
        <div className="w-full h-full flex justify-center items-center">
            {!emailSent && <div className="w-[500px] h-[500px] shadow-2xl flex flex-col items-center justify-center ">
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <input
                type="email"
                placeholder="Enter your email"
                className="w-[350px] h-[40px] border border-white rounded-xl text-center"
                onChangeCapture={(e)=> setEmail(e.target.value)}
                />
                <button onClick = {sendOtp} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-white hover:text-black border-1 border-black">
                    Send OTP
                </button>

            </div>}
            {
                emailSent&& <div className="bg-blue-300 w-[500px] h-[500px] shadow-2xl flex flex-col items-center justify-center gap-3 rounded-2xl">
                    <h1 className="text-2xl font-bold">Verify OTP</h1>
                    <input type="text"
                    placeholder="Enter OTP"
                    className="w-[350px] h-[40px] border border-white rounded-xl text-center"
                    onChange={(e) => setOtp(e.target.value)}
                    />

                    <input type="password"
                    placeholder="Enter new passsword"
                    className="w-[350px] h-[40px] border border-white rounded-xl text-center"
                    onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <input type="password"
                    placeholder="Confirm your passsword"
                    className="w-[350px] h-[40px] border border-white rounded-xl text-center"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button onClick={resetPassword} className="w-[350px] h-[40px] bg-blue-50 rounded-2xl text-black hover:bg-blue-500"> Reset Password

                    </button>

                    </div>
            }
          
        </div>
    )
  }