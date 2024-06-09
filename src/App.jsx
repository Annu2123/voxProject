import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Modal,Grid, TextField, Button,Box, Typography } from "@mui/material";
import Navbar from "./components/Appbar/appbar";
import axios from "axios";
import { useDispatch } from "react-redux";
function App() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [open, setOpen] = useState();
  const [number, setNumber] = useState('');
  const [userData,setUserData]=useState([])
  const [userObject,setUserObject]=useState({})
  const[refferd,setReffred]=useState("")
  const[alt_phone_num,setAltNum]=useState("")
  const[patientName,setPatientName]=useState("")
  const handleSave = () => {
   setOpen(false)
  };

  const handleViewDetails = () => {
    navigate("/consultation", { state: { userData } })
    setOpen(false)
  };

  
  const token = localStorage.getItem("token")


  useEffect(() => {
    if (token === null) {
      navigate("/signIn")
    } 
  }, [token, navigate]);

  useEffect(() => {
    const timer = setInterval(async() => {
     const  telephone_ext=localStorage.getItem('telephone_ext')
      const formData={
        telephone_ext
      }
      console.log(telephone_ext)
     try{
      const response=await axios.post('https://api.voxprosolutions.com:8080/api/call_popup_list',formData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("resss",response.data)
      if(response.data.length > 0){
       setNumber(response.data[0].phone_num)
        const NumberForm={
           key:"phone_num",
          value:response.data[0].phone_num
        }
        const userResponse=await axios.post('https://api.voxprosolutions.com:8080/api/patient_find',NumberForm,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log("userResponse",userResponse.data)
        if(userResponse.data .length > 0){         
            const user = userResponse.data[0];
            console.log("userrr",user)
            const extractedObject = {
              aadhar_num: user.aadhar_num,          
              city:  user.city,            
              gender: user.gender,             
                alt_phone_num:user.alt_phone_num ,                 
              name:  user.name,           
              refered_by:  user.refered_by,           
              nationality:  user.nationality,
              phone_num:  user.phone_num,                       
            }
            setUserObject(extractedObject)
        }
        
        setUserData(userResponse.data)
        setOpen(true)

        const id=response.data[0]

        console.log("id",id.id)
        const formData={
          id:id.id
        }
        const updateResponse=await axios.post('https://api.voxprosolutions.com:8080/api/call_popup_update',formData,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log("update",updateResponse.data)
      }
     }catch(err){
      console.log(err)
     }
     
    }, 10000);

    return () => clearInterval(timer);
  }, []);
console.log(userData)
console.log("number",number)
  return (
    <>
   <Modal 
  open={open} 
  onClose={(event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  }}
>
  <Box 
    sx={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      backgroundColor: '#495363', 
      padding: '20px', 
      borderRadius: '10px', 
      maxWidth: '400px', 
      width: '100%' 
    }}
  >
    <Typography variant="h5" align="center" gutterBottom>
      Incoming
    </Typography>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        <TextField
          label="Patient Name"
          value={userObject && userObject.name || ""}
          onChange={(e) => setPatientName(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
          sx={{ backgroundColor: 'white' }} 
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Phone Number"
          value={userObject && userObject.phone_num || number}
          onChange={(e) => setNumber(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
          sx={{ backgroundColor: 'white' }} 
        />
      </Grid>
    </Grid>
    {/* <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        <TextField
          label="Gender"
          value={userObject && userObject.gender || ""}
          onChange={(e) => setNumber(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
          sx={{ backgroundColor: 'white' }} 
        />
      </Grid> */}
      {/* <Grid item xs={6}>
        <TextField
          label="adhaar_No"
          value={userObject && userObject.aadhar_num || ""}
          onChange={(e) => setPatientName(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
          sx={{ backgroundColor: 'white' }}
        />
      </Grid> */}
    {/* </Grid> */}
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        <TextField
          label="AlterNative Number"
          value={userObject && userObject.alt_phone_num  || ""}
          onChange={(e) => setAltNum(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
          sx={{ backgroundColor: 'white' }} 
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Refferd By"
          value={userObject && userObject.refered_by || ""}
          onChange={(e) =>setReffred(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
          sx={{ backgroundColor: 'white' }}
        />
      </Grid>
    </Grid>
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
     {userData.length < 0 ? (<Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '10px' }}>
        Save
      </Button>):
      <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '10px' }}>
        Update
      </Button>}
      <Button variant="contained" color="primary" onClick={handleViewDetails}>
        View Details
      </Button>
    </Box>
  </Box>
</Modal>

      {token && <Navbar />}
      
    </>
  );
}

export default App;
