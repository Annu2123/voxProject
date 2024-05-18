import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../Table/customTable";
import { useDispatch, useSelector } from "react-redux";
import {
  startAddRefer,
  startDeleteRefer,
  startGetReferList,
} from "../../actions/ReferBy/referBy";

const referCol = [
  {
    id: "refer",
    align: "center",
    disablePadding: false,
    label: "Refered By",
  },
  {
    id: "action",
    align: "center",
    disablePadding: false,
    label: "Action",
  },
];

const ReferBy = () => {
  const dispatch = useDispatch();
  const [refer, setRefer] = useState("");

  useEffect(() => {
    dispatch(startGetReferList());
  }, [dispatch]);

  const handleSave = () => {
    const formData = {
      refered_by: refer,
    };
    dispatch(startAddRefer(formData)).then((resultAction) => {
      if (resultAction.meta.requestStatus === "fulfilled") {
        dispatch(startGetReferList());
      }
    });
  };

  const handleDelete = (id) => {
    const formData = {
      id: id,
    };
    dispatch(startDeleteRefer(formData)).then((resultAction) => {
      if (resultAction.meta.requestStatus === "fulfilled") {
        dispatch(startGetReferList());
      }
    });
  };

  const referList = useSelector((state) => {
    return state.referBySlice?.referList;
  });
  //   console.log(referList);
  const list = referList?.map((l) => ({
    refer: l.refered_by,
    action: (
      <Button
        variant="contained"
        size="small"
        disableElevation
        color="error"
        onClick={() => handleDelete(l.id)}
      >
        Delete
      </Button>
    ),
  }));

  return (
    <Box>
      <Typography variant="h6" sx={{ color: "#0077b6" }}>
        <b> Refered By </b>
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          mt: 1,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            // minHeight: "100px",
            width: { xs: "100%", md: "50%" },
            border: "1px solid lightgray",
            borderRadius: "8px",
            backgroundColor: "#FAFAFA",
          }}
        >
          <Typography variant="body1" sx={{ color: "#0077b6", p: 1 }}>
            Add User/Refer
          </Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <TextField
              label="Refered By"
              placeholder="Refered By"
              size="small"
              sx={{ width: "50%" }}
              value={refer}
              onChange={(e) => setRefer(e.target.value)}
            />
            <Button
              disableElevation
              size="small"
              variant="contained"
              sx={{ m: 2 }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            // minHeight: "100px",
            border: "1px solid lightgray",
            borderRadius: "8px",
            backgroundColor: "#FAFAFA",
            width: { xs: "100%", md: "50%" },
          }}
        >
          <Typography variant="body1" sx={{ color: "#0077b6", p: 1 }}>
            ReferedBy Table
          </Typography>
          <Divider />
          <Box sx={{ p: 1 }}>
            <CustomTable columns={referCol} rows={list} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReferBy;
