import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./page/Home";
import CodeHandler from "./page/CodeHandler";
import NotFound from "./page/Not-Found";
import UrlCreate from "./page/UrlCreate";
import UrlInfo from "./page/UrlInfo";
import SignUp from "./page/Auth/SignUp";
import Login from "./page/Auth/Login"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <div className="px-[100px]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/app" />} />
          <Route path="/app">
            <Route path="" element={<Home auth={isLoggedIn} setAuth={setIsLoggedIn} />} />
            <Route path="create" element={<UrlCreate />} />
            <Route path="url">
                <Route path=":code" element={<UrlInfo />} />
            </Route>
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/:code" element={<CodeHandler />} />
        </Routes> 
      </BrowserRouter> 
    </div>
  );
}

export default App;