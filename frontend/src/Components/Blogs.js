import React, { useEffect } from "react";
import axios from "axios";
import Blog from "./Blog";
import { useState } from "react";
import { UseStateValue } from "./StateProvider";

function Blogs() {
  const [blogs, setBlogs] = useState();
  const [{ search }] = UseStateValue();

  const sendRequestforAll = async (key) => {
    //send all data if search box is empty
    let data;
    await axios
      .get(`/api/blog`)
      .then((response) => (data = response.data))
      .catch((err) => console.log(err));
    return data;
  };

  const searchRequest = async (key) => {
    // search specific data
    let data;
    await axios
      .get(`/api/blog/${search}`)
      .then((response) => (data = response.data))
      .catch((err) => console.log(err));
    return data;
  };

  useEffect(() => {
    if (search) {
      searchRequest().then((data) => {
        setBlogs(data.blogs);
      });
    } else {
      sendRequestforAll().then((data) => {
        setBlogs(data.blogs);
      });
    }
  }, [search]);

  return (
    <>
      <h1
        style={{
          margin: "100px auto 50px auto",
          color: "#ddd",
          textAlign: "center",
          fontSize: "2.5rem",
        }}
      >
        ALL BLOGS
      </h1>
      {blogs &&
        blogs.map((ele, index) => (
          <Blog
            key={ele._id}
            id={ele._id}
            date={ele.date}
            isUser={localStorage.getItem("userID") === ele.user._id}
            title={ele.title}
            description={ele.description}
            imageURL={ele.image}
            userName={ele.user.name}
          />
        ))}
    </>
  );
}

export default Blogs;
