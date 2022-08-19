import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseStateValue } from "./StateProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BlogDetails() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState("");
  const [{}, dispatch] = UseStateValue();

  const id = useParams().id;

  let today = new Date();
  var options = { year: "numeric", month: "long", day: "numeric" };

  const fetchDetails = async () => {
    let data;
    await axios
      .put(`/api/blog/update/${id}`)
      .then((response) => (data = response.data))
      .catch((err) => console.log(err));
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        imageURL: data.blog.image,
        date: today.toLocaleDateString("en-US", options), //Saturday, September 17, 2016
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    let data;
    await axios
      .put(`/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
      })
      .then((response) => (data = response.data))
      .catch((err) => console.log(err));
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => {
        toast.success("Blog Updated !");
        navigate("/myBlogs");
        dispatch({
          type: "VALUE",
          value: 1,
        });
      });
  };

  return (
    <>
      {inputs && (
        <div className="body">
          <form className="form" onSubmit={handleSubmit}>
            <h1
              className="subtitle"
              style={{ textAlign: "center", fontSize: "2rem" }}
            >
              UPDATE YOUR BLOG
            </h1>
            <div className="input-container ic1">
              <input
                id="title"
                name="title"
                value={inputs.title}
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
                value={inputs.imageURL}
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
                value={inputs.description}
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
      )}
    </>
  );
}

export default BlogDetails;
