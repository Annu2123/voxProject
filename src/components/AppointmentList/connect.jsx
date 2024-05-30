import React from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  MenuItem,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Switch from "@mui/material/Switch";
import DialpadIcon from "@mui/icons-material/Dialpad";
import Consultation from "../Consultation/consultation";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SmsIcon from "@mui/icons-material/Sms";
import Whatsapp from "../Whatsapp/whatsapp";
import { useDispatch, useSelector } from "react-redux";
import { searchPatient } from "../../actions/Patient/patient";

const ConnectPatient = () => {
  const dispatch = useDispatch()
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [whatsappOpen, setWhatsappOpen] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [searchType, setSearchType] = React.useState("");
  const [searchData, setSearchData] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };
  const handleWhatsappOpen = () => {
    setWhatsappOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleWhatsappClose = () => {
    setWhatsappOpen(false);
  };

  const handleNumberClick = (number) => {
    setPhoneNumber((prevPhoneNumber) => prevPhoneNumber + number);
  };

  const handleClear = () => {
    setPhoneNumber("");
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleFind =()=>{
    const formData ={
      key:searchType,
      value:searchData
    }
    dispatch(searchPatient(formData))
  }

  return (
    <Box sx={{width:"100%"}}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 2,
          justifyContent: "center",
          mb: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* <Card
          sx={{ borderTop: "1px solid blue", width: {sm:'100%',md:"20%"}, minHeight: "100px" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "30px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                display: "flex",
                backgroundColor: checked ? "#00b4d8" : "red",
                fontWeight: "bold",
                width: "60px",
                borderRadius: "8px",
                justifyContent: "center",
                mt: 1,
                color: "white",
              }}
            >
              {checked ? "Online" : "Offline"}
            </Typography>
          </Box>
          <Divider sx={{ mt: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Typography variant="subtitle2" fontWeight={"bold"}>
              Offline
            </Typography>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography variant="subtitle2" fontWeight={"bold"}>
              Online
            </Typography>
          </Box>
        </Card> */}

        <Card
          sx={{
            borderTop: "1px solid #90e0ef",
            width: { xs: "100%", md: "40%" },
            minHeight: "100px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "30px",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                display: "flex",
                fontWeight: "bold",
                width: "60px",
                borderRadius: "8px",
                justifyContent: "center",
                mt: 1,
              }}
            >
              Search
            </Typography>
          </Box>
          <Divider sx={{ mt: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 1,
              p: 1,
              gap: 2,
              // flexDirection: { xs: "column", sm: "row" },
              flexDirection: { md: "column", lg: "row" },
            }}
          >
            <TextField
              select
              size="small"
              sx={{ width: { xs: "100%", lg: "50%" } }}
              defaultValue={"none"}
              value={searchType}
              onChange={(e)=>setSearchType(e.target.value)}
            >
              <MenuItem value="none">none</MenuItem>
              {/* <MenuItem value="patientID">Patient ID</MenuItem> */}
              <MenuItem value="phone_num">Phone Number</MenuItem>
            </TextField>

            <TextField
              placeholder="Provide related data"
              size="small"
              value={searchData}
              onChange={(e)=>setSearchData(e.target.value)}
              fullWidth
            />

            <Button size="small" disableElevation variant="contained" color="success" onClick={handleFind}>
              Find
            </Button>
          </Box>
        </Card>

        <Card
          sx={{
            borderTop: "1px solid #90e0ef",
            width: { sm: "100%", md: "35%" },
            minHeight: "100px",
            overflowX: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "30px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                display: "flex",
                fontWeight: "bold",
                minWidth: "60px",
                borderRadius: "8px",
                justifyContent: "center",
                mt: 1,
              }}
            >
              Omni Channel
            </Typography>
          </Box>
          <Divider sx={{ mt: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 1,
              p: 1,
              gap: 2,
              flexDirection: { md: "column", lg: "row" },
            }}
          >
            <Button
              size=""
              variant="contained"
              color="warning"
              disableElevation
              onClick={handleOpen}
            >
              <DialpadIcon fontSize="small" />
            </Button>
            <Button
              size=""
              variant="contained"
              sx={{ backgroundColor: "#39ff5a" }}
              disableElevation
              onClick={handleWhatsappOpen}
              disabled
            >
              <WhatsAppIcon fontSize="small" />
            </Button>
            <Button
              size=""
              variant="contained"
              sx={{ backgroundColor: "#ff5d5d" }}
              disableElevation
              onClick={handleOpen}
              disabled
            >
              <MailOutlineIcon fontSize="small" />
            </Button>
            <Button
              size=""
              variant="contained"
              sx={{ backgroundColor: "#aeb9cc" }}
              disableElevation
              onClick={handleOpen}
              disabled
            >
              <SmsIcon fontSize="small" />
            </Button>
          </Box>
        </Card>

        <Dialog open={open} onClose={handleClose}>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
            <DialogTitle>Enter Phone Number</DialogTitle>
            <Tooltip title="Close" placement="left">
              <Button
                onClick={handleClose}
                size="small"
                sx={{ color: "black" }}
              >
                <CloseIcon fontSize="small" />
              </Button>
            </Tooltip>
          </Box>

          <Divider />
          <DialogContent>
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Phone Number"
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <Button
                  color="success"
                  size="small"
                  disableElevation
                  variant="contained"
                >
                  Dial
                </Button>
              </Box>

              <Grid item xs={12}>
                <Grid container spacing={1} justifyContent="center">
                  {[...Array(9).keys()]
                    .reduce(
                      (rows, key, index) =>
                        (index % 3 === 0
                          ? rows.push([key])
                          : rows[rows.length - 1].push(key)) && rows,
                      []
                    )
                    .map((row, rowIndex) => (
                      <Grid
                        item
                        container
                        key={rowIndex}
                        justifyContent="center"
                        spacing={1}
                      >
                        {row.map((i) => (
                          <Grid item key={i}>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleNumberClick(i + 1)}
                            >
                              {i + 1}
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    ))}

                  <Grid item>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleNumberClick(0)}
                    >
                      0
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    gap={2}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleClear}
                      color="warning"
                    >
                      Clear
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

        <Dialog
          open={whatsappOpen}
          // onClose={handleWhatsappClose}
          PaperProps={{
            sx: {
              width: '800px',
              height: '700px'
            }
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
            <DialogTitle>Whatsapp</DialogTitle>
            <Tooltip title="Close" placement="left">
              <Button
                onClick={handleWhatsappClose}
                size="small"
                sx={{ color: "black" }}
              >
                <CloseIcon fontSize="small" />
              </Button>
            </Tooltip>
          </Box>
          <Divider />
          <DialogContent>
            <Whatsapp />
          </DialogContent>
        </Dialog>
      </Box>

      {/* <PatientDetails /> */}
      <Box sx={{ mt: 1 }}>
        <Consultation  searchData={searchData}/>
      </Box>
    </Box>
  );
};

export default ConnectPatient;
