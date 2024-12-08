import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/authSlice";
import {
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const { signUpStatus, signUpError } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signUp(formData)).unwrap();
      navigate("/"); // Redirect to sign-in after successful sign-up
    } catch (err) {
      setError("Error signing up. Please try again.");
    }
  };

  useEffect(() => {
    if (signUpStatus === "success") navigate("/signin");
  }, [signUpStatus]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: 500,
        padding: 5,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      {signUpError && <Typography color="error">{signUpError}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          type="email"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          type="password"
          required
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-disabled-label">Role</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-disabled-label"
            id="demo-simple-select-disabled"
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="customer">customer</MenuItem>
            <MenuItem value="supplier">supplier</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Sign Up
        </Button>
        Do you have accout? <a href="http://localhost:5173/">sign in</a>
      </form>
    </Box>
  );
};

export default SignUp;
