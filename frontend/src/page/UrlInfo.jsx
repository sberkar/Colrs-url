import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/nav';

function UrlInfo(){
    let { code } = useParams();

    const [codeInformation, setCodeInformation] = useState(null)
    const [loading, setLoading] = useState(true)

    const boxRef = useRef()

    useEffect(() => {
        fetch(`https://8000-sberkar-colrsurl-u4vsxfjzhe6.ws-us87.gitpod.io/api/url/${code}`).then(res => {
            res.json().then(resData => {
                setCodeInformation(resData)
                setLoading(false)
            })
        })
    }, [code])

    console.log(boxRef)

    return <div>
        <Nav />
        {loading?<div>Loading...</div>:<div className='flex'>
            <div ref={boxRef} className={`flex w-[72px] justify-center bg-[#FFC700] items-center mr-8`}>
                {codeInformation.title[0]}
            </div>
                <div>
                    <h2>{codeInformation.title}</h2>
                    <p>{codeInformation.url}</p>
                    <p><a href={`/${codeInformation.code}`}>https://colrs.in/{codeInformation.code}</a></p>
                </div>
            </div>} 
    </div>
}

export default UrlInfo;