import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Alert from "../ui/alert";
import Notification from "../ui/notification";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { APP_URL } from "../../config/constants";
import { rolesData } from "../../utils/Data";
import { districtsData, countriesData, statesData } from "../../utils/Data";
import KeycloakUserRegistration from "../../pages/register";
import Expired from "../../pages/reports";

export default function EditUserDialog(props) {
  // console.log("props",props)
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(props.data);
  const [age, setAge] = useState();
  const [marks, setMarks] = useState({});
  const [email, setEmail] = useState();
  const [Password, setPassword] = useState("learn@wit");
  const [role, setRole] = useState("student");
  const [status, setStatus] = useState("Accepted");
  const [pwdcertificate, setPwdcertificate] = useState(false);
  const [aadharcertificate, setAadharcertificate] = useState(false);
  const [pancertificate, setPancertificate] = useState(false);
  const [idcard, setIdcard] = useState(false);
  const [proofedu, setProofedu] = useState(false);
  const [sscmemo, setSscmemo] = useState(false);
  const [income, setIncome] = useState(false);
  const [resume, setResume] = useState(false);
  const [uniqueid, setUniqueid] = useState();
  const [course, setCourse] = useState(props.data.course);
  const [showKeyclock,setShowKeyclock] = useState(false)
  const [addUserMessage, setAddUserMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });
  const [stateKey, setStateKey] = useState(0);

  function calculateAge(dob) {
    let birthDate = new Date(dob);
    let today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() == birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      years--;
    }
    setAge(years);
  }

  useEffect(() => {
    setEmail(props.data.emailID);
    setUniqueid(props.data.regID);
    setCourse(props.data.course);
    setOpen(props.open);
    setUserData(props.data);
    // console.log("üserData",props.data)
    calculateAge(props.data.dob);
    if (props.data.status == "Written Test Completed") {
      setMarks(() => {
        return Object.assign({}, JSON.parse(props.data.subject_total));
      });
    }
  }, [props.open, props.data]);

  function closed() {
    setOpen(false);
    props.onChangeOpen();
    setAddUserMessage("");
    setUserData("");
  }
  function closedSuccess(message) {
    props.successMessage(message);
    closed();
  }
  function openpdf(url) {
    window.open(API_URL + url);
  }

  function sendrequest(e) {
    console.log(course);
    e.preventDefault();
    axios
      .post(API_URL + "students/accept_student.php", {
        email: email,
        password: Password,
        course: course,
        role: role,
        uniqueid: uniqueid,
      })
      .then(function (response) {
        alert("Student Status Updated");
        // if (response?.data?.meta?.error) {
        //   setStatisMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
        // }
        // if (!response?.data?.meta?.error) {
        //   setStatusMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
        //   setAlert(true);
        // }
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .post(API_URL + "students/status.php", {
        uniqueid: uniqueid,
        status: status,
      })
      .then(function (response) {
        console.log(response,"response");
        // if (response?.data?.meta?.error) {
        //   setStatisMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
        // }
        // if (!response?.data?.meta?.error) {
        //   setStatusMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
        //   setAlert(true);
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateStatus(status) {
    axios
      .post(API_URL + "students/update_student_status.php", {
        student_status: status,
        regID: props.data.regID,
      })
      .then(function (response) {
        if (response.data.meta.error === true) {
          setAddUserMessage({
            type: "error",
            message: response.data?.meta?.message,
            icon: "error",
          });
        }
        if (response.data.meta.error === false) {
          setAddUserMessage({
            type: "success",
            message: response.data?.meta?.message,
            icon: "loading",
          });
          props.userUpdated(new Date().getTime());
          //closedSuccess(response.data?.meta?.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="bg-gray-800 bg-opacity-50 fixed inset-0 overflow-hidden z-40"
        open={open}
        onClose={closed}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen">
                <form className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="px-4 py-6 bg-gray-50 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Edit Student Status
                          </Dialog.Title>
                        </div>
                        <div className="h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onClick={() => closed()}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="px-8  flex justify-start py-6 bg-blue-200">
                      <img
                        src={APP_URL + userData["photo_file"]}
                        alt="User Avatar"
                        class="inline-block w-20 h-20 rounded-full border"
                      />
                      <div className="px-3 py-3">
                        <h3 className="font-bold">
                          NAME : {userData["first_name"]}
                        </h3>
                        <p className="font-bold">ID : {userData["regID"]}</p>
                      </div>
                    </div>
                    <Expired username={userData["regID"]}/>

                    {/* Divider container */}
                    <div className="px-4 py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:grid sm:grid-cols-2">
                      {/* <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                         Registration ID
                        </div> */}
                      {/* <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                          {userData['regID']}
                        </div>                       */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Status
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["status"]}
                      </div>
                      {userData["status"] == "Written Test Completed" ? (
                        <>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                            Marks
                          </div>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                            {marks
                              ? Object.keys(marks).map((key) => {
                                  return <div>{key + " : " + marks[key]}</div>;
                                })
                              : ""}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold sm:col-span-2 text-xl text-blue-900">
                        Basic Details
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        First Name
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["first_name"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Middle Name
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["middle_name"] != ""
                          ? userData["middle_name"]
                          : "--"}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Last Name
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["last_name"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Gender
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["gender"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Date of Birth
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["dob"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Age
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {age}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Caste Category
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["caste_category"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Religion
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["religion"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Marital Status
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["marital_status"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Occupation
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["occupation"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Physically Disabled?
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["pwd"]}
                      </div>
                      {userData["pwd"] == "Yes" ? (
                        <>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                            Disability
                          </div>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                            {userData["disability"]}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Languages Known
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["languages"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold sm:col-span-2 text-xl text-blue-900">
                        Verification Details
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Aadhaar Number
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["aadhaar_number"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Aadhaar Card
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["aadhaar_file"] != "" ? (
                          <div
                            onClick={() => {
                              setAadharcertificate(!aadharcertificate);
                            }}
                            className="underline text-blue-900 cursor-pointer"
                          >
                            {aadharcertificate === true
                              ? "Close File <--"
                              : "Open File -->"}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      {aadharcertificate === true ? (
                        <>
                         <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Aadhaar Card file
                      </div>
                          {userData["aadhaar_file"] &&
                          userData["aadhaar_file"].endsWith(".pdf") ? (
                            <div className="col-span-1 border">
                              <object
                                data={APP_URL + userData["aadhaar_file"]}
                                type="application/pdf"
                                width="100%"
                                height="600px"
                              >
                                <embed
                                  src={APP_URL + userData["aadhaar_file"]}
                                  type="application/pdf"
                                  width="100%"
                                  height="600px"
                                />
                              </object>
                            </div>
                          ) : (
                            <div className="col-span-1 border">
                              <a
                                title="Please click on the image to view full screen"
                                href={APP_URL + userData["aadhaar_file"]}
                                target="_blank"
                              >
                                <img
                                  src={APP_URL + userData["aadhaar_file"]}
                                  alt=""
                                  height="300"
                                  width="400"
                                />
                              </a>
                            </div>
                          )}
                        </>
                      ) : (
                        ""
                      )}

                     
                        
                          <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                            Other ID Proof
                          </div>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                            {userData["otherID"]}
                          </div>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                            ID Number
                          </div>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                            {userData["otherID_number"]}
                          </div>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                            ID Card
                          </div>
                         
                            <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                            {userData["otherID_file"] != "" ? (
                              <div
                                onClick={() => {
                                  setIdcard(!idcard);
                                }}
                                className="underline text-blue-900 cursor-pointer"
                              >
                                {idcard === true
                                  ? "Close File <--"
                                  : "Open File -->"}
                              </div>
                            
                          ) : (
                            ""
                          )}
                          </div>
                          {idcard === true ? (
                            <>
                              <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                                Id card Image
                              </div>

                              {userData["otherID_file"] &&
                                userData["otherID_file"].endsWith(".pdf") ? (
                                  <div className="col-span-1 border">
                              <object
                                data={APP_URL + userData["otherID_file"]}
                                type="application/pdf"
                                width="100%"
                                height="600px"
                              >
                                <embed
                                  src={APP_URL + userData["otherID_file"]}
                                  type="application/pdf"
                                  width="100%"
                                  height="600px"
                                />
                              </object>
                            </div>):(




                              <div className="col-span-1 border">
                                <a
                                  title="Please click on the image to view full screen"
                                  href={APP_URL + userData["otherID_file"]}
                                  target="_blank"
                                >
                                  <img
                                    src={APP_URL + userData["otherID_file"]}
                                    alt=""
                                    height="300"
                                    width="400"
                                  />
                                </a>
                              </div>
                            )}
                            </>
                          ) : (
                            ""
                          )}
                        
                      
                        
                      
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold sm:col-span-2 text-xl text-blue-900">
                        Contact Details
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Mobile
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["mobile"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Email ID
                      </div>
                      <div className="spacec-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["emailID"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Address
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["address"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        State
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["state"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        District
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["district"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        PIN Code
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["pincode"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold sm:col-span-2 text-xl text-blue-900">
                        Education Details
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Resume Image
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["resume_file"] != "" ? (
                          <div
                            onClick={() => {
                              setResume(!resume);
                            }}
                            className="underline text-blue-900 cursor-pointer"
                          >
                            {resume === true
                              ? "Close File <--"
                              : "Open File -->"}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      {resume === true ? (
                        <>
                        <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Resume Image
                      </div>
                          {userData["resume_file"] &&
                          userData["resume_file"].endsWith(".pdf") ? (
                            <div className="col-span-1 border">
                              <object
                                data={APP_URL + userData["resume_file"]}
                                type="application/pdf"
                                width="100%"
                                height="600px"
                              >
                                <embed
                                  src={APP_URL + userData["resume_file"]}
                                  type="application/pdf"
                                  width="100%"
                                  height="600px"
                                />
                              </object>
                            </div>
                          ) : (
                            <div className="col-span-1 border">
                              <a
                                title="Please click on the image to view full screen"
                                href={APP_URL + userData["resume_file"]}
                                target="_blank"
                              >
                                <img
                                  src={APP_URL + userData["resume_file"]}
                                  alt=""
                                  height="300"
                                  width="400"
                                />
                              </a>
                            </div>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Educational Qualification
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["edqual"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Educational Status
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["edstatus"]}
                      </div>
                      {userData["edstatus"] == "Pass" ? (
                        <>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                            Year of Passing
                          </div>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                            {userData["yofpass"]}
                          </div>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                            Proof of Education
                          </div>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                            {userData["edproof_file"] != "" ? (
                              <div
                                onClick={() => {
                                  setProofedu(!proofedu);
                                }}
                                className="underline text-blue-900 cursor-pointer"
                              >
                                {proofedu === true
                                  ? "Close File <--"
                                  : "Open File -->"}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          {proofedu === true ? (
                            <>
                            <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                            Proof of Education
                          </div>
                             {userData["edproof_file"] &&
                          userData["edproof_file"].endsWith(".pdf") ? (


                            <div className="col-span-1 border">
                            <object
                              data={APP_URL + userData["edproof_file"]}
                              type="application/pdf"
                              width="100%"
                              height="600px"
                            >
                              <embed
                                src={APP_URL + userData["edproof_file"]}
                                type="application/pdf"
                                width="100%"
                                height="600px"
                              />
                            </object>
                          </div>
                        ) : (
                          <>

                              {/* <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                                Proof of education Image
                              </div> */}
                              <div className="col-span-1 border">
                                <a
                                  title="Please click on the image to view full screen"
                                  href={APP_URL + userData["edproof_file"]}
                                  target="_blank"
                                >
                                  <img
                                    src={APP_URL + userData["edproof_file"]}
                                    alt=""
                                    height="300"
                                    width="400"
                                  />
                                </a>
                              </div>
                              </>
                        )}
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        ""
                      )}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        SSC Grade Memo
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["ssc_file"] != "" ? (
                          <div
                            onClick={() => {
                              setSscmemo(!sscmemo);
                            }}
                            className="underline text-blue-900 cursor-pointer"
                          >
                            {sscmemo === true
                              ? "Close File <--"
                              : "Open File -->"}
                          </div>
                        ) : (
                          "--"
                        )}
                      </div>
                      {sscmemo === true ? (
                        <>
                         <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        SSC Grade Memo
                      </div>
                         {userData["ssc_file"] &&
                          userData["ssc_file"].endsWith(".pdf") ? (
                            <div className="col-span-1 border">
                              <object
                                data={APP_URL + userData["ssc_file"]}
                                type="application/pdf"
                                width="100%"
                                height="600px"
                              >
                                <embed
                                  src={APP_URL + userData["ssc_file"]}
                                  type="application/pdf"
                                  width="100%"
                                  height="600px"
                                />
                              </object>
                            </div>
                          ) : (
                            <>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                            SSC Memo Image
                          </div>
                          <div className="col-span-1 border">
                            <a
                              title="Please click on the image to view full screen"
                              href={APP_URL + userData["ssc_file"]}
                              target="_blank"
                            >
                              <img
                                src={APP_URL + userData["ssc_file"]}
                                alt=""
                                height="300"
                                width="400"
                              />
                            </a>
                          </div>
                          </>
                          )}
                        </>
                      ) : (
                        ""
                      )}

                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold sm:col-span-2 text-xl text-blue-900">
                        Family Details
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Gaurdian First Name
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["gfirst_name"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Gaurdian Last Name
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["glast_name"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Relationship with Guardian
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["grelation"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Guardian Contact Details
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["gmobile"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Number of Family Members
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["family_members"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Annual Income
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["annual_income"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Income Certificate
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["income_file"] != "" ? (
                          <div
                            onClick={() => {
                              setIncome(!income);
                            }}
                            className="underline text-blue-900 cursor-pointer"
                          >
                            {income === true
                              ? "Close File <--"
                              : "Open File -->"}
                          </div>
                        ) : (
                          "--"
                        )}
                      </div>
                      {income === true ? (
                        <>
                         <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Income Certificate file
                      </div>
                         {userData["income_file"] &&
                          userData["income_file"].endsWith(".pdf") ? (
                            <div className="col-span-1 border">
                            <object
                              data={APP_URL + userData["income_file"]}
                              type="application/pdf"
                              width="100%"
                              height="600px"
                            >
                              <embed
                                src={APP_URL + userData["income_file"]}
                                type="application/pdf"
                                width="100%"
                                height="600px"
                              />
                            </object>
                          </div>
                          ):(
                            <>
                          {/* <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                            Income certificate Image
                          </div> */}
                          <div className="col-span-1 border">
                            <a
                              title="Please click on the image to view full screen"
                              href={APP_URL + userData["income_file"]}
                              target="_blank"
                            >
                              <img
                                src={APP_URL + userData["income_file"]}
                                alt=""
                                height="300"
                                width="400"
                              />
                            </a>
                          </div>
                          </>
                          )}
                        </>
                      ) : (
                        ""
                      )}

                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Profession of Chief Wage Owner
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["prof_cwo"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Highest Educated in Family
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["highed_family"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Highest Educated Qualification
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["highedqual_family"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold sm:col-span-2 text-xl text-blue-900">
                        Other Details
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        How he/she knows about program?
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["source"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Technical Skills
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["tech_level"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Chosen Course
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["course"]}
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Choosen Center
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["center_id"]}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4 font-semibold">
                        Preferred Mode of Training
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:gap-4 sm:px-6 sm:py-4">
                        {userData["mode"]}
                      </div>
                    </div>
                    {addUserMessage.message ? (
                      <Alert
                        type={addUserMessage.type}
                        message={addUserMessage.message}
                        icon={addUserMessage.icon}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  {/* Action buttons */}
                  <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                    <div className="space-x-3 flex justify-end">
                      {userData["status"] == "Registered" ? (
                        <>
                        <div
                          
                          onClick={(e) => {
                            sendrequest(e);
                            setOpen(false);
                            setShowKeyclock(true)
                          }}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                         
                          Accept
                          
                        </div>
                        <div>
                         {showKeyclock?<KeycloakUserRegistration userData={userData}/>:""}
                         </div>
                         </>
                      ) : (
                        ""
                      )}
                      {userData["status"] == "Registered" ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            updateStatus("Rejected");
                            setOpen(false);
                          }}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Reject
                        </button>
                      ) : (
                        ""
                      )}
                      {userData["status"] == "Registered" ? (
                        <button
                          type="button"
                          onClick={(e) => updateStatus("on Hold")}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          on Hold
                        </button>
                      ) : (
                        ""
                      )}
                      <button
                        type="button"
                        className="text-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={() => closed()}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
