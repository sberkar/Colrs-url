import { useState } from "react";
import Nav from "../components/nav";

function UrlCreate() {
    const [msg, setMsg] = useState({})

    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        let body = {
            title: title,
            url: url
        }
        fetch("https://8000-sberkar-colrsurl-u4vsxfjzhe6.ws-us87.gitpod.io/api/url/", {
            method: "post",
            body: JSON.stringify(body),
            headers: new Headers({"Content-Type": "application/json"})
        }).then(res => {
            if(res.status === 201){
                res.json().then(resData => {
                    setMsg({message: "Created Successfully!", color: "#00b500"})
                    setTitle("")
                    setUrl("")
                })
            }
            if(res.status === 500){
                res.json().then(resData => {
                    setMsg({message: resData.error.message, color: "#ff0000"})
                })
            }else{
                setMsg({message: "Sorry something went wrong!", color: "#ff0000"})
            }
        })
    }

    return <div>
        <Nav />
        <div className="w-full flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-[30%] p-4 border border-slate-200">
                <h1 className="text-3xl my-4 text-center">Create Shortened Url</h1>
                <div className="w-full my-4">
                    <input type="text" className="w-full border border-black px-2 py-1 rounded placeholder-black" placeholder="Enter URL" onChange={e => setUrl(e.target.value)} value={url}/>
                </div>
                <div className="w-full my-4">
                    <input type="text" className="w-full border border-black px-2 py-1 rounded placeholder-black" placeholder="Enter Title" onChange={e => setTitle(e.target.value)} value={title}/>
                </div>
                <div className="w-full my-4">
                    <input type="submit" className="w-full border border-black bg-[#FFC700] px-4 py-2 rounded" value="Create It!" />
                </div>
                {msg?.message?<div className={`text-[${msg.color}]`}>{msg.message}</div>:""}
            </form>
        </div>
    </div>
}

export default UrlCreate;