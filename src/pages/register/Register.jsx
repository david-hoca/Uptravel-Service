import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../API/api";

import "./Register.scss";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // STORES USER IN THE DATABASE
      const response = await axios.post(`${BASE_URL}user`, { email, password });
      const { token } = response.data;

      localStorage.setItem("token", token);

      // TAKES THE AUTHORIZED USER TO THE HOME-PAGE
      setSnackbarMessage("Signup successful!");
      setOpenSnackbar(true);
      window.location.replace("/home");
      // navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="register">
        <div className="register__wrapper">
          <div className="register__backgroundImage"></div>
          <div className="register__forms">
            <h2 className="register__title">Register</h2>
            <p className="register__terms">
              By continuing, you are setting up UpTravel account and agree to
              our <a href="policies/user-agreement">User Agreement</a> and{" "}
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
                style={{ margin: "10px", display: "block" }}
                variant="contained"
                onClick={handleSignUp}
              >
                CONTINUE
              </Button>
              <span className="register__Isnew">
                Already an UpTraveler?{" "}
                <Link className="register__redirectSignUp" to={"/login"}>
                  LOGIN
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
