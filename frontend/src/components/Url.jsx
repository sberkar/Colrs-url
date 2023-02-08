function Url({ urlData }){
    <div className="flex">
        <div className="w-1/3">{urlData.title[0]}</div>
        <div className="w-2/3">
            <h3>{urlData.title}</h3>
            <p><a href={`https://colrs.in/${urlData.code}`} >colrs.in/{urlData.code}</a></p>
        </div>
    </div>
}

export default Url;