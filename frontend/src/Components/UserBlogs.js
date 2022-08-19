import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Blog.css";
import { UseStateValue } from "./StateProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function UserBlogs() {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userID");

  const sendRequest = async () => {
    let data;
    await axios
      .get(`/api/blog/personal/${id}`)
      .then((response) => (data = response.data))
      .catch((err) => console.log(err));
    console.log("myBlogs" + data);
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
    });
  });

  const navigate = useNavigate();
  const [{}, dispatch] = UseStateValue();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    let data;
    await axios
      .delete(`/api/blog/${id}`)
      .then((response) => (data = response.data))
      .catch((err) => console.log(err));
    return data;
  };

  const handleDelete = () => {
    deleteRequest()
      .then((data) => console.log(data))
      .then(() => {
        navigate("/myBlogs");
        toast.success("Blog deleted !");
        dispatch({
          type: "VALUE",
          value: 1,
        });
      });
  };

  return (
    <div style={{ position: "relative" }}>
      <h1
        style={{
          margin: "100px auto 50px auto",
          color: "#ddd",
          textAlign: "center",
          fontSize: "2.5rem",
        }}
      >
        PERSONAL BLOGS
      </h1>
      <img src="https://i.stack.imgur.com/YxytF.png" alt="" />
      {user &&
        user.blogs &&
        user.blogs.map((ele) => (
          <div key={ele._id}>
            <div className="card">
              <div className="thumbnail">
                <img className="left" src={ele.image} alt="-" />
              </div>
              <div className="right">
                {localStorage.getItem("userID") === ele.user._id && (
                  <>
                    <IconButton
                      onClick={() => handleEdit(ele._id)}
                      sx={{ position: "absolute", right: "40px" }}
                    >
                      <ModeEditOutlineIcon color="warning" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(ele._id)}
                      sx={{ position: "absolute", right: "7px" }}
                    >
                      <DeleteForeverIcon color="error" />
                    </IconButton>
                  </>
                )}
                <h1 className="h1">
                  {
                    (ele.title =
                      ele.title === null
                        ? ""
                        : ele.title.charAt(0).toUpperCase() +
                          ele.title.slice(1))
                  }
                </h1>
                <div className="author">
                  <h2 className="h2">
                    {user.name === null
                      ? "User"
                      : user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                  </h2>
                </div>
                <div className="separator"></div>
                <p className="p">
                  {ele.description == null
                    ? ""
                    : ele.description.charAt(0).toUpperCase() +
                      ele.description.slice(1)}
                </p>
              </div>
              <h5 className="h5">
                {ele.date === null ? "" : ele.date.toString().slice(-2)}
              </h5>
              <h6 className="h6">
                {ele.date === null
                  ? ""
                  : ele.date
                      .toString()
                      .substring(0, ele.date.toString().indexOf(" "))}
              </h6>
              <div className="fab">
                {user.name === null
                  ? "User"
                  : user.name.charAt(0).toUpperCase()}
              </div>
              <ToastContainer />
            </div>
          </div>
        ))}
    </div>
  );
}

export default UserBlogs;
