import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

function UserBlogs() {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userID");

  const sendRequest = async () => {
    let data;
    await axios
      .get(`/api/blog/user/${id}`)
      .then((response) => (data = response.data))
      .catch((err) => console.log(err));
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
    });
  });

  return (
    <>
      <h1
        style={{
          margin: "100px auto 50px auto",
          color:"#ddd",
          textAlign: "center",
          fontSize: "2.5rem",
        }}
      >
        PERSONAL BLOGS
      </h1>
      {user &&
        user.blogs &&
        user.blogs.map((ele) => (
          <Blog
            key={ele._id}
            id={ele._id}
            date={ele.date}
            isUser={true}
            title={ele.title}
            description={ele.description}
            imageURL={ele.image}
            userName={user.name}
          />
        ))}
    </>
  );
}

export default UserBlogs;
