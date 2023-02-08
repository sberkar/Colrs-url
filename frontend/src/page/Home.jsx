import Nav from "../components/nav";
import UrlList from "../components/UrlList";
import Hero from "../components/Hero"

function Home({auth, setAuth}) {
    return <div className="">
        <Nav />
        {auth?<UrlList />:<Hero changeAuth={setAuth} />}
    </div>
}

export default Home;