import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import CustomTable from "../Table/customTable";
import ActivityCards from "./activityCards";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const columns = [
  {
    id: "doc_name",
    align: "center",
    disablePadding: false,
    label: "Doctor Name",
  },
  {
    id: "patientName",
    align: "center",
    disablePadding: false,
    label: "Patient Name",
  },
  {
    id: "allocated",
    align: "center",
    disablePadding: false,
    label: "Allocated Time",
  },
  {
    id: "visit",
    align: "center",
    disablePadding: false,
    label: "Visit count",
  },
];

const rows = [
  {
    doc_name: "Dr.xyz",
    patientName: "abc",
    visit: "3 times",
    allocated: "11:30 am",
  },
];
const Activity = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ width: "100%", backgroundColor: "white" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#90e0ef",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Activity" {...a11yProps(0)} sx={{ fontWeight: "bold" }} />
          <Tab label="Visit" {...a11yProps(1)} sx={{ fontWeight: "bold" }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{display:"flex",flexDirection:"column",gap:2,overflow:"auto"}}>
          <ActivityCards />
          <ActivityCards />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CustomTable columns={columns} rows={rows} />
      </CustomTabPanel>
    </Card>
  );
};

export default Activity;
