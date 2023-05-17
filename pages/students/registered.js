import { Fragment, useState, useEffect } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import {
  PlusIcon,
  EyeIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Head from "next/head";
import ViewUserDialog from "../../components/layouts/editStudentStatus";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import Template from "../../components/layouts/admin";
import { isUserLoggedIn, UserData } from "../../utils/User";
import { CourseList } from "../../utils/Data";
import { useRouter } from "next/router";
import UploadExcelDialog from "../../components/layouts/importStudents";
import { PAGINATION_LIMIT } from "../../config/constants";
import Pagination from "../../components/ui/pagination";
import Alert from "../../components/ui/alert";
import ConfirmDialog from "../../components/ui/confirm";
import EditUserDialog from "../../components/layouts/editStudent";

export default function Assets() {
  const [editUser, setEditUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewuser, setViewuser] = useState(false);
  const [editUserId, setEditUserId] = useState();
  const [editUserDetailsstatus, setEditUserDetailsstatus] = useState({});
  const [addedSuccess, setAddedSuccess] = useState();
  const [usersUpdated, setUsersUpdated] = useState(true);
  const [users, setUsers] = useState();
  const [users1, setUsers1] = useState();
  const [searchUserKeyword, setSearchUserKeyword] = useState();
  //const [filterRoles, setFilterRoles] = useState();
  const [filterstatus, setFilterStatus] = useState("");
  //const [filtersLoaded, setFiltersLoaded] = useState(false);
  const router = useRouter();
  //const [uploadExcel, setUploadExcel] = useState(false);
  //const [assets, setAssets] = useState();
  const [filtercourse, setFilterCourse] = useState();
  const [totalRecords, setTotalRecords] = useState();
  const [deleteUser, setDeleteUser] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState();
  const [Centers, setCenters] = useState([]);
  const [filtercenter, setFilterCenter] = useState("");
  const [view, setView] = useState(true);
  const[userRole,setUserRole]=useState()
  const [pagination, setPagination] = useState({
    limit: PAGINATION_LIMIT,
    from: 0,
    to: PAGINATION_LIMIT,
  });
  useEffect(() => {
    if (isUserLoggedIn() === true) {
      // console.log("User logged in",UserData())
      UserData().then(user => {setUserRole(user.user_type)})
      
    }
  },[])
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

  useEffect(() => {
    UserData().then((userData) => {
      if (userData.center_id) {
        setView(false);
        setFilterCenter(userData.center_id);
      }
    },[]);
    
  // const[admincenterid,setAdmincenterid] = useState(0)
 

    axios
      .post(API_URL + "students/get_students.php", {
        limit: pagination.limit,
        from: pagination.from,
        to: pagination.to,
        keyword: searchUserKeyword,
        status: filterstatus,
        course: filtercourse,
        center: filtercenter,
      })
      .then(function (response) {
        setUsers1(response.data?.data);
        if (response.data?.data) {
          setTotalRecords(response.data?.total);

          //setAssets(response.data?.data);
        } else {
          //setAssets("");
        }
      });
    if (isUserLoggedIn() === false) {
      router.push("/");
    }
    if(userRole=="contentwriter"){
      router.push("/admin")
    }
    //filtersLoad();
  }, [
    searchUserKeyword,
    usersUpdated,
    filterstatus,
    pagination,
    filtercourse,
    filtercenter,
    editUser,
    userRole
  ]);

  // edit user button trigger
  function handleViewuser(sdata) {
    setViewuser(true);
    setEditUserDetailsstatus(() => {
      return Object.assign({}, sdata);
    });
  }
  function handleEditUser(id) {
    setEditUser(true);
    setEditUserId(id);
  }

  const handleDownload = async () => {
    setIsLoading(true);
    const response = await fetch(API_URL + "/students/download_excel.php", {
      method: "POST",
      body: JSON.stringify({
        center: filtercenter,
        // add any parameters needed for the PHP script
      }),
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setIsLoading(false);
  };

  function handleDeleteUser(id) {
    setDeleteUser(true);
    setDeleteUserId(id);
  }
  function deleteUserFunc(id) {
    setDeleteUser(false);
    axios
      .post(API_URL + "students/delete_student.php", {
        id: id,
      })
      .then(function (response) {
        if (response.data?.meta?.error) {
          // notifyOpen(response.data?.meta?.message);
        }
        if (!response.data?.meta?.error) {
          // notifyOpen(response.data?.meta?.message);
          setUsersUpdated(new Date().getTime());
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* function notifyOpen(message) {
    setAddedSuccess(message);
    setShowNotification(true);
  } */
  // console.log("editID", editUserId);
  return (
    <Template page="Students">
      <div className=" overflow-auto">
        <Head>
          <title>Students</title>
          <link rel="icon" href="/nirmaan_logo.png" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <main>
          <div className="min-h-screen bg-gray-100 w-full">
            {/* <Header /> */}
            <main className="py-10">
              <div className="max-w-7xl mx-auto px-2 sm:px-4">
                <div className="flex flex-col mb-0 lg:mb-5 justify-center lg:flex-row lg:justify-between ">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Students
                    </h1>
                  </div>

                  <div className="max-w-3xl mx-auto mb-5 px-0  md:flex  lg:mb-0 ">
                    <div className=" flex flex-col-reverse  space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-start sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row">
                      <div className="relative lg:mr-2">
                        <select
                          onChange={(e) => setFilterStatus(e.target.value)}
                          value={filterstatus}
                          id="role"
                          name="role"
                          className="block w-full md:w-40 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        >
                          <option value="">Select Status</option>
                          <option value="Registered">Registered</option>
                          <option value="Written Test Completed">
                            Written Test Completed
                          </option>
                          <option value="Not Attended Written Test">
                            Not Attended Written Test
                          </option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                          <option value="on Hold">on Hold</option>
                        </select>
                      </div>
                      <div className="relative lg:mr-2">
                        <select
                          onChange={(e) => setFilterCourse(e.target.value)}
                          value={filtercourse}
                          id="role"
                          name="role"
                          className="block w-full shadow-sm md:w-40 sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        >
                          <option value="">Select Course</option>
                          <option value="WAD">
                            Web Application Development
                          </option>
                          {/* <option value="SS">Soft Skills</option> */}
                          <option value="ITES">
                            Information Technology Enabled Services
                          </option>
                        </select>
                      </div>
                      {view ? (
                        <div className="relative lg:mr-2">
                          <select
                            onChange={(e) => setFilterCenter(e.target.value)}
                            value={filtercenter}
                            id="role"
                            name="role"
                            className="block w-full shadow-sm md:w-40 sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                            <option>Select Center</option>

                            {Centers
                              ? Centers.map((c) => {
                                  return (
                                    <option value={c.center_id}>
                                      {c.center_shortadd}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                        </div>
                      ) : (
                        ""
                      )}
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative ">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SearchIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search"
                          onChange={(e) => setSearchUserKeyword(e.target.value)}
                          name="search"
                          className="block w-full md:w-56 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                          placeholder="Enter Students name"
                          type="search"
                        />
                      </div>
                      <div className="relative lg:mr-2">
                        <div>
                          <button
                            className="block text-center w-20 h-10  border border-gray-300 rounded-md  bg-green-400 shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                            onClick={handleDownload}
                            disabled={isLoading}
                          >
                            {isLoading
                              ? "Downloading..."
                              : "Excel data"}
                          </button>
                        </div>
                      </div>
                      {/*
                      <div className="max-w-3xl mx-auto mb-5 px-0 sm:px-0 md:flex md:items-center md:justify-between md:space-x-5 lg:mb-0 lg:max-w-7xl lg:px-0">
                        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-start sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                          <button
                            type="button"
                            onClick={() => setUploadExcel(true)}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                            Bulk Upload
                          </button>
                        </div>
                      </div>*/}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                <span className="md:table-cell hidden">
                                  Full Name & <br />
                                  Registration ID
                                </span>{" "}
                                <span className="md:hidden"> Data</span>
                              </th>

                              <th
                                scope="col"
                                className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Mobile Number & <br />
                                Email ID
                              </th>
                              <th
                                scope="col"
                                className=" hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Course
                              </th>
                              <th
                                scope="col"
                                className=" hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Registration Date
                              </th>
                              <th
                                scope="col"
                                className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {users1 ? (
                              users1.map((person) => (
                                <tr key={person?.ID}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className=" space-y-2 md:space-y-0">
                                        <div className="flex">
                                          <span className="md:hidden text-sm text-gray-900 font-medium">
                                            Full Name :
                                          </span>
                                          <div className="text-sm text-gray-900 ml-1">
                                            {person?.first_name +
                                              " " +
                                              // person?.middle_name +
                                              // " " +
                                              person?.last_name}
                                          </div>
                                        </div>
                                        <div className="flex">
                                          <span className="md:hidden text-sm text-gray-900 font-medium">
                                            Registration ID :
                                          </span>
                                          <div className="text-sm text-gray-900 ml-1">
                                            {person?.regID}
                                          </div>
                                        </div>
                                        <div className="flex">
                                          <span className="md:hidden text-sm text-gray-900 font-medium">
                                            Email ID :
                                          </span>
                                          <div className="md:hidden text-sm text-gray-900 ml-1">
                                            {person?.emailID}
                                          </div>
                                        </div>
                                        <div className="flex">
                                          <span className="md:hidden text-sm text-gray-900 font-medium">
                                            Mobile Number :
                                          </span>
                                          <div className="md:hidden text-sm text-gray-900 ml-1">
                                            {person?.mobile}
                                          </div>
                                        </div>
                                        <div className="flex ">
                                          <span className="md:hidden text-sm text-gray-900 font-medium">
                                            Course :
                                          </span>
                                          <div className="md:hidden text-sm  text-gray-900 ml-1">
                                            {CourseList.map((course) => {
                                              return course.code ==
                                                person.course
                                                ? course.name
                                                : "";
                                            })}
                                          </div>
                                        </div>
                                        <div className="flex ">
                                          <span className="md:hidden text-sm text-gray-900 font-medium">
                                            Status :
                                          </span>
                                          <div className="md:hidden text-sm  text-gray-900 ml-1">
                                            <span className="rounded-lg px-1">
                                              {person?.status}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="flex md:hidden">
                                          <span className="md:hidden text-sm text-gray-900 font-medium">
                                            Actions :
                                          </span>
                                          <div className="md:hidden text-sm  text-gray-900 ml-1">
                                            <span className="rounded-lg px-1">
                                              <a
                                                onClick={() =>
                                                  handleViewuser(person)
                                                }
                                                className="text-indigo-600 hover:text-indigo-900 cursor-pointer p-2"
                                              >
                                                <EyeIcon className="w-4 h-4 inline-block" />
                                              </a>
                                              |
                                              <a
                                                onClick={() =>
                                                  handleEditUser(person?.ID)
                                                }
                                                className="text-indigo-600 hover:text-indigo-900 cursor-pointer p-2"
                                              >
                                                <PencilAltIcon className="w-4 h-4 inline-block" />
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                    <div>{person?.mobile}</div>
                                    <div>{person?.emailID}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                    {CourseList.map((course) => {
                                      return course.code == person.course
                                        ? course.name
                                        : "";
                                    })}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                    {person?.status}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                    {person?.enroll_date}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <a
                                      onClick={() => handleViewuser(person)}
                                      className="text-indigo-600 hover:text-indigo-900 cursor-pointer p-2"
                                    >
                                      <EyeIcon className="w-4 h-4 inline-block" />
                                    </a>
                                    |
                                    <a
                                      onClick={() => handleEditUser(person?.ID)}
                                      className="text-indigo-600 hover:text-indigo-900 cursor-pointer p-2"
                                    >
                                      <PencilAltIcon className="w-4 h-4 inline-block" />
                                    </a>
                                    {/* | */}
                                    {/* <a
                                      onClick={() =>
                                        handleDeleteUser(person?.ID)
                                      }
                                      className="text-red-600 hover:text-red-900 cursor-pointer p-2"
                                    >
                                      <TrashIcon className="w-4 h-4 inline-block" />
                                    </a> */}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan="6"
                                  className="text-center py-4 w-full"
                                >
                                  No records found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        {totalRecords ? (
                          <Pagination
                            total={totalRecords}
                            pagination={pagination}
                            pageChanged={(page) => setPagination(page)}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </main>
        {/*<UploadExcelDialog
          open={uploadExcel}
          onChangeOpen={() => setUploadExcel(false)}
          excelUploaded={(e) => setStudentsUpdated(e)}
          successMessage={(e) => notifyOpen(e)}
        />  */}
        <ViewUserDialog
          data={editUserDetailsstatus}
          open={viewuser}
          onChangeOpen={() => setViewuser(false)}
          userUpdated={(e) => setUsersUpdated(e)}
          successMessage={(e) => setAddedSuccess(e)}
        />
        <EditUserDialog
          id={editUserId}
          open={editUser}
          onChangeOpen={() => setEditUser(false)}
          userUpdated={(e) => setUsersUpdated(e)}
          successMessage={(e) => setAddedSuccess(e)}
        />

        <ConfirmDialog
          id={deleteUserId}
          message="You want to delete the user"
          open={deleteUser}
          onClosed={() => setDeleteUser(false)}
          onConfirmed={() => deleteUserFunc(deleteUserId)}
        />
      </div>
    </Template>
  );
}
