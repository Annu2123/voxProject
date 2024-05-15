import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomTable from '../Table/customTable'
import { useLocation, useNavigate } from 'react-router'
import PatientDetails from './patientDetails'
import SearchField from '../Table/customSearch'
import { useDispatch, useSelector } from 'react-redux'
import { appointmentDelete, appointmentDetails } from '../../actions/Appointment/appointment'

const columns =[
    {
        id: "doc_id",
        align: "center",
        disablePadding: false,
        label: "DOC ID",
    },
    {
        id: "doc_name",
        align: "center",
        disablePadding: false,
        label: "DOCTOR NAME",
    },
    {
        id: "patientName",
        align: "center",
        disablePadding: false,
        label: "PATIENT NAME",
    },
    {
        id: "age",
        align: "center",
        disablePadding: false,
        label: "AGE",
    },
    {
        id: "gender",
        align: "center",
        disablePadding: false,
        label: "GENDER",
    },
    {
        id: "date",
        align: "center",
        disablePadding: false,
        label: "DATE",
    },
    {
        id: "time",
        align: "center",
        disablePadding: false,
        label: "TIME",
    },
    {
        id:"action",
        align: "center",
        disablePadding: false,
        label: "ACTION",
    }
]
// const rows =[]
const AppointmentsList = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const data = location.state?.cleanData 
    // console.log(data)
    const { state } = location;
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
    };
  
    const handleSearch = () => {
      console.log("Searching for:", searchValue);
    };

    const handleRemove=(id)=>{
       const formData = {
        id:id
       }
        dispatch(appointmentDelete(formData)).then((resultAction) => {
            if (resultAction.meta.requestStatus === "fulfilled") {
              dispatch(appointmentDetails(state));
            }
          });
    }

    useEffect(()=>{
        dispatch(appointmentDetails(state))
    },[state])

    const data = useSelector((state)=>{
        return state.appointmentSlice?.details
    })

    console.log(data)

    const detials = data?.map((data)=>({
        age:data.age,
        date:data.date,
        doc_id:data.doctor_id,
        gender:data.gender,
        patientName:data.patient_name,
        time:data.time,
        action:<Button variant='contained' size='small' disableElevation color='error' onClick={()=>handleRemove(data.id)}>Delete</Button>
    }))

  return (
    <Box sx={{width:"100%",border:'1px soild red',backgroundColor:"white",minHeight:"80vh",borderRadius:"9px"}}>
        {/* <Button variant='contained' size='small' disableElevation >Back</Button> */}
        <Box sx={{display:"flex",justifyContent:'space-between',p:2,borderRadius:"7px",backgroundColor:'#90e0ef'}}>
        <Typography variant='h6' sx={{color:"#0077b6"}}><b> Appointment List </b></Typography>
            <SearchField 
                sx={{color:"white"}}
                value={searchValue}
                onChange={handleSearchChange}
                onSearch={handleSearch}
            />
        </Box>

        <Box sx={{mt:2,p:2}}>
            <CustomTable columns={columns} rows={detials} />
        </Box>
    </Box>
  )
}

export default AppointmentsList