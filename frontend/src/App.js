import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react"
import Home from "./page/Home";
import CodeHandler from "./page/CodeHandler";
import NotFound from "./page/Not-Found";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <div className="px-[100px]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/app" />} />
          <Route path="/app">
            <Route path="" element={<Home auth={isLoggedIn} setAuth={setIsLoggedIn} />} />
          </Route>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/:code" element={<CodeHandler />} />
        </Routes> 
      </BrowserRouter> 
    </div>
  );
}

export default App;