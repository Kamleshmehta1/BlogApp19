import React from "react";
import { useState } from "react";
import axios from "axios";
import "./AddBlog.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UseStateValue } from "./StateProvider";

function AddBlog() {
  const navigate = useNavigate();
  const [{}, dispatch ] = UseStateValue();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  let today = new Date();
  var options = { day: "numeric", month: "long" };

  const sendRequest = async () => {
    let data;
    await axios
      .post("/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userID"),
        date: today.toLocaleDateString("en-US", options), //Saturday, September 17, 2016
      })
      .then((response) => (data = response.data))
      .catch((err) => console.log(err));
    return data;
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.title === "" ||
      inputs.description === "" ||
      inputs.imageURL === ""
    ) {
      alert("Kindly enter valid title, imageURL, description");
      return;
    }

    sendRequest()
      .then((data) => console.log(data))
      .then(() => {
        toast.success("Blog Added !");
        navigate("/blogs");
      })
      .then(() => {
        dispatch({
          type: "VALUE",
          value: 0,
        });
      });
  };
  return (
    <div className="body">
      <form className="form" onSubmit={handleSubmit}>
        <h1
          className="subtitle"
          style={{ textAlign: "center", fontSize: "2rem" }}
        >
          ADD NEW BLOG
        </h1>
        <div className="input-container ic1">
          <input
            id="title"
            name="title"
            className="input"
            onChange={handleChange}
            type="text"
            maxLength="15"
            minLength="1"
            autoComplete="off"
            placeholder=" "
          />
          <div className="cut"></div>
          <label htmlFor="title" className="placeholder">
            Title...
          </label>
        </div>
        <div className="input-container ic2">
          <input
            id="image"
            name="imageURL"
            className="input"
            onChange={handleChange}
            type="text"
            autoComplete="off"
            placeholder=" "
          />
          <div className="cut"></div>
          <label htmlFor="image" className="placeholder">
            Image URL...
          </label>
        </div>
        <div className="input-container ic2">
          <textarea
            id="desc"
            className="input wideInput"
            style={{}}
            name="description"
            minLength="100"
            maxLength="380"
            onChange={handleChange}
            type="text"
            autoComplete="off"
            placeholder=" "
          />
          <div className="cut cut-short"></div>
          <label htmlFor="desc" className="placeholder">
            Description...
          </label>
        </div>
        <button type="submit" className="submit">
          submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddBlog;
