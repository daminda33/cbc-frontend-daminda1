import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'
import ClientWebPage from './pages/client/clientWebPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPasswordPage from './pages/client/forgetPassword'
import AboutUs from './pages/aboutus'
const clientId = "942076200283-16oeaeu2qkgodqat04ua0chq51h792m6.apps.googleusercontent.com";


function App() {

  return (
    <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
     <div className="w-full h-screen flex justify-center items-center bg-amber-50">
      <Toaster position="top-right"/>
       <div className="w-full h-full">
        <Routes path="/">
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/forget/*" element={<ForgetPasswordPage/>}/>
        <Route path="/testpage" element={<TestPage/>}/>
        <Route path="/*" element={<ClientWebPage/>}/>
        </Routes>      
      </div>
      </div>
      </GoogleOAuthProvider>
      </BrowserRouter>
    
  )
}

export default App
