import Head from "next/head";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

import { Fragment, useState, useEffect } from "react";
//import { useRouter } from "next/router";
//import Cookies from "js-cookie";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import Alert from "../../components/ui/alert";
//import { isStudentLoggedIn, StudentData } from "../utils/Student";
import {
  GenderList,
  CasteCategoryList,
  ReligionList,
  MaritalStatusList,
  OccupationList,
  DisabilityList,
  LanguagesList,
  OtherIDList,
  EducationList,
  EducationStatusList,
  YearList,
  GaurdianRelationList,
  AnnulaIncomeList,
  HighEducatedFamilyList,
  HighEducationFamilyList,
  SourceList,
  TechLevelList,
  CourseList,
  ModeList,
  bplList,
  PostGraduationList,
  GraduationList,

} from "../../utils/Data";
import Multiselect from "multiselect-react-dropdown";
import router from "next/router";
//import { Switch } from "@headlessui/react";

//function classNames(...classes) {
//  return classes.filter(Boolean).join(" ");
//}

export default function Update(props) {
  const [age, setAge] = useState();
  const [isPwD, setIsPwD] = useState("No");
  const [otherID, setOtherID] = useState("");
  const [edstatus, setEdStatus] = useState();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selDistrict, setSelDistrict] = useState();
  const [gender, setGender] = useState();
  const [occupation, setOccupation] = useState();
  const [languages, setLanguages] = useState([]);
  const [password, setPassword] = useState();
  const [cnfpassword, setCnfpassword] = useState();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(props.id);

  const [first_name, setfirst_name] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [mode, setMode] = useState("");
  const [course, setCourse] = useState("");
  const [tech_level, setTech_level] = useState("");
  const [source, setSource] = useState("");

  // const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState();

  // const [city, setCity] = useState("");
  // const [area, setArea] = useState("");
  const [address, setAddress] = useState("");

  // const [school, setSchool] = useState("");
  // const [class1, setClass1] = useState("");

  const [status, setStatus] = useState("");

  // const [gender, setGender] = useState("");
  const [last_name, setlast_name] = useState("");
  const [middle_name, setmiddle_name] = useState("");
  const [dob, setdob] = useState("");
  const [imgfile, uploadimg] = useState("");
  const [profileData, setProfileData] = useState("");
  const [gaurdianfirstname, setGaurdianFirstname] = useState("");
  // const [gaurdianfirstnameError, setGaurdianfirstnameError] = useState(false);

  const [gaurdianlastname, setGaurdianLastname] = useState("");
  // const [gaurdianlastnameError, setGaurdianlastnameError] = useState(false);
  const [gaurdianMobilenumber, setGaurdianMobilenumber] = useState("");
  // const [gaurdianmobilenumberError, setgaurdianmobilenumberError] =
  // useState(false);
  const [gaurdianRelation, setGaurdianrelation] = useState("");
  // const [gaurdianRelationError, setGaurdianrelationError] = useState(false);
  const [familyMembers, setFamilymembers] = useState("");
  // const [familyMembersError, setFamilyMembersError] = useState(false);
  const [education, setEducation] = useState("");
  // const [edStatus, setEdStatus] = useState("");
  // const [edError, setEdError] = useState(false);
  // const [edstatusError, setEdstausError] = useState(false);
  // const [occupation, setOccupation] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  // const [birthdateError, setBirthdateError] = useState(false);
  const [yofpass, setPassingYear] = useState("");
  const [pincode, setPincode] = useState("");
  const [religion, setReligion] = useState("");
  const [caste_category, setCastcategory] = useState("");
  const [marital_status, setMaritalStatus] = useState("");
  const [annual_income, setAnnual_income] = useState("");
  const [prof_cwo, setProf_cwo] = useState("");
  const [highed_family, setHighed_family] = useState("");
  const [highedqual_family, setHighedqual_family] = useState("");
  // const [isPwD, setIsPwD] = useState("");
  const [bpl, setBpl] = useState("");
  const [disability, setDisability] = useState("");
  // const [myimage, setMyImage] = useState("");
  const [photo_file, setPhotofile] = useState("");
  const [edproof_file, setEdprooffile] = useState("");
  const [income_file, setIncome_file] = useState("");
  const [ssc_file, setSscfile] = useState("");
  const [exp_file, setExpfile] = useState("");
  const [resume_file, setResumefile] = useState("");
  const [pwd_file, setPwdfile] = useState("");
  const [otherID_number, setOtherIDno] = useState("");
  const [aadhaar_number, setAadharno] = useState("");
  const [ID, setID] = useState("");
  const [aadhaar_file, setAadharfile] = useState("");
  const [otherID_file, setOtherIDfile] = useState("");
  const[specialization,setSpecialization] = useState("");
  const[markPrecentage,setMarkPrecentage] = useState("");
  const[graduationType,setGraduationType] = useState("");
  const[postgraduationType,setpostGraduationType] = useState("");
  const[center,setCenter] = useState("");
  const[Centers,setCenters]=useState([]);


  const [regMessage, setregMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });
  useEffect(() => {
    axios
      .post(API_URL + "centers/get_centers.php", {})
      .then(function (response) {
        // console.log("response", response);
        setCenters(() => {
          return [...response.data.centers];
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //const router = useRouter();
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
  function closed() {
    setOpen(false);
    props.onChangeOpen();
    setAddUserMessage("");
    setUserId("");
    setfirst_name("");
    setEmail("");
    setMobile("");
    setGender("");
    // setCountry("");
    setState("");
    setDistrict("");
    // setCity("");
    // setArea("");
    setAddress("");
    // setRole("");
    // setSchool("");
    // setClass1("");
    setStatus("");
    setlast_name("");
    setmiddle_name("");
    setdob("");
  }
  function closedSuccess(message) {
    props.successMessage(message);
    closed();
  }

  // function changeDistricts(state) {
  //   setSelDistrict("");
  //   axios
  //     .post(API_URL + "get_districts.php", { state_code: state })
  //     .then(function (response) {
  //       setDistricts(() => {
  //         return [...response.data.districts];
  //       });
  //       console.log(response.data.districts);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  useEffect(() => {
  
    setOpen(props.open);
    if (props.open === true) {
      axios
        .post(API_URL + "students/get_students_fields.php", {
          edit_user_id: props.id,
        })
        .then(function (response) {
          if (response.data?.meta?.error === true) {
            setAddUserMessage({
              type: "error",
              message: response.data?.meta?.message,
              icon: "error",
            });
          }
          if (response.data?.meta.error === false) {
            // console.log("response for edit", response);
            setfirst_name(response.data?.data?.first_name ?? "");
            setGender(response.data?.data?.gender ?? "");
            setEmail(response.data?.data?.emailID ?? "");
            setMobile(response.data?.data?.mobile ?? "");
            // setSchool(response.data?.data?.School ?? "");
            // setClass1(response.data?.data?.Class ?? "");
            setStatus(response.data?.data?.status ?? "");

            // setCountry(response.data?.data?.country ?? "");
            setState(response.data?.data?.state ?? "");
            setDistrict(response.data?.data?.district ?? "");
            // setCity(response.data?.data?.City ?? "");
            // setArea(response.data?.data?.Area ?? "");
            setAddress(response.data?.data?.address ?? "");

            setUserId(response.data?.data?.UserId ?? "");
            setlast_name(response.data?.data?.last_name ?? "");
            setmiddle_name(response.data?.data?.middle_name ?? "");
            setdob(response.data?.data?.dob ?? "");
            setGaurdianFirstname(response.data.data.gfirst_name);
            setGaurdianLastname(response.data.data.last_name);
            setGaurdianrelation(response.data.data.grelation);
            setGaurdianMobilenumber(response.data.data.gmobile);
            setFamilymembers(response.data.data.family_members);
            setEducation(response.data.data.edqual);
            setOccupation(response.data.data.occupation);

            // setDateOfBirth(response.data.data.dob);
            setPassingYear(response.data.data.yofpass);
            setPincode(response.data.data.pincode);
            setMaritalStatus(response.data.data.marital_status);
            setCastcategory(response.data.data.caste_category);
            setReligion(response.data.data.religion);
            setAnnual_income(response.data.data.annual_income);
            setHighed_family(response.data.data.highed_family);
            setHighedqual_family(response.data.data.highedqual_family);
            setProf_cwo(response.data.data.prof_cwo);
            setBpl(response.data.data.bpl);
            setDisability(response.data.data.disability);
            setIsPwD(response.data.data.pwd);
            setEdStatus(response.data.data.edstatus);

            setOtherIDno(response.data.data.otherID_number);
            setAadharno(response.data.data.aadhaar_number);

            setLanguages(response.data.data.languages);

            setSource(response.data.data.source);
            setTech_level(response.data.data.tech_level);
            setCourse(response.data.data.course);
            setMode(response.data.data.mode);
            setID(response.data.data.ID);
            setAadharfile(response?.data.data.aadhaar_file ?? "");
            setSscfile(response?.data.data.ssc_file ?? "");
            setEdprooffile(response?.data.data.edproof_file ?? "");
            setIncome_file(response?.data.data.income_file ?? "");
            setPhotofile(response?.data.data.photo_file ?? "");
            setExpfile(response?.data.data.exp_file ?? "");
            setResumefile(response?.data.data.resume_file ?? "");
            setPwdfile(response?.data.data.pwd_file ?? "");
            setOtherIDfile(response?.data.data.otherID_file ?? "");
            setSpecialization(response?.data.data.specialization ?? "");
            setMarkPrecentage(response?.data.data.mark_percentage ?? "");
            setGraduationType(response?.data.data.gradtype ?? "");
            setpostGraduationType(response?.data.data.pgradtype ?? "")
            setCenter(response?.data.data.center_id ?? "")
            // console.log(resume_file)
            // console.log(pwd_file)
            // console.log(response.data.data.resume_file)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    setUserId(props.id);
  }, [props.open, props.id]);
  const [addUserMessage, setAddUserMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });

  function changeDistricts(state) {
    setSelDistrict("");
    axios
      .post(API_URL + "get_districts.php", { state_code: state })
      .then(function (response) {
        setDistricts(() => {
          return [...response.data.districts];
        });
        console.log(response.data.districts);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    axios
      .post(API_URL + "get_states.php", {})
      .then(function (response) {
        setStates(() => {
          return [...response.data.states];
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .post(API_URL + "get_states.php", {})
  //     .then(function (response) {
  //       setStates(() => {
  //         return [...response.data.states];
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);
  

  function submitLocation(e) {
    // const reload=()=>window.location.reload();
    // reload()
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("ID", ID);
    formData.append("first_name", first_name);
    formData.append("gender", gender);
    formData.append("emailID", email);
    formData.append("mobile", mobile);
    formData.append("status", status);
    formData.append("state", state);
    formData.append("district", selDistrict);
    formData.append("address", address);
    formData.append("last_name", last_name);
    formData.append("middle_name", middle_name);
    formData.append("dob", dob);
    formData.append("gfirst_name", gaurdianfirstname);
    formData.append("glast_name", gaurdianlastname);
    formData.append("grelation", gaurdianRelation);
    formData.append("gmobile", gaurdianMobilenumber);
    formData.append("family_members", familyMembers);
    formData.append("edqual", education);
    formData.append("occupation", occupation);
    formData.append("yofpass", yofpass);
    formData.append("pincode", pincode);
    formData.append("marital_status", marital_status);
    formData.append("caste_category", caste_category);
    formData.append("religion", religion);
    formData.append("annual_income", annual_income);
    formData.append("highed_family", highed_family);
    formData.append("highedqual_family", highedqual_family);
    formData.append("prof_cwo", prof_cwo);
    formData.append("bpl", bpl);
    formData.append("disability", disability);
    formData.append("pwd", isPwD);
    formData.append("edstatus", edstatus);
    formData.append("photo_file", photo_file);
    formData.append("exp_file", exp_file);
    formData.append("resume_file", resume_file);
    formData.append("pwd_file", pwd_file);
    formData.append("otherID_number", otherID_number);
    formData.append("edproof_file", edproof_file);
    formData.append("ssc_file", ssc_file);
    formData.append("income_file", income_file);
    formData.append("languages", languages);
    formData.append("aadhaar_file", aadhaar_file);
    formData.append("aadhaar_number", aadhaar_number);
    formData.append("source", source);
    formData.append("tech_level", tech_level);
    formData.append("course", course);
    formData.append("mode", mode);
    formData.append("otherID_file", otherID_file);
    formData.append("otherID",otherID)
    formData.append("specialization",specialization);
    formData.append("mark_percentage",markPrecentage);
    formData.append("gradtype",graduationType);
    formData.append("pgradtype",postgraduationType);
    formData.append("center_id",center)
    
// setTimeout(()=>{
    setregMessage({
      type: "warning",
      message: "Submitting Data. Please Wait...",
      icon: "loading",
    });
    //save registration date, generate regID and password and send to mail
    // if(password===cnfpassword){
      
    axios
      .post(API_URL + "students/edit_student.php", formData, config)
      .then(function (response) {
        if (response?.data?.meta?.error) {
          setregMessage({
            type: "error",
            message: response.data?.meta?.message,
            icon: "error",
          });
        }
        if (!response?.data?.meta?.error) {
          setregMessage({
            type: "success",
            message: response.data?.meta?.message,
            icon: "success",
          });
          closedSuccess(response.data?.meta?.message)
          //  regform.reset();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // },[1000])
      
    // }
    //   else{
    //     setregMessage({
    //       type: "error",
    //       message:"re-enter correct password",
    //       icon: "error",

    //   })
    // }
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
        {/* <Header /> */}
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
              <div className="w-screen max-w-2xl">
                <form
                  className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll"
                  name="regform"
                  method="post"
                  onSubmit={(e) => Update(e)}
                >
                  <div className="flex-1">
                    <div className="px-4 py-6 bg-gray-50 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Edit Student Details
                          </Dialog.Title>
                          <p className="text-sm text-gray-500">
                            Get started by filling in the information below to
                            Edit Student Details.
                          </p>
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
                    {/* Divider container */}
                    <div className="py-6 space-y-6 sm:py-0 sm:space-y-0">
                      {addUserMessage.message ? (
                        <Alert
                          type={addUserMessage.type}
                          message={addUserMessage.message}
                          icon={addUserMessage.icon}
                        />
                      ) : (
                        ""
                      )}
                      {/* Project name */}

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="first_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            First Name
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setfirst_name(e.target.value)}
                            value={first_name}
                            type="text"
                            name="first_name"
                            id="first_name"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="last_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Last Name
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setlast_name(e.target.value)}
                            value={last_name}
                            type="text"
                            name="last_name"
                            id="last_name"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="first_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Middle Name
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setmiddle_name(e.target.value)}
                            value={middle_name}
                            type="text"
                            name="middle_name"
                            id="middle_name"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="status"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                           Status<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setStatus(e.target.value)}
                          required
                          name="status"
                          id="status"
                          value={status}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          {/* <option value="">Select Marital Status</option> */}
                          
                                return (
                                  {/* <option value="">{status}</option> */}
                                  <option value="Accepted">Accepted</option>
                                  <option value="Written Test Completed">Written Test Completed</option>
                                  <option value="Registered">Registered</option>
                                  <option value="Disabled">Disabled</option>
                                  
                                );
                            
                            
                        </select>
                      </div>
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="gender"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Gender<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          required
                          onChange={(e) => setGender(e.target.value)}
                          name="gender"
                          id="gender"
                          value={gender}
                          autoComplete="sex"
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option value="">Select Gender</option>
                          {GenderList
                            ? GenderList.map((gender) => {
                                return <option value={gender}>{gender}</option>;
                              })
                            : ""}
                        </select>
                      </div>
                      </div>

                      {gender == "Male" ? (
                        <>
                          <span className="text-red-500 text-2xl">
                            this Program is for women
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="dob"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Date of Birth<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          required
                          onChange={(e) => calculateAge(e.target.value)}
                          type="date"
                          name="dob"
                          id="dob"
                          value={dob}
                          autoComplete="bday"
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>


                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="age"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Age
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          value={age}
                          disabled
                          required
                          type="number"
                          name="age"
                          id="age"
                          placeholder="Enter Age"
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>


                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="caste_category"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Caste Category<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setCastcategory(e.target.value)}
                          required
                          name="caste_category"
                          id="caste_category"
                          value={caste_category}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option value="">Select Caste Category</option>
                          {CasteCategoryList
                            ? CasteCategoryList.map((caste) => {
                                return <option value={caste}>{caste}</option>;
                              })
                            : ""}
                        </select>
                      </div>
                      </div>


                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="religion"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Religion<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setReligion(e.target.value)}
                          required
                          name="religion"
                          id="religion"
                          value={religion}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option value="">Select Religion</option>
                          {ReligionList
                            ? ReligionList.map((religion) => {
                                return (
                                  <option value={religion}>{religion}</option>
                                );
                              })
                            : ""}
                        </select>
                      </div>
                      </div>


                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="marital_status"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Marital Status<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setMaritalStatus(e.target.value)}
                          required
                          name="marital_status"
                          id="marital_status"
                          value={marital_status}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          {/* <option value="">Select Marital Status</option> */}
                          {MaritalStatusList
                            ? MaritalStatusList.map((mstatus) => {
                                return (
                                  <option value={mstatus}>{mstatus}</option>
                                );
                              })
                            : ""}
                        </select>
                      </div>
                      </div>



                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="occupation"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Occupation<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setOccupation(e.target.value)}
                          required
                          name="occupation"
                          id="occupation"
                          value={occupation}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          {/* <option value="">Select Occupation</option> */}
                          {OccupationList
                            ? OccupationList.map((occupation) => {
                                return (
                                  <option value={occupation}>
                                    {occupation}
                                  </option>
                                );
                              })
                            : ""}
                        </select>
                      </div>
                      </div>
                      {occupation == "Government Employee" ||
                      occupation == "Private Employee" ||
                      occupation == "Retired" ? (
                        <>
                                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                          <div>
                            <label
                              htmlFor="exp_file"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                              Experience certificate
                              <span className="text-red-500">*</span>
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              onChange={(e) => setExpfile(e.target.files[0])}
                              multiple
                              type="file"
                              name="exp_file"
                              id="exp_file"
                              // value={exp_file}
                              accept=".jpg, .jpeg, .png, .pdf"
                              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                              />
                          </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="resume_file"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Upload Resume<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          onChange={(e) => setResumefile(e.target.files[0])}
                          multiple
                          type="file"
                          name="resume_file"
                          id="resume_file"
                          // value={resume_file}
                          accept=".jpg, .jpeg, .png, .pdf"
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="bpl"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Are you belonging to orphan/Semi orphan/BPL?
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setBpl(e.target.value)}
                          required
                          name="bpl"
                          id="bpl"
                          value={bpl}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option value="">Select Answer</option>{" "}
                          {bplList
                            ? bplList.map((bpl) => {
                                return <option value={bpl}>{bpl}</option>;
                              })
                            : ""}
                        </select>
                      </div>
                      </div>


                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="pwd"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Are you physically disabled?
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setIsPwD(e.target.value)}
                          required
                          name="pwd"
                          id="pwd"
                          value={isPwD}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option value="">Select Answer</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      </div>
                      {isPwD == "Yes" ? (
                        <>
                                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                          <div>
                            <label
                              htmlFor="disability"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                              Select Disability
                              <span className="text-red-500">*</span>
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <select
                              onChange={(e) => setDisability(e.target.value)}
                              required
                              name="disability"
                              id="disability"
                              value={disability}
                              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                              >
                              {/* <option value="">Select Disability</option> */}
                              {DisabilityList
                                ? DisabilityList.map((disability) => {
                                    return (
                                      <option value={disability}>
                                        {disability}
                                      </option>
                                    );
                                  })
                                : ""}
                            </select>
                          </div>
                          </div>


                          <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                          <div>
                            <label
                              htmlFor="disability"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                              Select PwD certificate
                              <span className="text-red-500">*</span>
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              onChange={(e) => setPwdfile(e.target.files[0])}
                              multiple
                              type="file"
                              name="pwd_file"
                              id="pwd_file"
                              // value={pwd_file}
                              accept=".jpg, .jpeg, .png, .pdf"
                              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                              />
                          </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}

<div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="languages"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Languages Known
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        {/*<select
                        required
                        name="languages"
                        id="languages"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Known Languages</option>
                        {LanguagesList
                          ? LanguagesList.map((language) => {
                              return (
                                <option value={language}>{language}</option>
                              );
                            })
                          : ""}
                      </select>*/}
                        <Multiselect
                          className="border-0"
                          placeholder="Select Languages"
                          isObject={false}
                          onSelect={(list) => {
                            setLanguages(list.join(", "));
                          }}
                          onRemove={(list, item) => {
                            setLanguages(list.join(", "));
                          }}
                          options={LanguagesList}
                          showCheckbox
                        />
                        <input
                          type="hidden"
                          name="languages"
                          id="languages"
                          value={languages}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"

                        />
                      </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="photo_file"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Upload Photograph
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          multiple
                          type="file"
                          name="photo_file"
                          id="photo_file"
                          onChange={(e) => setPhotofile(e.target.files[0])}
                          // value={myimage}
                          accept=".jpg, .jpeg, .png,"
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>

                      {/* <div>
                      <label
                        htmlFor="password"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Password<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        type="password"
                        pattern=".{8,}"
                        name="password"
                        id="password"
                        onChange={(e)=>{setPassword(e.target.value)}}
                        placeholder="Enter Password"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                      />
                    </div> */}

                      {/* <div>
                      <label
                        htmlFor="cnfpassword"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Confirm password<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        type="password"
                        pattern=".{8,}"
                        name="cnfpassword"
                        id="cnfpassword"
                        onChange={(e)=>{setCnfpassword(e.target.value)}}
                        placeholder="Re-Enter password"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                      />
                    </div> */}

<div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="aadhaar_number"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Aadhaar Number<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          required
                          onChange={(e) => setAadharno(e.target.value)}
                          type="text"
                          pattern="[0-9]{12}"
                          name="aadhaar_number"
                          id="aadhaar_number"
                          value={aadhaar_number}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="aadhaar_file"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Upload Aadhaar Card
                          
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          onChange={(e) => setAadharfile(e.target.files[0])}
                          multiple
                          type="file"
                          name="aadhaar_file"
                          id="aadhaar_file"
                          accept=".jpg, .jpeg, .png, .pdf"
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>


                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="otherID"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Other ID Proof Type
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setOtherID(e.target.value)}
                          name="otherID"
                          id="otherID"
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option value="">Select ID Proof</option>
                          {OtherIDList
                            ? OtherIDList.map((otherID) => {
                                return (
                                  <option value={otherID}>
                                    {otherID}
                                  </option>
                                );
                              })
                            : ""}
                        </select>
                      </div>
                      </div>


                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="otherID_number"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          ID Proof Number
                          <span
                            className={
                              otherID === "" ? "hidden" : "text-red-500"
                            }
                          >
                            *
                          </span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          // required={otherID === "" ? false : true}
                          onChange={(e) => setOtherIDno(e.target.value)}
                          type="text"
                          pattern="[0-9]+"
                          name="otherID_number"
                          id="otherID_number"
                          value={otherID_number}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>


                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="otherID_file"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Upload ID Proof{" "}
                          <span
                            className={
                              otherID === "" ? "hidden" : "text-red-500"
                            }
                          >
                            *
                          </span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          required={otherID === "" ? false : true}
                          multiple
                          onChange={(e) => setOtherIDfile(e.target.files[0])}
                          type="file"
                          name="otherID_file"
                          id="otherID_file"
                          accept=".jpg, .jpeg, .png, .pdf"
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="mobile"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Mobile<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          onChange={(e) => setMobile(e.target.value)}
                          required
                          type="text"
                          pattern="[0-9]{10}"
                          name="mobile"
                          id="mobile"
                          value={mobile}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>


                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="emailID"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Email Address<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          type="email"
                          name="emailID"
                          id="emailID"
                          value={email}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>



                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Address<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <textarea
                          onChange={(e) => setAddress(e.target.value)}
                          required
                          type="text"
                          name="address"
                          id="address"
                          autoComplete="address-level4"
                          value={address}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>


                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          State<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) =>{ changeDistricts(e.target.value);
                          setState(e.target.value)}}
                          name="state"
                          id="state"
                          value={state}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option value="">Select State</option>
                          {states
                            ? states.map((state) => {
                                return (
                                  <option value={state.ID}>{state.name}</option>
                                );
                              })
                            : ""}
                        </select>
                      </div>
                      </div>


                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="district"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          District<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                    
                          name="district"
                          id="district"
                          value={selDistrict}
                          onChange={(e) => setSelDistrict(e.target.value)}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option>Select District</option>
                          {districts
                            ? districts.map((district) => {
                                return (
                                  <option value={district.ID}>
                                    {district.name}
                                  </option>
                                );
                              })
                            : ""}
                        </select>
                      </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="pincode"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          PIN Code<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          onChange={(e) => setPincode(e.target.value)}
                          required
                          type="text"
                          pattern="[0-9]{6}"
                          name="pincode"
                          id="pincode"
                          value={pincode}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="first_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Educational Qualification 
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select
                            onChange={(e) => {
                              setEducation(e.target.value);
                            }}
                            name="education"
                            id="education"
                            value={education}
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                            
                            {EducationList
                              ? EducationList.map((education) => {
                                  return (
                                    <option value={education}>
                                      {education}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                        </div>
                        {/* {edError ? (
                          <span className="text-red-500 text1" id="email_error">
                            Select Your Educational Qualification
                          </span>
                        ) : (
                          ""
                        )} */}
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="first_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Educational Qualification status
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <div class="">
                            <select
                              onChange={(e) => {
                                setEdStatus(e.target.value);
                              }}
                              required
                              name="edStatus"
                              id="edStatus"
                              value={edstatus}
                              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                              >
                              <option value="">
                                Select Qualification Status
                              </option>
                              {EducationStatusList
                                ? EducationStatusList.map((edStatus) => {
                                    return (
                                      <option value={edStatus}>
                                        {edStatus}
                                      </option>
                                    );
                                  })
                                : ""}
                            </select>
                           
                          </div>
                        </div>
                      </div>

                      {education==="Graduation"?
                <>
                                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                <div>
                  <label
                    htmlFor="gradtype"
                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                  >
                    Graduation Type
                    <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <select
                    required
                    onChange={(e) => {
                      setGraduationType(e.target.value);
                    }}
                    name="gradtype"
                    id="gradtype"
                    value={graduationType}
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    >
                    <option value="">Select Graduation Type</option>
                    {GraduationList
                      ? GraduationList.map((graduation) => {
                          return <option value={graduation}>{graduation}</option>;
                        })
                      : ""}
                  </select>
                </div>
                </div>
                </>:""}
                {education==="Post Graduation"?
                <>
                <div>
                  <label
                    htmlFor="pgradtype"
                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                  >
                    Post Graduation Type
                    <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <select
                    required
                    onChange={(e)=>setpostGraduationType(e.target.value)}
                    name="pgradtype"
                    value={postgraduationType}
                    id="pgradtype"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    >
                    <option value="">Select Post Graduation Type</option>
                    {PostGraduationList
                      ? PostGraduationList.map((pgraduation) => {
                          return <option value={pgraduation}>{pgraduation}</option>;
                        })
                      : ""}
                  </select>
                </div>
                </>:""}
                {education!=="Below 10th" && education!=="10th" && education!= ""?
                <>
                                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                <div>
                  <label
                    htmlFor="specialization"
                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                  >
                    Specialization
                    <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <input
                    required
                    onChange={(e)=>setSpecialization(e.target.value)}
                    type="text"
                    name="specialization"
                    id="specialization"
                    value={specialization}
                    placeholder="Eg: Computer Science, Electronics"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                </div>
                </div>
                </>:""}
                {edstatus==="Pass"?
                <>
                                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                <div>
                  <label
                    htmlFor="yofpass"
                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                  >
                    Year of Passing<span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <select
                    required
                    onChange={(e)=>setPassingYear(e.target.value)}
                    name="yofpass" 
                    id="yofpass" 
                    value={yofpass}
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    >
                    <option value="">Select Year of Pass</option>                    
                    {YearList
                      ? YearList.map((year) => {
                          return <option value={year}>{year}</option>;
                        })
                      : ""}
                  </select>
                </div>
                </div>
                <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                <div>
                  <label
                    htmlFor="mark_percentage"
                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                  >
                    Percentage of Marks
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <input
                    required
                    onChange={(e)=>setMarkPrecentage(e.target.value)}
                    type="number"
                    min="1"
                    max="100"
                    name="mark_percentage"
                    id="mark_percentage"
                    value={markPrecentage}
                    placeholder="Enter Percentage of Marks"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                </div> 
                </div>
                <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
             
                <div>
                  <label
                    htmlFor="edproof_file"
                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                  >
                    Upload Marks Memo<span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <input
                  onChange={(e) => setEdprooffile(e.target.files[0])}
                  multiple
                    type="file"
                    name="edproof_file"
                    id="edproof_file"                
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                  {/* <span className="text-gray-700 text-xs italic">Supported Formats: JPG, PNG, PDF</span> */}
                </div>
                </div>
                </>:""}
                     
                     {/* <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="passingYear"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Year of passing
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select
                            onChange={(e) => {
                              setPassingYear(e.target.value);
                            }}
                            name="yofpass"
                            id="yofpass"
                            value={yofpass}
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                            <option value="">Select Passing Year</option>
                            {YearList
                              ? YearList.map((year) => {
                                  return <option value={year}>{year}</option>;
                                })
                              : ""}
                          </select>
                        </div>
                      </div>  */}

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                    
                      


                      <div>
                        <label
                          htmlFor="ssc_file"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Upload SSC Grade Memo
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          multiple
                          onChange={(e) => setSscfile(e.target.files[0])}
                          type="file"
                          name="ssc_file"
                          id="ssc_file"
                          //  value={ssc_file}
                          accept=".jpg, .jpeg, .png, .pdf"
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="gfirst_name"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Gaurdian First Name{" "}
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          onChange={(e) => setGaurdianFirstname(e.target.value)}
                          required
                          type="text"
                          name="gfirst_name"
                          id="gfirst_name"
                          value={gaurdianfirstname}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="glast_name"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Gaurdian Last Name{" "}
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          onChange={(e) => setGaurdianLastname(e.target.value)}
                          required
                          type="text"
                          name="glast_name"
                          id="glast_name"
                          value={gaurdianlastname}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="grelation"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Relationship with Guardian
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setGaurdianrelation(e.target.value)}
                          required
                          name="grelation"
                          id="grelation"
                          value={gaurdianRelation}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          {/* <option value="">Select Relationship</option> */}
                          {GaurdianRelationList
                            ? GaurdianRelationList.map((grel) => {
                                return <option value={grel}>{grel}</option>;
                              })
                            : ""}
                        </select>
                      </div>
                      </div>


                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="gmobile"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Gaurdian Contact Details
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          onChange={(e) =>
                            setGaurdianMobilenumber(e.target.value)
                          }
                          required
                          type="text"
                          pattern="[0-9]{10}"
                          name="gmobile"
                          id="gmobile"
                          value={gaurdianMobilenumber}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>


                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="family_members"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Number of Family Members
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          onChange={(e) => setFamilymembers(e.target.value)}
                          required
                          type="number"
                          min="1"
                          name="family_members"
                          id="family_members"
                          value={familyMembers}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="annual_income"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Annual Income<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setAnnual_income(e.target.value)}
                          required
                          name="annual_income"
                          id="annual_income"
                          value={annual_income}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option value="">Select Annual Income</option>
                          {AnnulaIncomeList
                            ? AnnulaIncomeList.map((ai) => {
                                return <option value={ai}>{ai}</option>;
                              })
                            : ""}
                        </select>
                      </div>
                      </div>


                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">


                      <div>
                        <label
                          htmlFor="income_file"
                          className="font-medium text-gray-700 col-span-1"
                        >
                          Upload Income certificate
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          onChange={(e) => setIncome_file(e.target.files[0])}
                          multiple
                          type="file"
                          name="income_file"
                          id="income_file"
                          // value={income_file}
                          accept=".jpg, .jpeg, .png, .pdf"
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">


                      <div>
                        <label
                          htmlFor="prof_cwo"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Profession of Chief Wage Owner
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          onChange={(e) => setProf_cwo(e.target.value)}
                          required
                          type="text"
                          name="prof_cwo"
                          id="prof_cwo"
                          value={prof_cwo}
                          placeholder="Enter Profession"
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                      </div>
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="highed_family"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Who is the highest educated in the family?
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setHighed_family(e.target.value)}
                          required
                          name="highed_family"
                          id="highed_family"
                          value={highed_family}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option value="">Select Person</option>
                          {HighEducatedFamilyList
                            ? HighEducatedFamilyList.map((hef) => {
                                return <option value={hef}>{hef}</option>;
                              })
                            : ""}
                        </select>
                      </div>
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="highedqual_family"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Highest educated qualification in the family
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setHighedqual_family(e.target.value)}
                          required
                          name="highedqual_family"
                          id="highedqual_family"
                          value={highedqual_family}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option value="">Select Qualification</option>
                          {HighEducationFamilyList
                            ? HighEducationFamilyList.map((hef) => {
                                return <option value={hef}>{hef}</option>;
                              })
                            : ""}
                        </select>
                      </div>
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="source"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          How do you know about this training?
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setSource(e.target.value)}
                          required
                          name="source"
                          id="source"
                          value={source}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option value="">Select Source</option>
                          {SourceList
                            ? SourceList.map((source) => {
                                return <option value={source}>{source}</option>;
                              })
                            : ""}
                        </select>
                      </div>
                      </div>
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="tech_level"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          How do you rate your technical skills?
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setTech_level(e.target.value)}
                          required
                          name="tech_level"
                          id="tech_level"
                          value={tech_level}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option value="">Select Level</option>
                          {TechLevelList
                            ? TechLevelList.map((techlevel) => {
                                return (
                                  <option value={techlevel}>{techlevel}</option>
                                );
                              })
                            : ""}
                        </select>
                      </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

                      <div>
                        <label
                          htmlFor="course"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Select Course<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setCourse(e.target.value)}
                          required
                          name="course"
                          id="course"
                          value={course}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option value="">Select Course</option>
                          {CourseList
                            ? CourseList.map((course) => {
                                return (
                                  <option value={course.code}>
                                    {course.name}
                                  </option>
                                );
                              })
                            : ""}
                        </select>
                      </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">

<div>
  <label
    htmlFor="center"
    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
    >
    Select Center<span className="text-red-500">*</span>
  </label>
</div>
<div className="sm:col-span-2">
  <select
    onChange={(e) => setCenter(e.target.value)}
    required
    name="center"
    id="center"
    value={center}
    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
    >
    <option value="">Select Course</option>
    {Centers
      ? Centers.map((c) => {
          return (
            <option value={c.center_id}>
              {c.address}
            </option>
          );
        })
      : ""}
  </select>
</div>
</div>




                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
 
                      <div>
                        <label
                          htmlFor="mode"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                          Preferred Mode of Training
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <select
                          onChange={(e) => setMode(e.target.value)}
                          name="mode"
                          id="mode"
                          value={mode}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                          <option value="">Select Preferred Mode</option>
                          {ModeList
                            ? ModeList.map((mode) => {
                                return <option value={mode}>{mode}</option>;
                              })
                            : ""}
                        </select>
                      </div>
                      </div>
                      <div className="mt-1 col-span-4">
                        {regMessage.message ? (
                          <Alert
                            type={regMessage.type}
                            message={regMessage.message}
                            icon={regMessage.icon}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                      <div className="space-x-3 flex justify-end">
                        <button
                          type="button"
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => closed()}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          onClick={(e) => submitLocation(e)}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                    {/* </form> */}
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
