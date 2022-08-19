import React, { useState } from "react";
import axios from "axios";
import "./auth.css";
import { UseStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Auth() {
  const [inputs, setInput] = useState({ name: "", email: "", password: "" });
  const [isSignUp, setSignUp] = useState(false);
  const navigate = useNavigate();

  const [{},dispatch] = UseStateValue();

  const addUser = (bool) => {
    dispatch({
      type: "LOGIN",
      login: bool,
    });
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    let res = await axios
      .post(`/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log("err" + err));
    let data = await res.data;
    dispatch({
      type: "USER",
      userName: data.user.name,
    });
    return data;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (inputs.name === "" || inputs.email === "" || inputs.password === "") {
        toast.error("Invalid input!");
        return;
      }
      sendRequest("signup")
        .then((data) => localStorage.setItem("userID", data.user._id))
        .then(() => addUser(false))
        .then(() => toast.success("Successful Signup!"))
        .then(() => {
          navigate("/auth");
          dispatch({
            type: "VALUE",
            value: 1,
          });
        });
    } else {
      if (inputs.email === "" || inputs.password === "") {
        toast.error("Invalid input!");
        return;
      }
      sendRequest()
        .then((data) => localStorage.setItem("userID", data.user._id))
        .then(() => addUser(true))
        .then(() => {
          toast.success("Successful Login!");
          navigate("/blogs");
          dispatch({
            type: "VALUE",
            value: 1,
          });
        })
        .catch((err) => {
          // navigate(0);
          toast.warn("No user found!");
        });
    }
  };

  return (
    <div style={{ boxSizing: "border-box" }}>
      <div
        className={`container ${isSignUp ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h1 className="auth-h1">Create Account</h1>
            <input
              className="input-auth"
              type="text"
              name="name"
              autoComplete="off"
              value={inputs.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              className="input-auth"
              type="email"
              name="email"
              autoComplete="off"
              value={inputs.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              className="input-auth"
              type="password"
              name="password"
              minLength={8}
              autoComplete="off"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <button
              className="button"
              type="submit"
              variant="contained"
              sx={{ borderRadius: 3, marginTop: 3 }}
              color="warning"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h1 className="auth-h1">Sign in</h1>
            <input
              className="input-auth"
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              className="input-auth"
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <button
              className="button"
              type="submit"
              variant="contained"
              sx={{ borderRadius: 3, marginTop: 3 }}
              color="warning"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="auth-h1">Welcome Back!</h1>
              <p className="auth-p">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="button ghost"
                id="signIn"
                onClick={() => setSignUp(false)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="auth-h1">Hello, Friend!</h1>
              <p className="auth-p">
                Enter your personal details and start journey with us
              </p>
              <button
                className="button ghost"
                onClick={() => setSignUp(true)}
                id="signUp"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Auth;
