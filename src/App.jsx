import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Modal,Grid, TextField, Button,Box, Typography ,IconButton } from "@mui/material";
import Navbar from "./components/Appbar/appbar";
import CloseIcon from '@mui/icons-material/Close'
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  searchPatient,
  startAddPatient,
  startUpdatePatient,
} from "./actions/Patient/patient";
function App() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[patientRefered,setPatientRefered]=useState("")
  const[patientAltNum,setPatientAltNum]=useState("")
  const[addPatientName,setAddPatientName]=useState("")
  const[patientnumber,setPatientnumber]=useState('')
  const [incomingOpen, setIncomingOPen] = useState();
  const[patientModal,setPatientModal]=useState()
  const [number, setNumber] = useState('');
  const [userData,setUserData]=useState([])
  const [userObject,setUserObject]=useState({})
  const[refferd,setReffred]=useState("")
  const[alt_phone_num,setAltNum]=useState("")
  const[patientName,setPatientName]=useState("")
  const handleSave = () => {
    const formData={
      phone_num:number,
      alt_phone_num: alt_phone_num ? alt_phone_num : "",
    name: patientName ?  patientName  :"",
    dob: "",
    gender: "",
    father_husband_name: "",
    marital_status: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    religion: "",
    refered_by:refferd ? refferd : "",
    aadhar_num: "",
    nationality: "",
    remarks: ""
    }
    dispatch(startAddPatient(formData))
    const searchForm={
       key:"phone_num",
    value:formData.number 
    }
    dispatch( searchPatient( searchForm))
    setIncomingOPen(false)
    const userData=[
      {name: patientName ,
        // id:''
       phone_num: number,
      alt_phone_num:alt_phone_num,
      refered_by: refferd  
      }
    ]
    navigate("/consultation",{ state: { userData } })
  };
  const handleUpdate=()=>{
    // console.log("userData",userData)
     const formData={
      id: userData[0].id ,
      name:userData ? userData[0].name :  "",
      dob:userData ? userData[0].dob :  "",
      gender:userData ? userData[0].gender :  "",
      father_husband_name: userData ? userData[0].father_husband_name :  "",
      marital_status:userData ? userData[0].marital_status :  "",
      address:userData ? userData[0].address :  "",
      city: userData ? userData[0].city :  "",
      pincode: userData ? userData[0].city :  "",
      religion: userData ? userData[0].religion :  "",
      refered_by:userData ? userData[0].refered_by :  "",
      aadhar_num:userData ? userData[0].aadhar_num :  "",
    nationality:userData ? userData[0].nationality :  ""
     }
    dispatch(startUpdatePatient(formData))
    navigate("/consultation",{ state: { userData } })
    setIncomingOPen(false)
  }
