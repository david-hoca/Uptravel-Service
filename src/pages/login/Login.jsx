import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { BASE_URL } from "../../API/api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // STORES USER IN THE DATABASE
      const response = await axios.post(`${BASE_URL}user/login`, {
        email,
        password,
      });
      console.log(response);
      const { data, token } = response.data;

      localStorage.setItem("userData", JSON.stringify(data));
      localStorage.setItem("token", token);

      // TAKES THE AUTHORIZED USER TO THE HOME-PAGE
      setSnackbarMessage("Login successful!");
      setOpenSnackbar(true);
      window.location.replace("/home");
      // navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setSnackbarMessage("Login failed, please try again!");
      setOpenSnackbar(true);
    }
  };

  return (
    <React.Fragment>
      <div className="login">
        <div className="login__wrapper">
          <div className="login__backgroundImage"></div>
          <div className="login__forms">
            <Link className="login__home" to={"/home"}>
              {" "}
              <HomeIcon /> <span>Home</span>
            </Link>
            <h1 className="login__header">
              Welcome! Interesting things are awaiting for you.
            </h1>
            <h2 className="login__title">Log in</h2>
            <p className="login__terms">
              By continuing, you agree to our{" "}
              <a href="policies/user-agreement">User Agreement</a> and{" "}
              <a href="policies/user-privacy">Privacy Policy.</a>
            </p>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  width: "30ch",
                  display: "block",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="outlined-required"
                label="Email"
                placeholder="Enter your email address"
                autoComplete="on"
                inputProps={{
                  style: { width: "250px", height: "20px" },
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                inputProps={{
                  style: { width: "250px", height: "20px" },
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={handleLogin}
                style={{ margin: "10px" }}
                variant="contained"
              >
                Login
              </Button>
              <p className="login__terms">
                Forgot your <a href="policies/forgot-email">email</a> or
                <a href="policies/forgot-password"> password?</a>
              </p>

              <span className="login__Isnew">
                New to UpTravel?{" "}
                <Link className="login__redirectSignUp" to={"/register"}>
                  SIGN UP
                </Link>
              </span>
            </Box>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnackbar}
        autoHideDuration={8000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};
