import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  InputBase,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

import DrawerComp from "./Drawer.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { UseStateValue } from "./StateProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
function Headers({ classes }) {
  const [{ login, value,userName }, dispatch] = UseStateValue();

  // ---------------------------------------------------------------------------------------
  const location = useLocation();

  // ---------------------------------------------------------------------------------------

  const setValue = (val) => {
    dispatch({
      type: "VALUE",
      value: val,
    });
  };
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  // ---------------------------------------------------------------------
  const handleLogout = (bool) => {
    dispatch({
      type: "LOGIN",
      login: bool,
    });
    localStorage.removeItem("userID");
  };
  let id = localStorage.getItem("userID");

  return (
    <div>
      <AppBar sx={{ backgroundColor: "primary", position: "fixed" }}>
        <Toolbar>
          {!isMatch && (
            <Typography sx={{ fontSize: "2rem" }}>Blog App</Typography>
          )}
          {isMatch ? (
            <>
              <Typography
                sx={{
                  fontSize: "2rem",
                  paddingLeft: "10%",
                  color: "#fff",
                }}
              >
                BlogApp
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              {login ? (
                <>
                  <Tabs
                    sx={{ margin: "auto" }}
                    indicatorColor="secondary"
                    textColor="inherit"
                    value={value}
                    onChange={(e, value) => setValue(value)}
                  >
                    <Tab
                      sx={{ color: "#fff", fontSize: "1.2rem" }}
                      LinkComponent={Link}
                      to="/blogs"
                      label="All Blogs"
                    />
                    <Tab
                      sx={{ color: "#fff", fontSize: "1.2rem" }}
                      LinkComponent={Link}
                      to="/myBlogs"
                      label="My Blogs"
                    />
                    <Tab
                      LinkComponent={Link}
                      to="/myBlogs/add"
                      sx={{ color: "#fff", fontSize: "1.2rem" }}
                      label="Add Blogs"
                    />
                  </Tabs>
                  {location.pathname.toString() === "/myBlogs" ||
                  location.pathname.toString() === "/myBlogs/add" ? null : (
                    <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        onChange={(e) => {
                          dispatch({
                            type: "SEARCH",
                            search: e.target.value,
                          });
                        }}
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                      />
                    </Search>
                  )}
                  <Button
                    sx={{ marginLeft: "20px" }}
                    LinkComponent={Link}
                    to="/auth"
                    color="error"
                    onClick={() => {
                      handleLogout(false);
                      toast.success("Logout successfull!");
                    }}
                    variant="contained"
                  >
                    Logout
                  </Button>
                  <Avatar
                    onClick={() =>
                      toast.success(
                        `${
                          userName.toString().charAt(0).toUpperCase() +
                          userName.toString().slice(1)
                        } is Logged in!`
                      )
                    }
                    sx={{ marginLeft: "20px", bgcolor: "orange" }}
                  >
                    {userName === null ? "" : userName.charAt(0).toUpperCase()}
                  </Avatar>
                </>
              ) : (
                <>
                  <Button
                    LinkComponent={Link}
                    to="/"
                    sx={{
                      marginLeft: "40%",
                      color: "#fff",
                      fontSize: "1.5rem",
                      border: "1px solid #fff",
                      padding: "4px 20px 4px 20px",
                    }}
                  >
                    HOME
                  </Button>
                  <Button
                    sx={{ marginLeft: "auto" }}
                    LinkComponent={Link}
                    to="/auth"
                    color="success"
                    variant="contained"
                  >
                    Login
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <ToastContainer />
    </div>
  );
}

export default Headers;
