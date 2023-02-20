import { Link } from "react-router-dom";

function Url({ urlData }){
    return <div className="flex w-[300px] my-4">
        <div className={`w-[70px] h-[70px] rounded-lg mx-2 flex items-center justify-center bg-[#FFC700] border text-2xl border-black uppercase`}>{urlData.title[0]}</div>
        <div className="">
            <h3 className="text-xl"><Link to={`/app/url/${urlData.code}`}>{urlData.title}</Link></h3>
            <p><a href={`/${urlData.code}`} >colrs.in/{urlData.code}</a></p>
        </div>
    </div>
}

export default Url;