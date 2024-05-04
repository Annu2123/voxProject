import { Box } from '@mui/material'
import React from 'react'
import Pdetails from './pDetails'
import Activity from './activity'

const EditManageLeads = () => {
  return (
    <Box sx={{width:"100%",display:'flex',justifyContent:"space-between",gap:3,flexDirection:{xs:'column',md:"row"}}}>
        <Box sx={{width:{md:"50%",xs:'100%'}}}>
            <Pdetails/>
        </Box>
        <Box sx={{width:{md:"50%",xs:'100%'}}}>
            <Activity/>
        </Box>
    </Box>
  )
}

export default EditManageLeads