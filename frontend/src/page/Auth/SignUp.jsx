import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/nav"

function SignUp(){
    const [signUpProcessing, setSignUpProcessing] = useState(false)
    const [signUpMsg, setSignUpMsg] = useState("")

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {
        setSignUpProcessing(true)
        let headers = { "Content-Type": "application/json"}
        let payload = { name, email, password }
        fetch("https://8000-sberkar-colrsurl-u4vsxfjzhe6.ws-us87.gitpod.io/api/url/user/signup", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        }).then(res => {
            if(res.status === 201){
                res.json().then(data => {
                    setSignUpMsg(data.success.message)
                    setTimeout(() => {
                        window.location.replace("/app/login")
                    }, 2000)
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    }

    return <>
    <Nav />
    <div className="flex flex-col justify-center items-center">
        <div className="border border-slate-200 rounded px-8 py-4">
            <h1 className="text-center text-3xl mb-8">Sign Up</h1>
            <div className="w-full">
                <input type="text" placeholder="Enter Name" required onChange={e => setName(e.target.value)} value={name} className="w-full border border-black rounded placeholder-black px-4 py-2 mb-4" />
            </div>
            <div className="w-full">
                <input type="email" placeholder="Enter Email" required onChange={e => setEmail(e.target.value)} value={email} className="w-full border border-black rounded placeholder-black px-4 py-2 mb-4" />
            </div>
            <div className="w-full">
                <input type="password" placeholder="Enter Password" required onChange={e => setPassword(e.target.value)} value={password} className="w-full border border-black rounded placeholder-black px-4 py-2 mb-4" />
            </div>
            <div className="w-full">
                <button type="button" className="w-full border border-black rounded placeholder-black px-4 py-2 text-center bg-[#FFC700] mb-4" disabled={signUpProcessing} onClick={() => {
                    handleSubmit()
                }}>Create Account</button>
            </div>
            <div className="w-full">
                <p className="text-center">Already Have Account? <Link className="text-[#4800b3]" to={"/app/login"}>Login Here</Link></p>
            </div>
            <div className="w-full">
                <p className="text-center text-[green]">{signUpMsg.length > 0?signUpMsg: ""}</p>
            </div>
        </div>
    </div>
    </>
}

export default SignUp;