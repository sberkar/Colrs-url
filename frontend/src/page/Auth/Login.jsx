import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/nav"

function Login(){
    const [email, setEmail] = useState("");
    const [emailValidation, setEmailValidation] = useState("");

    const [password, setPassword] = useState("")
    const [passwordValidation, setPasswordValidation] = useState("")

    const handleLogin = () => {
    }

    return <>
    <Nav />
    <div className="flex flex-col justify-center items-center">
        <div className="border border-slate-200 rounded px-8 py-4">
            <h1 className="text-center text-3xl mb-8">Log In</h1>
            <div className="w-full">
                <input type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-black rounded placeholder-black px-4 py-2 mb-4" />
            </div>
            <div className="w-full">
                <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-black rounded placeholder-black px-4 py-2 mb-4" />
            </div>
            <div className="w-full">
                <button type="button" className="w-full border border-black rounded placeholder-black px-4 py-2 text-center bg-[#FFC700] mb-4">Log Into Account</button>
            </div>
            <div className="w-full">
                <p className="text-center">Don't Have Account Yet? <Link className="text-[#4800b3]" to={"/app/signup"}>Sign Up Here</Link></p>
            </div>
        </div>
    </div>
    </>
}

export default Login;