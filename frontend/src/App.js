import React, { useEffect } from "react";
import Headers from "./Components/Headers";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Auth from "./Components/Auth";
import Blogs from "./Components/Blogs";
import UserBlogs from "./Components/UserBlogs";
import BlogDetails from "./Components/BlogDetails.js";
import AddBlog from "./Components/AddBlog.js";
import { UseStateValue } from "./Components/StateProvider";
import Home from "./Components/Home";

function App() {
  const [{ login }, dispatch] = UseStateValue();

  useEffect(() => {
    if (localStorage.getItem("userID")) {
      dispatch({
        type: "LOGIN",
        login: true,
      });
    }
  }, [dispatch]);

  const location = useLocation().pathname.toString();
  const navigate = useNavigate();
  
  if (login && location === "/") {
    console.log(true);
    navigate(`/myBlogs` || `/blogs`);
  }
  return (
    <React.Fragment>
      <header>{location === "/" ? null : <Headers />}</header>
      <main>
        <Routes>
          {!login ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
            </>
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/myBlogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetails />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
