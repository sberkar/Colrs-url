import Nav from "../components/nav"

function NotFound() {
    return <div>
        <Nav />
        <div className="text-[#ff0000] px-[100px]">
            <h1 className="text-3xl">Page Not Found.</h1>
            <p className="py-2">This all we know</p>
        </div>
    </div>
}

export default NotFound;