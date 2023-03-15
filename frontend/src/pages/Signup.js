import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Alert,
} from "@mui/material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");

  // TODO add hooks for signup
  // TODO add hooks for auth context

  // TODO redirect user to homepage if they are already logged in

  const handleSubmit = async (event) => {
    event.preventDefault();

    // TODO add handler for signup
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        bgcolor: "primary.main",
      }}
    >
      <Grid item xs={3}>
        <Paper variant="outlined" sx={{ p: 1 }}>
          <div className="signup-wrapper">
            <Typography variant="h4" sx={{ mt: 2, ml: 1, mr: 1 }}>
              Sign Up
            </Typography>
            <form className="signup" onSubmit={handleSubmit}>
              <TextField
                type="email"
                required
                label="Email"
                onChange={(event) => setEmail(event.target.value)}
                sx={{ mt: 1, ml: 1, mr: 1 }}
                value={email}
              />
              <br />
              <TextField
                type="password"
                required
                label="Password"
                onChange={(event) => setPassword(event.target.value)}
                sx={{ mt: 1, ml: 1, mr: 1 }}
                value={password}
              />
              <br />
              <TextField
                type="password"
                required
                label="Confirm Password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                sx={{ mt: 1, ml: 1, mr: 1 }}
                value={confirmPassword}
              />
              <br />
              <TextField
                type="text"
                required
                label="First Name"
                onChange={(event) => setFirstName(event.target.value)}
                sx={{ mt: 1, ml: 1, mr: 1 }}
                value={firstName}
              />
              <br />
              <TextField
                type="text"
                required
                label="Last Name"
                onChange={(event) => setLastName(event.target.value)}
                sx={{ mt: 1, ml: 1, mr: 1 }}
                value={lastName}
              />
              <br />
              <TextField
                type="phone"
                required
                label="Mobile Number"
                onChange={(event) => setNumber(event.target.value)}
                sx={{ mt: 1, ml: 1, mr: 1 }}
                value={number}
              />
              {/*}
              {error && (
                <Alert severity="error" sx={{ mt: 1, ml: 1, mr: 1 }}>
                  {error}
                </Alert>
              )}
              {message && (
                <Alert severity="success" sx={{ mt: 1, ml: 1, mr: 1 }}>
                  {message}
                </Alert>
              )}
              {*/}
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Button
                  // disabled={isLoading}
                  type="submit"
                  variant="contained"
                  sx={{ mr: 1, mb: 1, mt: 1 }}
                >
                  Sign Up
                </Button>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 1, mb: 1 }}
              >
                <Typography>
                  Already have an account? <Link to="/login">Log In</Link>
                </Typography>
              </Box>
            </form>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
