import { useState, useEffect } from "react";
import { SearchIcon, PencilAltIcon } from "@heroicons/react/solid";
import { TrashIcon, PlusIcon } from "@heroicons/react/outline";
import Head from "next/head";
import AddLocationDialog from "../../components/layouts/createCenter";
import EditLocationDialog from "../../components/layouts/editCenter";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import Template from "../../components/layouts/admin";
import { statesData } from "../../utils/Data";
import { isUserLoggedIn, UserData } from "../../utils/User";
import { useRouter } from "next/router";
import SimpleSelect from "../../components/ui/select";
import Pagination from "../../components/ui/pagination";
import { PAGINATION_LIMIT } from "../../config/constants";
import ConfirmDialog from "../../components/ui/confirm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Locations() {
  const [addLocation, setAddLocation] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editLocationId, setEditLocationId] = useState();
  const [deleteLocation, setDeleteLocation] = useState(false);
  const [deleteLocationId, setDeleteLocationId] = useState();
  const [addedSuccess, setAddedSuccess] = useState();
  const [locationsUpdated, setLocationsUpdated] = useState(true);
  const [locations, setLocations] = useState();
  const [searchLocationKeyword, setSearchLocationKeyword] = useState();
  const [listLocationsMessage, setListLocationsMessage] = useState();
  const [selectedFilters, setSelectedFilters] = useState();
  const [filterStates, setFilterStates] = useState();
  const [filterstate, setFilterState] = useState();
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const router = useRouter();

  const [assets, setAssets] = useState();
  // const [totalRecords, setTotalRecords] = useState();
  // const [pagination, setPagination] = useState({
  //   limit: PAGINATION_LIMIT,
  //   from: 0,
  //   to: PAGINATION_LIMIT,
  // });

  const status_colors = {
    Active: { text: "text-white", background: "bg-green-600" },
    Disabled: { text: "text-white", background: "bg-red-600" },
    Pending: { text: "text-white", background: "bg-yellow-600" },
  };

  const [centers, setCenters] = useState([]);

  const [totalRecords, setTotalRecords] = useState();
  const [pagination, setPagination] = useState({
    limit: PAGINATION_LIMIT,
    from: 0,
    to: PAGINATION_LIMIT,
  });

  // const fetch_filters = () =>
  //   axios
  //     .post(API_URL + "module/location_filters.php")
  //     .then(function (response) {
  //       if (response.data) {
  //         let states = [];
  //         states.push({ id: 0, name: "State - All" });
  //         response.data.states.forEach((option) => {
  //           states.push({ id: option.State, name: statesData[option.State] });
  //         });
  //         setFilterStates(states);
  //         setFiltersLoaded(true);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  useEffect(() => {
    axios
      .post(API_URL + "centers/get_centers.php", {
        //  limit: pagination.limit,
        // from: pagination.from,
        // to: pagination.to,
        // keyword: searchLocationKeyword,
        // state: filterstate,
      })
      .then(function (response) {
        // console.log(response);
        setCenters(response.data?.centers);

        // return;
        if (response.data?.centers) {
          setTotalRecords(response.data?.total);
          setAssets(response.data?.data);
        } else {
          setAssets("");
        }
      });

    if (isUserLoggedIn() === false) {
      router.push("/");
    }
    filtersLoad();
  }, [searchLocationKeyword, locationsUpdated, filterstate, pagination]);

  const filtersLoad = () => {
    if (filtersLoaded === false) {
      // fetch_filters();
    }
  };

  // edit location button trigger
  function handleEditLocation(id) {
    setEditLocation(true);
    setEditLocationId(id);
  }

  // search
  function search(keyword) {
    setSearchLocationKeyword(keyword);
    setLocationsUpdated(keyword);
  }

  // delete asset button trigger
  function handleDeleteLocation(id) {
    setDeleteLocation(true);
    setDeleteLocationId(id);
  }

  // delete asset trigger
  function deleteLocationFunc(id) {
    setDeleteLocation(false);
    axios
      .post(API_URL + "centers/delete_center.php", {
        center_id: id,
      })
      .then(function (response) {
        if (response.data?.meta?.error) {
          // notifyOpen(response.data?.meta?.message);
        }
        if (!response.data?.meta?.error) {
          // notifyOpen(response.data?.meta?.message);
          setLocationsUpdated(new Date().getTime());
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Template page="Modules">
      <div className="overflow-auto">
        <Head>
          <title>Centers</title>
          <link rel="icon" href="/nirmaan_logo.png" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <main>
          <div className="min-h-screen bg-gray-100">
            <main className="py-10 m-6">
              <div className="mx-auto  sm:px-4 lg:px-0">
                <div className="mb-0 lg:mb-5 flex flex-col justify-center lg:flex-row lg:justify-between lg:space-x-5">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 text-center">
                      Centers
                    </h1>
                  </div>
                  <div className="max-w-3xl mx-auto mb-5 px-0 sm:px-0 md:flex md:items-center md:justify-between md:space-x-5 lg:mb-0 lg:max-w-7xl lg:px-0">
                    <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-start sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                      {/* <div className="relative lg:mr-2"> */}
                      {/* <select
                          onChange={(e) => setFilterState(e.target.value)}
                          value={filterstate}
                          id="role"
                          name="role"
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        >
                          <option>Select Status</option>

                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Disabled">Disabled</option>
                        </select> */}

                      {/* <div className="mt-2 lg:mt-0 ml-0 lg:ml-3 w-full lg:mr-2">{filterStates ? <SimpleSelect options={filterStates} selected={0} changeOption={(option) => setFilterState(option)} /> : ""}</div> */}
                      {/* </div> */}
                      {/* <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SearchIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search"
                          onChange={(e) =>
                            setSearchLocationKeyword(e.target.value)
                          }
                          name="search"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                          placeholder="Enter Level ,Title"
                          type="search"
                        />
                      </div> */}
                      <button
                        type="button"
                        onClick={() => setAddLocation(true)}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                      >
                        <PlusIcon className="w-4 h-4 inline-block mr-1" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 ">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow  border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y-8 divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="hidden md:table-cell px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Donor Name  and Location Of center
                              </th>
                            
                              <th
                                scope="col"
                                className="hidden md:table-cell px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Center Manager Detail
                              </th>
                             
                             
                              <th
                                scope="col"
                                className=" hidden md:table-cell px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y-8 divide-gray-200">
                            {centers ? (
                              centers.map((person) => (
                                <tr key={person?.center_id}>
                                  <td className="m-4 box-border py-4 md:hidden">
                                    <div className="flex">
                                      <div className=" space-y-2 md:space-y-0 p-3">
                                        <div className="flex">
                                        <span class="text-sm  font-medium md:hidden">
                                            Donor:
                                          </span>
                                          <div className="text-sm  text-gray-900  ml-1 md:hidden ">
                                            {person?.donor}
                                          </div>
                                        </div>
                                        <div className="flex">
                                        <span class="text-sm  font-medium md:hidden">
                                            Address:
                                          </span>
                                          <div className="text-sm  text-gray-900  ml-1 md:hidden ">
                                            {person?.address}
                                          </div>
                                        </div>

                                        <div className="flex">
                                        <span class="text-sm  font-medium md:hidden">
                                            Center Manager:
                                          </span>
                                          
                                          <div className="text-sm  text-gray-900  ml-1 md:hidden ">
                                            {person?.center_manager}
                                          </div>
                                        </div>

                                        <div className="flex">
                                        <span class="text-sm  font-medium md:hidden">
                                            Designation:
                                          </span>
                                          <div className="text-sm  text-gray-900  ml-1 md:hidden ">
                                            {person?.designation}
                                          </div>
                                        </div>

                                        <div className="flex">
                                        <span class="text-sm  font-medium md:hidden">
                                            Contact Number:
                                          </span>
                                          <div className="text-sm  text-gray-900 md:hidden ml-1 ">
                                            <span>
                                              {person?.contact_number}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="flex">
                                        <span class="text-sm  font-medium md:hidden">
                                            Mail Id:
                                          </span>
                                          <div className="text-sm  text-gray-900 md:hidden ml-1 ">
                                            <span>{person?.mail_id}</span>
                                          </div>
                                        </div>

                                        <div className="md:hidden ">
                                          <a
                                            onClick={() =>
                                              handleEditLocation(
                                                person?.center_id
                                              )
                                            }
                                            className="text-indigo-600 hover:text-indigo-900 cursor-pointer p-2"
                                          >
                                            <PencilAltIcon className="w-4 h-4 inline-block" />
                                          </a>
                                          |
                                          <a
                                            onClick={() =>
                                              handleDeleteLocation(
                                                person?.center_id
                                              )
                                            }
                                            className="text-red-600 hover:text-red-900 cursor-pointer p-2"
                                          >
                                            <TrashIcon className="w-4 h-4 inline-block" />
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                 
                                 
                                  <td className="  px-6 py-4  hidden md:table-cell">
                                    <div className="text-sm text-gray-900">
                                      {person?.donor}
                                    </div>
                                    <div className="text-sm text-gray-900 break-all">
                                      {person?.address}
                                    </div>
                                  </td>
                                  {/* <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-sm text-gray-900">
                                      {person?.address}
                                    </div>
                                  </td> */}
                                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-md text-gray-900">
                                      <span>{person?.center_manager}</span>
                                    </div>
                                    <div className="text-sm text-gray-900">
                                      <span>{person?.designation}</span>
                                    </div>
                                    <div className="text-sm text-gray-900">
                                      <span>{person?.contact_number}</span>
                                    </div>
                                    <div className="text-sm text-gray-900">
                                      <span>{person?.mail_id}</span>
                                    </div>
                                  </td>
                                  {/* <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-sm text-gray-900">
                                      <span>{person?.designation}</span>
                                    </div>
                                  </td> */}
                                  {/* <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-sm text-gray-900">
                                      <span>{person?.contact_number}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-sm text-gray-900">
                                      <span>{person?.mail_id}</span>
                                    </div>
                                  </td> */}

                                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <a
                                      onClick={() =>
                                        handleEditLocation(person?.center_id)
                                      }
                                      className="text-indigo-600 hover:text-indigo-900 cursor-pointer p-2"
                                    >
                                      <PencilAltIcon className="w-4 h-4 inline-block" />
                                    </a>
                                    |
                                    <a
                                      onClick={() =>
                                        handleDeleteLocation(person?.center_id)
                                      }
                                      className="text-red-600 hover:text-red-900 cursor-pointer p-2"
                                    >
                                      <TrashIcon className="w-4 h-4 inline-block" />
                                    </a>
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
        <AddLocationDialog
          open={addLocation}
          onChangeOpen={() => setAddLocation(false)}
          locationAdded={(e) => setLocationsUpdated(e)}
          successMessage={(e) => setAddedSuccess(e)}
        />
        <EditLocationDialog
          id={editLocationId}
          open={editLocation}
          onChangeOpen={() => setEditLocation(false)}
          locationUpdated={(e) => setLocationsUpdated(e)}
          successMessage={(e) => setAddedSuccess(e)}
        />
        <ConfirmDialog
          id={deleteLocationId}
          message="You want to delete the location, all assets will be deleted in this location"
          open={deleteLocation}
          onClosed={() => setDeleteLocation(false)}
          onConfirmed={() => deleteLocationFunc(deleteLocationId)}
        />
      </div>
    </Template>
  );
}
