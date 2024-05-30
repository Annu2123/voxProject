import { Box, Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { startGetActivityList } from "../../actions/ManageLeads/manageLeads";

const ActivityCards = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { state } = location;
  useEffect(() => {
    const formData = {
      phone_num: state.phone_num,
    };
    dispatch(startGetActivityList(formData));
  }, [state.phone_num]);
  const data = useSelector((state) => state.manageLeadsSlice?.callActivityList);
  console.log(data);
  return (
    <Box sx={{height:"65vh"}}>
      {data?.map((data, i) => {
        return (
          <>
            <Card sx={{ width: "100%", borderTop: "1px solid blue", p: 2,mt:1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Typography variant="subtitle2" fontWeight={"bold"}>
                  Date:{data.created_at}
                </Typography>
                <Typography variant="subtitle2" fontWeight={"bold"}>
                  Agent:{data.agent_num}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="subtitle2">Rec :</Typography>
                <Typography variant="subtitle2">Status:{'  '}{data.call_status}</Typography>
                <Typography variant="subtitle2">Duration:{'  '}{data.duration}</Typography>
                <Typography variant="subtitle2">Method:{'  '}{data.call_method}</Typography>
                <Typography variant="subtitle2">Customer Number:{'  '}{data.customer_num}</Typography>
                
              </Box>
            </Card>
          </>
        );
      })}
      {
        data?.length===0 && (
          <Box sx={{display:"flex",justifyContent:"center"}}>
            <Typography variant="subtitle1" >No Data Found</Typography>
            </Box>
          
        )
      }
    </Box>
  );
};

export default ActivityCards;
