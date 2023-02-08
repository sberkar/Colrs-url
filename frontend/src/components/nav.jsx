import { NavLink } from "react-router-dom";
import Logo from "./logo.svg"

function Nav(){
    return <nav className="py-[20px]">
        <header>
            <div className="">
                <NavLink to={"/"}><img className="h-[70px]" src={Logo} alt="logo" /></NavLink>
            </div>
            <div className="other">

            </div>
        </header>
    </nav>
}

export default Nav;