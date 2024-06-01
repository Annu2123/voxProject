import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard/dashboard.jsx";
import AppointmentsList from "./components/AppointmentList/appointmentList.jsx";
import AddDoctor from "./components/AddDoctor/addDoctor.jsx";
import Consultation from "./components/Consultation/consultation.jsx";
import ConnectPatient from "./components/AppointmentList/connect.jsx";
import ManageLeads from "./components/ManageLeads/manageLeads.jsx";
import EditManageLeads from "./components/ManageLeads/editManageLeads.jsx";
import SignIn from "./components/SignIn/signIn.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { Toaster } from "react-hot-toast";
import Whatsapp from "./components/Whatsapp/whatsapp.jsx";
import Email from "./components/Email/email.jsx";
import EditDoctor from "./components/AddDoctor/editDoctor.jsx";
import Department from "./components/Department/department.jsx";
import VarAppbar from "./components/VarAppbar.js/varAppbar.jsx";
import User from "./components/User/user.jsx";
import AddUser from "./components/User/addUser.jsx";
import UpdateUser from "./components/User/updateUser.jsx";
import CallActivity from "./components/CallActivity/callActivity.jsx";
import { Buffer } from 'buffer';
import VisterActivity from "./components/VisterActivity/visterActivity.jsx";

window.Buffer = Buffer;

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "appointment_list",
        element: <AppointmentsList />,
      },
      {
        path: "add_doctor",
        element: <AddDoctor />,
      },
      {
        path:"edit_doctor",
        element:<EditDoctor/>
      },
      {
        path: "consultation",
        element: <ConnectPatient />,
      },
      {
        path: "dashboard/connect",
        element: <ConnectPatient />,
      },
      {
        path: "manage_patient",
        element: <ManageLeads />,
      },
      {
        path: "manage_patient/edit_leads",
        element: <EditManageLeads />,
      },
      {
        path:"whatsapp",
        element:<Whatsapp/>
      },
      {
        path:"email",
        element:<Email/>
      },
      {
        path:'consultation_settings',
        element:<VarAppbar/>
      },
      {
        path:"users",
        element:<User/>
      },
      {
        path:"users/create",
        element:<AddUser/>
      },
      {
        path:"users/edit",
        element:<UpdateUser/>
      },
      {
        path:"call_activity",
        element:<CallActivity/>
      },
      {
        path:"visit_activity",
        element:<VisterActivity/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
        <Toaster/>
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
