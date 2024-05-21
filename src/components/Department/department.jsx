import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../Table/customTable";
import { useDispatch, useSelector } from "react-redux";
import {
  startAddDept,
  startDeleteDept,
  startGetDeptList,
} from "../../actions/Department/department";

const department = [
  {
    id: "dept_name",
    align: "center",
    disablePadding: false,
    label: "Department Name",
  },
  {
    id: "action",
    align: "center",
    disablePadding: false,
    label: "Action",
  },
];

const Department = () => {
  const dispatch = useDispatch();
  const [dept, setDept] = useState("");

  useEffect(() => {
    dispatch(startGetDeptList());
  }, [dispatch]);

  const handleSave = () => {
    const formData = {
      department: dept,
    };
    dispatch(startAddDept(formData)).then((resultAction) => {
      if (resultAction.meta.requestStatus === "fulfilled") {
        dispatch(startGetDeptList());
      }
    });
  };

  const handleDelete = (id) => {
    const formData = {
      id: id,
    };
    dispatch(startDeleteDept(formData)).then((resultAction) => {
      if (resultAction.meta.requestStatus === "fulfilled") {
        dispatch(startGetDeptList());
      }
    });
  };

  const deptList = useSelector((state) => {
    return state.departmentSlice?.deptList;
  });
  const list = deptList?.map((l) => ({
    dept_name: l.department,
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
        <b> Department </b>
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
            height: "200px",
          }}
        >
          <Typography variant="body1" sx={{ color: "#0077b6", p: 1 }}>
            Create new department
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
              label="Department Name"
              placeholder="Enter New Department Name"
              size="small"
              sx={{ width: "50%" }}
              value={dept}
              onChange={(e) => setDept(e.target.value)}
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
            height: "64vh",
            overflow: "auto",
          }}
        >
          <Typography variant="body1" sx={{ color: "#0077b6", p: 1 }}>
            Department Table
          </Typography>
          <Divider />
          <Box sx={{ p: 1 }}>
            <CustomTable columns={department} rows={list} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Department;
