import React from "react";
import "./Blog.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IconButton } from "@mui/material";
import { UseStateValue } from "./StateProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Blog({ title, description, imageURL, userName, isUser, id, date }) {
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
    <>
      <div>
        <div className="card">
          <div className="thumbnail">
            <img className="left" src={imageURL} />
          </div>
          <div className="right">
            {isUser && (
              <>
                <IconButton
                  onClick={handleEdit}
                  sx={{ position: "absolute", right: "40px" }}
                >
                  <ModeEditOutlineIcon color="warning" />
                </IconButton>
                <IconButton
                  onClick={handleDelete}
                  sx={{ position: "absolute", right: "7px" }}
                >
                  <DeleteForeverIcon color="error" />
                </IconButton>
              </>
            )}
            <h1 className="h1">
              {
                (title =
                  title === null
                    ? ""
                    : title.charAt(0).toUpperCase() + title.slice(1))
              }
            </h1>
            <div className="author">
              <h2 className="h2">
                {userName === null
                  ? "User"
                  : userName.charAt(0).toUpperCase() + userName.slice(1)}
              </h2>
            </div>
            <div className="separator"></div>
            <p className="p">
              {description == null
                ? ""
                : description.charAt(0).toUpperCase() + description.slice(1)}
            </p>
          </div>
          <h5 className="h5">
            {date === null ? "" : date.toString().slice(-2)}
          </h5>
          <h6 className="h6">
            {date === null
              ? ""
              : date.toString().substring(0, date.toString().indexOf(" "))}
          </h6>
          <div className="fab">
            {userName === null ? "User" : userName.charAt(0).toUpperCase()}
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Blog;
