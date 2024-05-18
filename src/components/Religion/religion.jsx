import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../Table/customTable";
import { useDispatch, useSelector } from "react-redux";
import {
  startAddRelgn,
  startDeleteRelgn,
  startGetRelgnList,
} from "../../actions/Religion/religion";

const relgnCol = [
  {
    id: "relgn_name",
    align: "center",
    disablePadding: false,
    label: "Religion Name",
  },
  {
    id: "action",
    align: "center",
    disablePadding: false,
    label: "Action",
  },
];

const Religion = () => {
  const dispatch = useDispatch();
  const [relgn, setRelgn] = useState("");

  useEffect(() => {
    dispatch(startGetRelgnList());
  }, [dispatch]);

  const handleSave = () => {
    const formData = {
      religion: relgn,
    };
    dispatch(startAddRelgn(formData)).then((resultAction) => {
      if (resultAction.meta.requestStatus === "fulfilled") {
        dispatch(startGetRelgnList());
      }
    });
  };

  const handleDelete = (id) => {
    const formData = {
      id: id,
    };
    dispatch(startDeleteRelgn(formData)).then((resultAction) => {
      if (resultAction.meta.requestStatus === "fulfilled") {
        dispatch(startGetRelgnList());
      }
    });
  };

  const relgnList = useSelector((state) => {
    return state.religionSlice?.relgnList;
  });
  //   console.log(relgnList);
  const list = relgnList?.map((l) => ({
    relgn_name: l.religion,
    action: (
      <Button
        variant="contained"
        size="small"
        disableElevation
        color="error"
        onClick={() => handleDelete(l.id)}
      >
        Remove
      </Button>
    ),
  }));

  return (
    <Box>
      <Typography variant="h6" sx={{ color: "#0077b6" }}>
        <b> Religion </b>
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
            Add Religion
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
              label="Religion Name"
              placeholder="Add New Religion Name"
              size="small"
              sx={{ width: "50%" }}
              value={relgn}
              onChange={(e) => setRelgn(e.target.value)}
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
            Religion Table
          </Typography>
          <Divider />
          <Box sx={{ p: 1 }}>
            <CustomTable columns={relgnCol} rows={list} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Religion;
