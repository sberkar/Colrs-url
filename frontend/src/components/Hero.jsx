import HeroImg from "./hero-img.svg"

function Hero({changeAuth}) {
    return <div className="px-[10%] flex justify-center items-center">
        <div className="w-1/2">
            <h2 className="text-5xl font-[roboto]">Short Your URLs for Better Reach</h2>
            <p className="py-4 text-slate-800">Create short URL with colrs URL and manage it with ease.</p>
            <button onClick={() => changeAuth(true)} className="text-black bg-[#FFC700] rounded  px-4 py-2 border border-black">Get Started</button>
        </div>
        <img src={HeroImg} className="w-1/2 px-[5%]" alt="HeroImg" />
    </div>
}

export default Hero;