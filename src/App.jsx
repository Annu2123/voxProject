// import './App.css'
import { Box, Typography } from "@mui/material";
import Navbar from "./components/Appbar/appbar";
import { useEffect } from "react";
import { useNavigate } from "react-router";
function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // console.log(token)

  useEffect(() => {
    if (token === null) {
      navigate("/signIn");
    } 
  }, [token,navigate]);

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>{token && <Navbar />}  
    </Box>
  );
}

export default App;
