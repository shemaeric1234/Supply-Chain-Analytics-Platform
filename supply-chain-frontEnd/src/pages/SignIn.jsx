import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/authSlice";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { signInStatus, signInError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(formData)); // Dispatch the sign-in action with the updated payload
  };
  useEffect(() => {
    if (signInStatus === "success") navigate("/inventory");
  }, [signInStatus]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        padding: 5,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      {signInError && <Typography color="error">{signInError}</Typography>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 400, width: "100%" }}
      >
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>
        Don't you have an accout yet?{" "}
        <a href="http://localhost:5173/signup">sign up</a>
      </Box>
    </Box>
  );
};

export default SignIn;
