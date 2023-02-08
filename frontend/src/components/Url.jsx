function Url({ urlData }){
    return <div className="flex w-[200px]">
        <div className={`w-1/3 flex items-center justify-center color-[${urlData.bg}]`}>{urlData.urlTitle[0]}</div>
        <div className="w-2/3">
            <h3>{urlData.urlTitle}</h3>
            <p><a href={`https://colrs.in/${urlData.code}`} >colrs.in/{urlData.code}</a></p>
        </div>
    </div>
}

export default Url;