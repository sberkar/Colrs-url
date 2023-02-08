import Url from "./Url";
import { useState, useEffect } from "react"

function UrlList() {
    const [urls, setUrls] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://8000-sberkar-colrsurl-u4vsxfjzhe6.ws-us86.gitpod.io/api/url/all`).then(res => {
            if(res.status === 200){
                res.json().then(resData => {
                    console.log("result data", resData)
                    setUrls(resData)
                    setLoading(false)
                }).catch(err => console.log(err))
            }else{
                setError({
                    message: "Something went wrong"
                })
                setLoading(false)
            }
        }).catch(err => console.log(err))
    }, [])


    return <div>
        <h2 className="text-3xl">All URLs</h2>
        {!loading?<div>{error.length === 0?urls.map(url => {
            console.log(url.code)
            return <Url key={url.code} urlData={url} />
            }):<div>{error.message}</div>}</div>:<div>Loading...</div>}
    </div>
}

export default UrlList;