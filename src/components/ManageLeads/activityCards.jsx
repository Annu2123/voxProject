import { Box, Card, Typography } from '@mui/material'
import React from 'react'

const ActivityCards = () => {
  return (
    <Card sx={{width:"100%",borderTop:"1px solid blue",p:2}}>
        <Box sx={{display:"flex",justifyContent:'space-evenly'}}>
            <Typography variant='subtitle2' fontWeight={'bold'}>Date:</Typography>
            <Typography variant='subtitle2' fontWeight={'bold'}>Agent:</Typography>
        </Box>
        <Box sx={{display:"flex",flexDirection:"column",gap:1}}> 
            <Typography variant='subtitle2'>Rec   :</Typography>
            <Typography variant='subtitle2'>Status:</Typography>
            <Typography variant='subtitle2'>Reason:</Typography>
            <Typography variant='subtitle2'>Remark:</Typography>
        </Box>
    </Card>
  )
}

export default ActivityCards