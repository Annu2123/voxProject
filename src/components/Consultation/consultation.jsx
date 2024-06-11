import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from 'dayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Importing the named export AdapterDayjs
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailIcon from "@mui/icons-material/Mail";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  searchPatient,
  startAddPatient,
  startUpdatePatient,
} from "../../actions/Patient/patient";
import { startGetRelgnList } from "../../actions/Religion/religion";
import { startGetReferList } from "../../actions/ReferBy/referBy";
import { startGetDeptList } from "../../actions/Department/department";
import { getTimeSlot, startGetDoctorList } from "../../actions/Doctor/doctor";
import toast from "react-hot-toast";
import {
  addAppoinment,
  appointmentDetails,
  startGetAppoinmentSlot,
} from "../../actions/Appointment/appointment";
import axios from "axios";

const religion = () => {
  const dispatch = useDispatch();

  // //console.log("pationt",patientData)
  useEffect(() => {
    dispatch(startGetRelgnList());
  }, []);
  const relgnList = useSelector((state) => {
    return state?.religionSlice?.relgnList;
  });
  let r = relgnList?.map((r) => r.religion);
  return r?.length > 0 ? r : ["none"];
};
// const patientData = location?.state?.userData || []
const referBy = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetReferList());
  }, []);
  const referByList = useSelector((state) => {
    return state?.referBySlice?.referList;
  });
  let r = referByList?.map((r) => r.refered_by);
  return r?.length >= 1 ? r : ["none"];
};

const docList = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(startGetDoctorList());
  // }, []);
  const docList = useSelector((state) => {
    return state?.doctorSlice?.list;
  });
  let r = docList?.map((r) => r);
  ////console.log(r);
  return r;
};

