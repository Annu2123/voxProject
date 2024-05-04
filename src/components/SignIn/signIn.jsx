import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import voxpro from "../../assets/01.png";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.jpg";
import apple from "../../assets/apple.png";

const loginAvatars = [
  {
    alt: "google",
    src: google,
  },
  {
    alt: "facebook",
    src: facebook,
  },
  {
    alt: "apple",
    src: apple,
  },
];

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
    } else {
      console.log("Signing in...");
      setError(null);
    }
  };

  const handleShow = () => {
    setShow((prevShow) => !prevShow);
  };

  const handleSign = () => {
    console.log("Signing in...");
  };
  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <Box
        sx={{
          minHeight: "30vh",
          backgroundColor: "#90e0ef",
          p: 2,
          borderRadius: "9px",
          border: "1px solid #0077b6",
        }}
      >
        <img src={voxpro} alt="voxpro" style={{ height: "30px" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: {xs:-24,md:-14},
        }}
      >
        <Card
          sx={{
            width: { xs: "80%", md: "30%", lg: "25%" },
            p: 2,
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold" }}
            onClick={handleSign}
          >
            Sign in
          </Typography>
          <Typography variant="subtitle2">
            One step towards your healthcare
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 1,
              gap: 2,
              mt: 1,
            }}
          >
            <TextField
              size="small"
              fullWidth
              placeholder="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && !email}
              helperText={error && !email && error}
            />
            <TextField
              size="small"
              fullWidth
              placeholder="Password"
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    onClick={handleShow}
                    sx={{ cursor: "pointer" }}
                  >
                    {show ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                ),
              }}
              error={error && !password}
              helperText={error && !password && error}
            />

            <Link href="#" underline="none" sx={{ fontWeight: 550 }}>
              Forgot password?
            </Link>
            <Button
              variant="contained"
              sx={{ borderRadius: "15px" }}
              onClick={handleSignIn}
            >
              Sign in
            </Button>
            <Divider>or</Divider>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              {loginAvatars.map((avatar, i) => (
                <Box key={i}>
                  <Avatar
                    alt={avatar.alt}
                    src={avatar.src}
                    sx={{ width: 24, height: 24, cursor: "pointer" }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Card>

        <Typography variant="subtitle2" fontWeight={550} sx={{ mt: 1 }}>
          New User?
          <Link href="#" underline="none">
            Join now
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignIn;
