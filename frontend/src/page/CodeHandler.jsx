import { useEffect } from "react";
import { useParams } from "react-router-dom";

function CodeHandler() {
    let { code } = useParams()

    useEffect(() => {
        fetch(`https://8000-sberkar-colrsurl-u4vsxfjzhe6.ws-us85.gitpod.io/api/url/${code}`).then(res => {
            res.json().then(urlInfo => {
                if(res.status === 200){
                    window.location.replace(urlInfo.url);
                }else{
                    window.location.pathname = "/not-found";
                }
            })
        })
    }, [code])

    return <div></div>
}

export default CodeHandler;