const Consultation = ({ searchData, phoneNumber }) => {
  const location = useLocation();
  const { state } = location
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [appFormData, setAppFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => {
    return state.patientSlice?.findData;
  });
  let actualData = data && data[0];
  //  const patientId=
  // const [departmentSelected, setDepartmentSelected] = useState(false);
  console.log("sttrr", state)
  console.log("formData1", formData)
  // console.log(state.userData[0].id)
  // console.log("ser",searchData)
  useEffect(() => {
    if (state) {
      console.log("sttr")
      setFormData(state);
    }
    if (actualData) {
      setFormData(actualData);
    } else if (state?.userData?.length > 0) {
      setFormData(state.userData[0]);
    } else if (actualData === undefined) {
      toast.error("Not found!");
      console.log("serachNumbe", searchData)
      setFormData({ phone_num: searchData ? searchData : phoneNumber });
    }
  }, [actualData, state?.userData, state, location], searchData)

  useEffect(() => {
    console.log("usefeect", state)
    if (state?.userData[0].id && state?.userData.length > 0) {
      setFormData(state?.userData[0] ? state?.userData[0] : state);
    }
  }, [location]);
  useEffect(() => {
    if (!state) {
      setFormData({})
    }
  }, [location])
  useEffect(() => {
    if (state?.userData) {
      setFormData({})
    }
  }, [state])
  useEffect(() => {
    if (state) {
      const searchForm = {
        key: "phone_num",
        value: state?.userData && state.userData[0].phone_num
      }
      dispatch(searchPatient(searchForm))
    }
  }, [state, location])
  const [departments, setDepartments] = useState([]);
  const [doctorNames, setDoctorNames] = useState([]);
  const [departmentSelected, setDepartmentSelected] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const [availableDays, setAvailableDays] = useState([]);
  const [consultationInterval, setConsultationInterval] = useState(5);
  const [selectedDoctor, setSelectedDoctor] = useState({})
  const [bookedSlot, setBookedSlot] = useState([])
  useEffect(() => {
    dispatch(startGetDoctorList());
  }, []);

  const docList = useSelector((state) => {
    return state?.doctorSlice?.list;
  });
  //console.log("doctor list",docList)
  //console.log("selectedoID",selectedDoctorId)
  useEffect(() => {
    if (selectedDoctorId) {
      const result = docList?.find((ele) => {
        return ele.id == selectedDoctorId
      })
      setSelectedDoctor(result)
    }
  }, [selectedDoctorId])

  //console.log("selectedDocter",selectedDoctor)
  const [times, setTimes] = useState([]);
  const appData = useSelector((state) => state?.appointmentSlice?.slots);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedDoctorId && selectedDate) {
        const fd = {
          doctor_id: selectedDoctorId,
          date: selectedDate,
        };
        // //console.log('Fetching data with:', fd);
        await dispatch(startGetAppoinmentSlot(fd));
      }
    };
    fetchData();
  }, [selectedDoctorId, selectedDate, dispatch]);
  const [receivedData, setReceivedData] = useState("");
  useEffect(() => {
    if (appData) {
      // //console.log(appData)
      setReceivedData(appData);
    }
  }, [appData]);

  useEffect(() => {
    //console.log('Times array updated:', times);
  }, [times]);

  // finding doctors department
  useEffect(() => {
    if (docList) {
      const uniqueDepartments = [
        ...new Set(docList.map((doctor) => doctor.department)),
      ];
      setDepartments(uniqueDepartments);
    }
  }, [docList]);


  // department doctor list according to department
  useEffect(() => {
    if (departmentSelected && docList) {
      const filteredDoctorNames = docList
        .filter((doctor) => doctor.department === departmentSelected)
        .map((doctor) => ({ name: doctor.name, id: doctor.id }))
      setDoctorNames(filteredDoctorNames);
    } else {
      setDoctorNames([]);
    }
  }, [departmentSelected, docList]);


  // finding doctor interval
  useEffect(() => {
    if (selectedDoctorName && docList) {
      const doctor = docList.find((doc) => doc.id === selectedDoctorId);
      if (doctor) {
        setConsultationInterval(doctor.consultation_interval);
      }
    } else {
      setConsultationInterval(null);
    }
  }, [selectedDoctorName, docList, consultationInterval]);

  const p_form = [
    {
      label: "Phone Number*",
      placeholder: "Phone Number",
      value: actualData ? actualData.phone_num : "",
      type: "number",
      formDataKey: "phone_num",
      readOnly: !!actualData,
    },
    {
      label: "Alternate Phone Number*",
      placeholder: "Alternate Phone Number",
      value: actualData ? actualData.alt_phone_num : "",
      type: "number",
      formDataKey: "alt_phone_num",
    },
    {
      label: "Patient Name*",
      placeholder: "Patient Name",
      value: actualData ? actualData.name : "",
      type: "text",
      formDataKey: "name",
    },
    {
      label: "Patient Email*",
      placeholder: "Patient Email",
      value: actualData ? actualData.email : "",
      type: "email",
      formDataKey: "email",
    },
    {
      label: "Date of Birth*",
      placeholder: "Date of Birth",
      value: actualData ? actualData.dob : "",
      type: "date",
      formDataKey: "dob",
    },
    {
      label: "Gender*",
      placeholder: "Gender",
      value: actualData ? actualData.gender : "",
      type: "select",
      formDataKey: "gender",
      menuItems: ["Male", "Female"],
    },
    {
      label: "Father/Husband name*",
      placeholder: "Father/Husband name",
      value: actualData ? actualData.father_husband_name : "",
      type: "text",
      formDataKey: "father_husband_name",
    },
    {
      label: "Martial Status*",
      placeholder: "Martial Status",
      value: actualData ? actualData.marital_status : "",
      type: "select",
      formDataKey: "marital_status",
      menuItems: ["Married", "Unmarried"],
    },
    {
      label: "Aadhar Number*",
      placeholder: "Aadhar Number",
      value: actualData ? actualData.aadhar_num : "",
      type: "number",
      formDataKey: "aadhar_num",
    },
    {
      label: "Nationality*",
      placeholder: "Nationality",
      value: actualData ? actualData.nationality : "",
      type: "text",
      formDataKey: "nationality",
    },
    {
      label: "Religion*",
      placeholder: "Religion",
      value: actualData ? actualData.religion : "",
      type: "select",
      formDataKey: "religion",
      menuItems: religion(),
    },
    {
      label: "Pin Code*",
      placeholder: "Pin Code",
      value: actualData ? actualData.pincode : "",
      type: "number",
      formDataKey: "pincode",
    },
    {
      label: "City*",
      placeholder: "City",
      value: actualData ? actualData.city : "",
      type: "text",
      formDataKey: "city",
    },
    {
      label: "Refered by*",
      placeholder: "Refered by",
      value: actualData ? actualData.refered_by : "",
      type: "select",
      formDataKey: "refered_by",
      menuItems: referBy(),
    },
    {
      label: "Patient Address*",
      placeholder: "Patient Address",
      value: actualData ? actualData.address : "",
      type: "multiline",
      formDataKey: "address",
    },
  ];

  const appointment = [
    {
      label: "Department",
      placeholder: "Department",
      value: "",
      type: "select",
      menuItems: departments,
      // variant: "standard",
    },
    {
      label: "Doctor_Name",
      placeholder: "Doctor Name",
      value: "",
      type: "select",
      menuItems: doctorNames.map((doctor) => doctor.name),
      // variant: "standard",
    },
    {
      label: "Date",
      placeholder: "date",
      value: "",
      type: "date",
      // variant: "standard",
    },
    {
      label: "Remarks",
      placeholder: "Remmarks",
      value: "",
      type: "text",
    },
  ];

  const handleOpen = (data) => {
    setOpen(true);
  };
  ////console.log(appFormData, "hi");

  const handleClose = () => {
    setOpen(false);
    setAppFormData({})
    setTimes([])
    setError('')
    // window.location.reload();
  };

  const [selectedTime, setSelectedTime] = useState("");

  // let times = generateTimes();

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (actualData) {
      console.log("actualData", actualData)
      console.log("formData_update", formData)
      const dataToSubmit = { ...formData };
      delete dataToSubmit.phone_num;
      delete dataToSubmit.alt_phone_num;
      delete dataToSubmit.email;
      dispatch(startUpdatePatient(dataToSubmit));

    } else if (Object.values(formData).length > 0) {

      console.log("formData_insert", formData)
      // console.log("formm")
      const formData1 = {
        phone_num: formData.phone_num ? formData.phone_num : "",
        alt_phone_num: formData.alt_phone_num ? formData.alt_phone_num : "",
        name: formData.name ? formData.name : "",
        dob: formData.dob ? formData.dob : "",
        gender: formData.gender ? formData.gender : "",
        father_husband_name: formData.father_husband_name ? formData.father_husband_name : "",
        marital_status: formData.marital_status ? formData.marital_status : "",
        email: formData.email ? formData.email : "",
        address: formData.address ? formData.address : "",
        city: formData.city ? formData.city : "",
        pincode: formData.pincode ? formData.pincode : "",
        religion: formData.religion ? formData.religion : "",
        refered_by: formData.refered_by ? formData.refered_by : "",
        aadhar_num: formData.aadhar_num ? formData.aadhar_num : "",
        nationality: formData.nationality ? formData.nationality : ""

      }

      console.log("from_data1", formData1)
      dispatch(startAddPatient(formData1));
      const searchData = {
        key: "phone_num",
        value: formData1.phone_num
      }
      dispatch(searchPatient(searchData))
    } else {
      console.log("dispUser", state?.userData[0])
      const formData = {
        phone_num: state?.userData[0].phone_num,
        alt_phone_num: "",
        name: "",
        dob: "",
        gender: "",
        father_husband_name: "",
        marital_status: "",
        email: "",
        address: "",
        city: "",
        pincode: "",
        religion: "",
        refered_by: "",
        aadhar_num: "",
        nationality: "",

      }

      console.log("dispatchForm", formData)
      dispatch(startAddPatient(formData))
      const searchData = {
        key: "phone_num",
        value: formData.phone_num
      }
      console.log("searchNumForm", searchData)
      dispatch(searchPatient(searchData))
      // window.location.reload()
      // setFormData(actualData)
    }
  };

  const clearState = () => {
    navigate('.', { replace: true, state: {} });
  };
  const handleChange = (e) => {
    // clearState()
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  const [showTimeSlot, setShowTimeSot] = useState(false);

  const timeSlot = useSelector((state) => {
    return state.doctorSlice?.timeSlot;
  });


  // finding doctor slot day 
  useEffect(() => {
    if (timeSlot) {
      const days = timeSlot.map((slot) => slot.day);
      setAvailableDays(days);
    } else {
      setAvailableDays([]);
    }
  }, [timeSlot]);
  //console.log("timeslot",timeSlot)
  //console.log("availabledays",availableDays)
  // //console.log(appData?appData:"")
  // no used appoinntment list using date
  useEffect(() => {
    //console.log("232242")
    let fetchData = async () => {
      if (selectedDoctorId && selectedDate) {
        const fd = {
          doctor_id: selectedDoctorId,
          date: selectedDate,
        };
        //console.log(fd);
        await dispatch(startGetAppoinmentSlot(fd));
      }
    };
    fetchData();
  }, [selectedDate, selectedDoctorId]);

  // generating time interval
  const generateTimes = async (selectedDay, startTime, endTime) => {
    console.log("starttime", startTime);
    console.log("endtime", endTime);
    const times = [];

    const increment = consultationInterval;
    console.log('Generating times with:', startTime, endTime, consultationInterval);

    function parseTime24(timeStr) {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return { hours, minutes };
    }

    function formatTime24(hours, minutes) {
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      return `${formattedHours}:${formattedMinutes}`;
    }

    const { hours: startHour, minutes: startMinute } = parseTime24(startTime);
    const { hours: endHour, minutes: endMinute } = parseTime24(endTime);
    console.log("startHour : " + startHour + " start_m:" + startMinute + "");
    console.log("endHour : " + endHour + " end_m:" + endMinute + "");
    let hour = startHour;
    let minute = startMinute;
    while (hour < endHour || (hour === endHour && minute <= endMinute)) {
      const formattedTime = formatTime24(hour, minute);
      console.log("formattedTime", formattedTime)
      times.push(formattedTime);

      minute += Number(increment);
      console.log("incrementeMinuts", minute)
      if (minute >= 60) {
        hour += 1;
        minute %= 60;
      }
    }

    console.log('Generated times:', times);
    setTimes(times);
  };


  //  update the appointment form 
  const [error, setError] = useState('')
  const handleChangeApp = (e) => {

    // //console.log("comes to handleChange first", times);
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    // //console.log("newValue",newValue)
    setAppFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    if (name === "Department") {
      setError('')
      setShowTimeSot(false);
      setTimes([]);

      setDepartmentSelected(value);
    }

    if (name === "Doctor_Name") {
      //console.log("selected doctor name");
      // setSelectedDate(getCurrentFormattedDate())
      setError('')
      setShowTimeSot(false);
      setTimes([]);
      //  Object.keys(appFormData).length > 0 && setAppFormData({
      //     ...appFormData,  
      //     Date: "",        
      //   });
      const selectedDoctor = doctorNames.find(
        (doctor) => doctor.name === value
      );
      setSelectedDoctorId(selectedDoctor ? selectedDoctor.id : "");
      setSelectedDoctorName(selectedDoctor ? selectedDoctor.name : "");
    }

    if (name === "Date") {
      //console.log("come to date");
      setSelectedDate(value);
      // setError("")
      var selectedDay = new Date(value)
        .toLocaleString("en-us", { weekday: "short" })
        .toLowerCase();
      //console.log(selectedDay);
      //console.log("aa1");

      if (availableDays.includes("all_day")) {
        generateTimes(
          "all_day",
          timeSlot[0].time_slot_start,
          timeSlot[0].time_slot_end,
          appData,
          consultationInterval
        );
        setShowTimeSot(true);
      } else if (availableDays.includes(selectedDay)) {
        //console.log("inside ")
        setError('')
        let startTime = "00:00";
        let endTime = "00:00";
        for (let i = 0; i < timeSlot.length; i++) {
          if (timeSlot[i].day === selectedDay) {
            startTime = timeSlot[i].time_slot_start;
            endTime = timeSlot[i].time_slot_end;
            break;
          }
        }
        //console.log("not all day");
        generateTimes(selectedDay, startTime, endTime, appData, consultationInterval);
        setShowTimeSot(true);
      } else {
        //console.log("error in slots");
        // toast.error(
        //   "Doctor is not available on this selected day",
        //   "availableDays of Doctor is " + availableDays.join(" ,")
        // );
        const errorMessage = "Doctor is not available on this selected day. Available days of Doctor: " + availableDays.join(", ");
        setError(errorMessage)
        setShowTimeSot(false);
      }
    }
  };
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };
  // useEffect(() => {
  //   if (selectedDoctor) {
  //     setSelectedDate(getCurrentDate());
  //   }
  // }, [selectedDoctor])
  //console.log("formdata",formData)
  //console.log("dfghgf",appFormData)

  // useEffect(() => {
  //   const formData = {
  //     doctor_id: selectedDoctorId,
  //     date: selectedDate
  //   };

  //   if (selectedDoctorId && selectedDate) {
  //     (async () => {
  //       try {
  //         const response = await axios.post('https://api.voxprosolutions.com:8080/api/appointment_solt', formData, {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem('token')}`
  //           }
  //         });
  //         ////console.log(response.data);
  //         setBookedSlot(response.data);
  //       } catch (err) {
  //         //console.log(err);
  //       }
  //     })();
  //   }
  // }, [selectedDoctorId, selectedDate]); // Added selectedDate to dependencies

  useEffect(() => {
    //console.log("bookedSlot:", bookedSlot);
  }, [bookedSlot]); // New useEffect to log bookedSlot whenever it changes
  //console.log(appFormData)
  useEffect(() => {
    ////console.log(selectedDoctorId);
    const id = {
      id: selectedDoctorId,
    };
    dispatch(getTimeSlot(id));
  }, [selectedDoctorId]);

  const handleFormEmpty = () => {
    setSelectedDoctorId('')
    // setFormData({})
    // setAppFormData({})
    setSelectedTime('')
    setSelectedDate("")
    setTimes([])

  }
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    if (minutes.length === 2) {
      return time;
    }
    const minutesNum = parseInt(minutes, 10);
    let formattedMinutes = minutes;
    if (formattedMinutes.startsWith('0') && formattedMinutes !== '00' && formattedMinutes[1] !== '0') {
      formattedMinutes = formattedMinutes.slice(1);
    }

    return `${hours}:${formattedMinutes}`;
  };
  const handleAddAppoinment = () => {
    //console.log("selectedTime",selectedTime)
    //console.log("timmee",formatTime(selectedTime))
    // console.log()
    console.log("actualData", actualData)
    const addApp = {
      doctor_id: selectedDoctorId,
      doctor_name: appFormData.Doctor_Name,
      department: appFormData.Department,
      patient_id: formData.id,
      date: appFormData.Date,
      time: formatTime(selectedTime),
      remarks: appFormData.Remarks ? appFormData.Remarks : "",
    };
    console.log("Add", addApp)
    dispatch(addAppoinment(addApp))
      .unwrap()
      .then((result) => {
        //console.log('Appointment added:', result);
        handleFormEmpty()
        setOpen(false)
        setError("")
      })
      .catch((error) => {
        console.error('Failed to add appointment:', error)
      })

  };
  // const handleDateChange=()=>{
  //      setAppointDate()
  // }
  const getDayName = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };
  //console.log("appFormData",appFormData)
  //console.log("appointment",appointment)
  const DateFormatter = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = format(parsedDate, 'dd-MM-yyyy');
    return formattedDate;
  };
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    } catch (error) {
      console.error('Invalid date format:', dateString);
      return '';
    }
  };
  //console.log("selctedDoc",selectedDoctor)

  const getDefaultValue = (field) => {
    if (formData[field.formDataKey]) {
      return formData[field.formDataKey]
    } else {
      if (state?.userData && field.formDataKey in state?.userData[0]) {
        return state?.userData[0][field.formDataKey];
      } else {
        return "";
      }
    }
  };
  // Function to convert 24-hour time to 12-hour format with AM/PM
  const convertTime = (time24) => {
    if (typeof time24 === 'undefined' || time24 === null) {
      console.error('Invalid time format:', time24);
      return '';
    }
    time24 = String(time24)
    if (time24 === "11:023") {
      time24 = "11:23";
    }

    const [hourStr, minuteStr] = time24.split(':');
    if (typeof hourStr === 'undefined' || typeof minuteStr === 'undefined') {
      console.error('Invalid time format:', time24);
      return '';
    }

    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (isNaN(hour) || isNaN(minute)) {
      console.error('Invalid hour or minute:', time24);
      return '';
    }

    const period = hour < 12 ? 'AM' : 'PM'
    const adjustedHour = hour % 12 || 12

    return `${adjustedHour}:${minute.toString().padStart(2, '0')} ${period}`
  };
  //console.log("times",times)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: "100%",
          border: "1px soild red",
          backgroundColor: "white",
          minHeight: "60vh",
          borderRadius: "9px",
          // p: 2,
        }}
      >
        <Box
          sx={{
            minHeight: "100px",
            border: "1px solid lightgray",
            mt: 1,
            borderRadius: "8px",
            m: 1,
            backgroundColor: "#FAFAFA",
            p: 1,
          }}
        >
          <Typography variant="h6" sx={{ color: "#0077b6" }}>
            <b>
              Patient Details <Divider />
            </b>
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Box
              sx={{
                width: "90%",
                // backgroundColor: "red",
                minHeight: "100px",
                borderRadius: "8px",
              }}
            >
              <Grid container spacing={1}>
                {p_form.map((field, index) => (
                  // <Grid key={index} item xs={12} md={4} sx={{display:"flex",justifyContent:"flex-end"}}>
                  <React.Fragment key={index}>
                    {field.type === "select" ? (
                      <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <TextField
                          sx={{ width: "80%", mt: 1 }}
                          size="small"
                          type="text"
                          variant={field.variant}
                          label={field.label}
                          placeholder={field.placeholder}
                          name={field.formDataKey}
                          value={getDefaultValue(field)}
                          onChange={handleChange}
                          select
                        >
                          {field.menuItems?.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    ) : field.type === "date" ? (
                      <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <TextField
                          sx={{ width: "80%", mt: 1 }}
                          size="small"
                          type="date"
                          variant={field.variant}
                          label={field.label}
                          placeholder={field.placeholder}
                          name={field.formDataKey}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={getDefaultValue(field)}

                          onChange={handleChange}
                        />
                      </Grid>
                    ) : field.type === "time" ? (
                      <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <TextField
                          sx={{ width: "80%", mt: 1 }}
                          size="small"
                          type="time"
                          variant={field.variant}
                          label={field.label}
                          placeholder={field.placeholder}
                          name={field.formDataKey}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={getDefaultValue(field)}
                          onChange={handleChange}
                        />
                      </Grid>
                    ) : field.type === "multiline" ? (
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <TextField
                          sx={{ width: { md: "93%", xs: "80%" }, mt: 1 }}
                          size="small"
                          multiline
                          rows={3}
                          type="text"
                          variant={field.variant}
                          label={field.label}
                          placeholder={field.placeholder}
                          name={field.formDataKey}
                          value={getDefaultValue(field)}
                          onChange={handleChange}
                        />
                      </Grid>
                    ) : (
                      <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <TextField
                          sx={{ width: "80%", mt: 1 }}
                          size="small"
                          type={field.type}
                          label={field.label}
                          variant={field.variant}
                          placeholder={field.placeholder}
                          name={field.formDataKey}
                          value={getDefaultValue(field)}
                          InputProps={
                            field.formDataKey === "phone_num" && actualData
                              ? { readOnly: true }
                              : {}
                          }
                          onChange={handleChange}
                        />
                      </Grid>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>

        {/* Modal content */}
        <Dialog open={open} maxWidth="xl" fullWidth
        //  PaperProps={{
        //   sx: { 
        //     transform: "translateY(-20%)" // Adjust this value as needed to move the dialog higher
        //   }
        //}}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
            <DialogTitle variant="h6" sx={{ color: "#0077b6" }}>
              <b> Appointment </b>
            </DialogTitle>
            <Tooltip title="Close" placement="left">
              <Button onClick={handleClose} size="small" sx={{ color: "black" }}>
                <CloseIcon fontSize="small" />
              </Button>
            </Tooltip>
          </Box>
          <Divider />
          <DialogContent>
            <Box
              sx={{
                minHeight: "80px",
                border: "1px solid lightgray",
                mt: 1,
                borderRadius: "8px",
                m: 1,
                backgroundColor: "#FAFAFA",
                p: 1,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <Box
                  sx={{
                    minHeight: "100px",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                >
                  <Grid
                    container
                    spacing={1}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"100%"}
                  // sx={{border:'1px solid red'}}
                  >
                    {appointment.map((field, index) => (
                      <React.Fragment key={index}>
                        {field.type === "select" &&
                          field.label === "Department" ? (
                          <Grid
                            item
                            xs={12}
                            md={3}
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <TextField
                              sx={{ width: "80%" }}
                              size="small"
                              type="text"
                              variant={field.variant}
                              label={field.label}
                              placeholder={field.placeholder}
                              name={field.label}
                              value={appFormData[field.label] || ""}
                              onChange={handleChangeApp}
                              select
                            >
                              {field.menuItems?.map((item, index) => (
                                <MenuItem key={index} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                        ) : field.type === "select" &&
                          field.label === "Doctor_Name" ? (
                          <Grid
                            item
                            xs={12}
                            md={3}
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <TextField
                              sx={{ width: "80%" }}
                              size="small"
                              type="text"
                              variant={field.variant}
                              label={field.label}
                              placeholder={field.placeholder}
                              name={field.label}
                              value={appFormData[field.label] || ""}
                              // value={appointDate}
                              onChange={handleChangeApp}
                              select
                              disabled={!departmentSelected}
                            >
                              {field.menuItems?.map((item, index) => (
                                <MenuItem key={index} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                        ) : field.type === "date" ? (
                          <Grid
                            item
                            xs={12}
                            md={3}
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            {/* <TextField
                            sx={{ width: "80%" }}
                            size="small"
                            type="date"
                            variant={field.variant}
                            label={field.label}
                            placeholder={field.placeholder}
                            name={field.label}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={appFormData[field.label] || ""}                       
                            onChange={handleChangeApp}                         
                            disabled={!departmentSelected}
                            InputProps={{
                              inputProps: {
                                
                                min: selectedDoctor?.start_date,
                                max: selectedDoctor?.end_date,
                              },                     
                            }}
                          /> */}
                            <TextField

                              fullWidth
                              sx={{ width: "80%" }}
                              size="small"
                              type="date"
                              variant={field.variant}
                              label={field.label}
                              placeholder={field.placeholder}
                              name={field.label}
                              value={appFormData && appFormData[field.label] || ""}
                              onChange={handleChangeApp}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              inputProps={{
                                min: selectedDoctor.start_date ? format(new Date(selectedDoctor.start_date), 'yyyy-MM-dd') : '',
                                max: selectedDoctor.end_date ? format(new Date(selectedDoctor.end_date), 'yyyy-MM-dd') : '',
                              }}
                            />
                            {/* <DatePicker
        label={field.label} */}
                            {/* // value={appFormData && appFormData[field.label] || null}
        // onChange={(newValue) => handleChangeApp({ target: { name: field.label, value: newValue } })} */}
                            {/* renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{ width: "60%", height: "40px" }}  // Adjust the width and height as needed
            size="small"
            variant={field.variant}
            placeholder={field.placeholder}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
        inputFormat="yyyy-MM-dd"
        // minDate={selectedDoctor.start_date}
        // maxDate={selectedDoctor.end_date}
        PopperProps={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -10], // Adjust the second value to move the popper higher
              },
            },
          ],
        }} */}
                            {/* sx={{ 
          width: "60%",   // Adjust the width as needed
          '& .MuiInputBase-root': {
            height: '40px',  // Adjust the height as needed
          },
        }}
      /> */}
                          </Grid>
                        ) : (
                          <Grid
                            item
                            xs={12}
                            md={3}
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <TextField
                              sx={{ width: "80%" }}
                              size="small"
                              type={field.type}
                              label={field.label}
                              variant={field.variant}
                              placeholder={field.placeholder}
                              name={field.label}
                              value={appFormData[field.label] || ""}
                              onChange={handleChangeApp}
                            />
                          </Grid>
                        )}
                      </React.Fragment>
                    ))}
                  </Grid>


                  {/*slots   */}
                  <Grid
                    container
                    spacing={1}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mt={2}
                    maxWidth={"xl"}
                  >
                    {error && (
                      <Typography color="error" variant="body2">
                        {error}
                      </Typography>
                    )}
                    {showTimeSlot && times.map((time, index) => {
                      const isDisabled =
                        receivedData &&
                        Array.isArray(receivedData) &&
                        receivedData.some((data) => {
                          // //console.log('Checking time:', data.time, time);
                          return data.time === formatTime(time);
                        });
                      return (
                        <Button
                          key={index}
                          onClick={() => handleTimeClick(time)}
                          disabled={isDisabled}
                          sx={{
                            padding: "10px",
                            margin: "5px",
                            border:
                              selectedTime === time
                                ? "2px solid blue"
                                : "2px solid lightgray",
                            backgroundColor:
                              isDisabled
                                ? "gray"  // Color for disabled state indicating booked
                                : (selectedTime === time)
                                  ? "blue"
                                  : "white",
                            color:
                              isDisabled
                                ? "white" // Text color for disabled state
                                : (selectedTime === time)
                                  ? "white"
                                  : "black",
                            borderRadius: "5px",
                            cursor: "pointer",
                            mt: 2,
                          }}
                        >
                          {convertTime(formatTime(time))}
                        </Button>
                      );
                    })}
                  </Grid>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 1,
              }}
            >
              {!error && selectedTime.length > 0 && <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={handleAddAppoinment}
              >
                Add Appoinment
              </Button>}
            </Box>
          </DialogContent>
        </Dialog>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            disableElevation
            color="success"
            size="small"
            onClick={handleSubmit}
          >
            {!formData.id ? "Add Patient"
              : (state?.userData[0].id ? "Update Patient"
                : (Object.values(formData).length > 0 && formData.id ? "Update Patient"
                  : "Add Patient"))}
          </Button>

          <Button
            variant="contained"
            disableElevation
            color="success"
            size="small"
            onClick={() => handleOpen(formData)}
            disabled={
              !(actualData || state?.userData?.length > 0 || Object.keys(formData).length > 0)
            }>
            Appointment
          </Button>
        </Box>
      </Box>
    </LocalizationProvider >
  );
};

export default Consultation;
