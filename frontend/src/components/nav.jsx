import { NavLink } from "react-router-dom";
import Logo from "./logo.svg"

function Nav(){
    return <nav className="py-[20px]">
        <header className="flex items-center">
            <div className="w-1/3">
                <NavLink to={"/"}><img className="h-[70px]" src={Logo} alt="logo" /></NavLink>
            </div>
            <div className="w-2/3  flex justify-evenly">
                <div>
                    <NavLink to="/app/create">Create</NavLink>
                </div>
                <div>
                    <NavLink to={"/app/urls"}>All Urls</NavLink>
                </div>
                <div>
                    <NavLink to={"/app/login"}>Login</NavLink>
                </div>
            </div>
        </header>
    </nav>
}

export default Nav;