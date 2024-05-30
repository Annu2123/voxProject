import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { startLoginUser } from "../../actions/Auth/user";
import { useNavigate } from "react-router";
import loginImage from '../Images/signInImage.jpeg'
import toast from "react-hot-toast";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.voxprosolutions.com/" target="_blank">
        VoxPro Solutions Pvt Ltd
      </Link>
      {"  "}{new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    try {
      await dispatch(startLoginUser(formData));
      const token = localStorage.getItem('token');
      const roles = localStorage.getItem('roles');
      if(token){
        if (roles && roles==='user') {
          navigate('/consultation');
          window.location.reload();
        }else if (roles && roles==='admin'){
          navigate('/dashboard');
          window.location.reload();
        } else {
          throw new Error('Token not found');
        }
      }
      
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false); 
    }
  };

  const token = localStorage.getItem("token");
  const roles = localStorage.getItem('roles');

  React.useEffect(() => {
    if (token === null) {
      navigate("/signin");
    } else if (roles === 'user')  {
      navigate('/consultation');
    }else if (roles === 'admin') {
      navigate('/dashboard');
    }
  }, [token,roles]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              `url(${loginImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "30% 30%",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               {loading ? 'Loading...' : 'Sign IN'}
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}


// import {
//   Avatar,
//   Box,
//   Button,
//   Card,
//   Divider,
//   InputAdornment,
//   Link,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import voxpro from "../../assets/01.png";
// import google from "../../assets/google.png";
// import facebook from "../../assets/facebook.jpg";
// import apple from "../../assets/apple.png";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
// import { startLoginUser } from "../../actions/Auth/user";
// import { Toaster } from "react-hot-toast";

// const loginAvatars = [
//   {
//     alt: "google",
//     src: google,
//   },
//   {
//     alt: "facebook",
//     src: facebook,
//   },
//   {
//     alt: "apple",
//     src: apple,
//   },
// ];

// const SignIn = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [show, setShow] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSignIn = async (e) => {
//     if (!email || !password) {
//       setError("Please enter both email and password.");
//     } else {
//       setError(null);
//       e.preventDefault();
//       const formData = {
//         email: email,
//         password: password,
//       };
//       console.log(formData);
//       try {
//         await dispatch(startLoginUser(formData));
//         navigate("/");
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const handleShow = () => {
//     setShow((prevShow) => !prevShow);
//   };

//   const handleSign = () => {
//     console.log("Signing in...");
//   };

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (token === null) {
//       navigate("/signIn");
//     } else {
//       navigate("/");
//     }
//   }, []);

//   return (
//     <Box sx={{ height: "100vh", width: "100%" }}>
//       <Box
//         sx={{
//           minHeight: "30vh",
//           backgroundColor: "#90e0ef",
//           p: 2,
//           borderRadius: "9px",
//           border: "1px solid #0077b6",
//         }}
//       >
//         <img src={voxpro} alt="voxpro" style={{ height: "30px" }} />
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           mt: { xs: -24, md: -14 },
//         }}
//       >
//         <Card
//           sx={{
//             width: { xs: "80%", md: "30%", lg: "25%" },
//             p: 2,
//             borderRadius: "8px",
//             boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{ fontWeight: "bold" }}
//             onClick={handleSign}
//           >
//             Sign in
//           </Typography>
//           <Typography variant="subtitle2">
//             One step towards your healthcare
//           </Typography>

//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               padding: 1,
//               gap: 2,
//               mt: 1,
//             }}
//           >
//             <TextField
//               size="small"
//               fullWidth
//               placeholder="Email"
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               error={error && !email}
//               helperText={error && !email && error}
//             />
//             <TextField
//               size="small"
//               fullWidth
//               placeholder="Password"
//               type={show ? "text" : "password"}
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment
//                     onClick={handleShow}
//                     sx={{ cursor: "pointer" }}
//                   >
//                     {show ? <Visibility /> : <VisibilityOff />}
//                   </InputAdornment>
//                 ),
//               }}
//               error={error && !password}
//               helperText={error && !password && error}
//             />

//             <Link href="#" underline="none" sx={{ fontWeight: 550 }}>
//               Forgot password?
//             </Link>
//             <Button
//               variant="contained"
//               sx={{ borderRadius: "15px" }}
//               onClick={handleSignIn}
//             >
//               Sign in
//             </Button>
//             <Divider>or</Divider>

//             <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
//               {loginAvatars.map((avatar, i) => (
//                 <Box key={i}>
//                   <Avatar
//                     alt={avatar.alt}
//                     src={avatar.src}
//                     sx={{ width: 24, height: 24, cursor: "pointer" }}
//                   />
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         </Card>

//         <Typography variant="subtitle2" fontWeight={550} sx={{ mt: 1 }}>
//           New User?
//           <Link href="#" underline="none">
//             Join now
//           </Link>
//         </Typography>
//       </Box>
//       <Toaster/>
//     </Box>
//   );
// };

// export default SignIn;