// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// // import TabContext from '@mui/lab/TabContext';
// // import TabList from '@mui/lab/TabList';
// // import TabPanel from '@mui/lab/TabPanel';
// import Department from '../Department/department';

// export default function VarAppbar() {
//   const [value, setValue] = React.useState('department');

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%', typography: 'body1' }}>
//       <TabContext value={value}> 
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <TabList onChange={handleChange} aria-label="lab API tabs example">
//             <Tab label="Item One" value="department" />
//             <Tab label="Item Two" value="2" />
//             <Tab label="Item Three" value="3" />
//           </TabList>
//         </Box>
//         <TabPanel value="department"><Department/></TabPanel>
//         <TabPanel value="2">Item Two</TabPanel>
//         <TabPanel value="3">Item Three</TabPanel>
//       </TabContext>
//     </Box>
//   );
// }


import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import Department from "../Department/department";
import Religion from "../Religion/religion";
import ReferBy from "../ReferedBy/referedBy";

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

const VarAppbar = () => {
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
          <Tab label="Department" {...a11yProps(0)} sx={{ fontWeight: "bold" }} />
          <Tab label="Religion" {...a11yProps(1)} sx={{ fontWeight: "bold" }} />
          <Tab label="Refered By" {...a11yProps(2)} sx={{ fontWeight: "bold" }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Department/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Religion/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ReferBy/>
      </CustomTabPanel>
    </Card>
  );
};

export default VarAppbar;