const handlePopUp=()=>{
  setPatientModal(true)
}
const handlePatientSearch=async()=>{
  console.log("numberSear",patientAltNum)
  const formData ={
    key:"phone_num",
    value:patientnumber
  }
 try{
  console.log("apiruuu")
  const response=await axios.post("https://api.voxprosolutions.com:8080/api/patient_find",formData,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  // console.log("patientSearch",response.data)
  if(response.data.length > 0){
    const userData=response.data
    navigate("/consultation", { state: { userData } })
    setPatientnumber('')
    setAddPatientName("")
    setPatientRefered("")
    setPatientAltNum("")
    const searchData={
      key:"phone_num",
      value:userData[0].phone_num
   }
   dispatch(searchPatient(searchData))
      setPatientModal(false)
  }else{
    const userData=[
    {name: addPatientName ? addPatientName :"" ,
      // id:''
     phone_num: patientnumber ,
    alt_phone_num:patientAltNum,
    refered_by: patientRefered  
    }
  ]
    navigate("/consultation", { state: { userData } })
    const searchData={
      key:"phone_num",
      value:patientnumber
   }
   dispatch(searchPatient(searchData))
  toast.error("patient is not registered Please Add")
  setPatientnumber('')
  setAddPatientName("")
  setPatientRefered("")
  setPatientAltNum("")
  setPatientModal(false)
  
  }
  
 }catch(err){
  console.log(err)
 }
  
}

  const handleViewDetails = async() => {
    const searchData={
      key:"phone_num",
      value:number
   }
   dispatch(searchPatient(searchData))
    if(userData.length > 0){
      navigate("/consultation", { state: { userData } })
      setIncomingOPen(false)
      setUserData([])
      setNumber("")
      setUserObject({})
    }else{
      console.log("elsedd")
      const formData ={
        key:"phone_num",
        value:patientnumber ? patientnumber :number
      }
     try{
      const response=await axios.post("https://api.voxprosolutions.com:8080/api/patient_find",formData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("numberSearch",response.data)
      if(response.data.length > 0){
        const userData=response.data
        navigate("/consultation", { state: { userData } })
       setIncomingOPen(false)
       setUserData([])
       setNumber("")
       setUserObject({})
        
      }else{
        const userData=[
        {name: patientName ,
          // id:''
         phone_num: number,
        alt_phone_num:alt_phone_num,
        refered_by: refferd  
        }
      ]
      navigate("/consultation", { state: { userData } })
      toast.error("patient is not registered Please Add");
        setIncomingOPen(false)
        setNumber("")
        setUserData([])
     
      }
     }catch(err){
      console.log(err)
     }
      
    }
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
      console.log("tele formData",formData)
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
        if(userResponse.data.length > 0){         
            const user = userResponse.data[0];
            console.log("userrr",user)
            const extractedObject = {
              id:user.id,
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
        setIncomingOPen(true)

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
      open={incomingOpen}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          setIncomingOPen(false);
        }
      }}
    >

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#dadff0',
          backdropFilter: 'blur(10px)',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        {/* <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        > */}
          {/* <CloseIcon />
        </IconButton> */}
        <Typography variant="h5" align="center" gutterBottom>
         Patient Details
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="Patient Name"
              value={userObject && userObject.name || patientName}
              onChange={(e) => setPatientName(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
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
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            />
          </Grid>
        </Grid>
        {/* Uncomment and update the following section if needed */}
        {/* <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="Gender"
              value={userObject && userObject.gender || ""}
              onChange={(e) => setNumber(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="adhaar_No"
              value={userObject && userObject.aadhar_num || ""}
              onChange={(e) => setPatientName(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            />
          </Grid>
        </Grid> */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="Alternative Number"
              value={userObject && userObject.alt_phone_num || alt_phone_num}
              onChange={(e) => setAltNum(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Referred By"
              value={userObject && userObject.refered_by || refferd}
              onChange={(e) => setReffred(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          
        {userData.length === 0 ? (
        <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '10px' }}>
          Save
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginRight: '10px' }}>
          Update
        </Button>
      )}
         
          <Button variant="contained" color="primary" onClick={handleViewDetails}>
            View Details
          </Button>
        </Box>
      </Box>
    </Modal>
    <Modal
      open={patientModal}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          setPatientModal(false);
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#dadff0',
          backdropFilter: 'blur(10px)',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <IconButton
          onClick={() => setPatientModal(false)}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" align="center" gutterBottom>
         Patient Details
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="Patient Name"
              value={addPatientName}
              onChange={(e) => setAddPatientName(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone Number"
              value={patientnumber}
              onChange={(e) =>setPatientnumber(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="Alternative Number"
              value={patientAltNum}
              onChange={(e) => setPatientAltNum(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Referred By"
              value={patientRefered}
              onChange={(e) => setPatientRefered(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {/* {userData.length < 0 ? (
            <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '10px' }}>
              Save
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '10px' }}>
              {/* Update */}
            {/* </Button>
          )}  */}
          <Button variant="contained" color="primary" onClick={handlePatientSearch} disabled={!patientnumber}>
            Appointment
          </Button>
        </Box>
      </Box>
    </Modal>  

      {token && <Navbar handlePopUp={handlePopUp}/>}
      
    </>
  );
}

export default App;
