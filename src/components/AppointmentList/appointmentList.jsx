import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import CustomTable from '../Table/customTable'
import { useLocation, useNavigate } from 'react-router'
import PatientDetails from './patientDetails'
import SearchField from '../Table/customSearch'

const columns =[
    {
        id: "sl_no",
        align: "center",
        disablePadding: false,
        label: "SL No",
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
    // const data = location.state?.cleanData 
    // console.log(data)
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
    };
  
    const handleSearch = () => {
      console.log("Searching for:", searchValue);
    };

    const handleRemove=()=>{
        navigate('/signIn')
    }

    const rows =[
        {
            sl_no :1,
            doc_name:'Dr. Manju',
            patientName:'Bhagya',
            age:28,
            gender:"female",
            date:'24-04-2024',
            time:'17:50',
            action:<Button variant='contained' size='small' disableElevation color='error' onClick={handleRemove}>Delete</Button>
        },
        {
            sl_no :2,
            doc_name:'Dr. Madhu',
            patientName:'Ramesh Bhai',
            age:30,
            gender:"male",
            date:'24-04-2024',
            time:'1:50',
            action:<Button variant='contained' size='small' disableElevation color='error' onClick={handleRemove}>Delete</Button>
        },
        {
            sl_no :3,
            doc_name:'Dr. Shashank',
            patientName:'Sanjay',
            age:21,
            gender:"male",
            date:'24-04-2024',
            time:'11:50',
            action:<Button variant='contained' size='small' disableElevation color='error' onClick={handleRemove}>Delete</Button>
        },

    ]

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
            <CustomTable columns={columns} rows={rows} />
        </Box>
    </Box>
  )
}

export default AppointmentsList