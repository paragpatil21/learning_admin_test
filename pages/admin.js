import { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
const axios = require("axios");
import { API_URL } from "../config/constants";
import Template from "../components/layouts/admin";
import { managementStatusData } from "../utils/Data";
import SimpleSelect from "../components/ui/select";
import { isUserLoggedIn, UserData } from "../utils/User";
import { useRouter } from "next/router";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Assets({ locations, initialData }) {
  const [filterLocations, setFilterLocations] = useState();
  const [filterLocation, setFilterLocation] = useState();
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [statusLabels, setStatusLabels] = useState();
  const [data, setData] = useState();
  const [telangana, setTelangana] = useState();
  const [karnataka, setKarnataka] = useState();
  const [tamilnadu, setTamilnadu] = useState();
  const[centerStudent,setCenterStudent]=useState([])
  const [others, setOthers] = useState();
  const router = useRouter();
  const [parag,setParag] = useState("");

  const module_colors = {
    1: {
      text: "text-red-400",
      background: "bg-red-100",
      border: "border-red-500",
    },
    2: {
      text: "text-blue-500",
      background: "bg-blue-100",
      border: "border-blue-600",
    },
    3: {
      text: "text-yellow-500",
      background: "bg-yellow-100",
      border: "border-yellow-600",
    },
    4: {
      text: "text-green-500",
      background: "bg-green-100",
      border: "border-green-600",
    },
    5: {
      text: "text-purple-500",
      background: "bg-purple-100",
      border: "border-purple-600",
    },
  };

  const module_colors2 = {
    6: {
      text: "text-red-400",
      background: "bg-red-100",
      border: "border-red-500",
    },
    7: {
      text: "text-blue-500",
      background: "bg-blue-100",
      border: "border-blue-600",
    },
    8: {
      text: "text-yellow-500",
      background: "bg-yellow-100",
      border: "border-yellow-600",
    },
    9: {
      text: "text-green-500",
      background: "bg-green-100",
      border: "border-green-600",
    },
    10: {
      text: "text-purple-500",
      background: "bg-purple-100",
      border: "border-purple-600",
    },
  };
  const labels1=[]
  const data2=[]
  // console.log(centerStudent)
  centerStudent.map((e)=> {
    labels1.push(e.center_shortadd)
    data2.push(e.student_count)

  })
  const state2 = {

   labels:labels1,
    // labels: ["1", "Karnataka", "Tamilnadu", "Others"],
    datasets: [
      {
        label: "Students",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
        data:data2
      },
    ],
  };

 

   

  

  const [regstudents, setRegStudents] = useState();
  const [joinstudents, setJoinStudents] = useState();

  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  {/*const data1 = {
    labels: [
      "No of Female Students",
      "No of Male Students",
      "No of LGBTQ+ Students"
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [ female, male, lgbtq],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };*/}

  useEffect(() => {
    if (isUserLoggedIn() === false || UserData.RoleId === 1) {
      router.push("/");
    }
    axios.post(API_URL + "dashboard/dashboard.php").then(function (response) {
      // console.log("dashboard",response)
      setRegStudents(response.data?.total_regstudents);
      setJoinStudents(response.data?.total_joinstudents);
      setCenterStudent(response.data?.centers)
      //setFemale(response.data?.total_female);
      //setLgbtq(response.data?.total_lgbtq);
      // setTelangana(response.data?.telangana);
      // setKarnataka(response.data?.karnataka);
      // setTamilnadu(response.data?.tamilnadu);
      // setOthers(response.data?.others);
    });
  }, []); 

  return (
    <Template page="Home">
      <div className="overflow-auto h-screen bg-white md:p-5 p-1 md:px-40">
        <Head>
          <title>Learning Portal Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <main>
          <div className="text-center text-3xl uppercase mb-4 text-gray-500 font1">
            Admin Dashboard
          </div>

          <div className="grid md:grid-cols-2  border-2 mb-10 rounded-lg border-gray-200 shadow-md pb-7 md:mt-16 bg-gray-50">
            <div className="md:col-span-2 text-2xl p-3 text-gray-500 border-b-2 md:px-11 font1 mt-2">
              STUDENTS DATA
            </div>

            {/*<div className="flex justify-center pt-9 w-full md:border-r-2">
              <div className="">
                <div className="text-center text-2xl text-gray-500 font1">
                  Overall Students Data
                </div>
                <div className="w-96 h-96">
                  <Pie data={data1} />
                </div>
              </div>
            </div>*/}

            <div
              data-aos="fade-up"
              className="grid grid-cols-2 col-span-2 md:grid-cols-2 gap-4 lg:gap-8 pt-20 px-5 md:px-0 md:ml-10 md:mr-10"
            >
              <div className="flex flex-col rounded shadow-sm bg-green-100 overflow-hidden border border-green-500 h-40">
                <div className="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt className="text-2xl font-semibold">{regstudents}</dt>
                    <dd className="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-green-400 font1">
                        {" "}
                        Total Number of Registered Students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="flex flex-col rounded shadow-sm bg-pink-100 overflow-hidden border border-pink-500 h-40">
                <div className="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt className="text-2xl font-semibold">{joinstudents}</dt>
                    <dd className="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-pink-400 font1">
                        Total Number of Enrolled Students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>



          <div className="grid md:grid-cols-1  border-2 mb-10 rounded-lg border-gray-200 shadow-md pb-7 bg-gray-50">
            <div className="md:col-span-1 text-2xl p-3 text-gray-500 border-b-2 md:px-11 font1  mt-2">
              CENTER WISE DATA
            </div>

            <div className="flex justify-center pt-9 w-full md:border-r-2">
              <div className="bg-gray-50 w-full" >
                <div className="text-center text-2xl pb-4 text-gray-500 font1">
                  Overall Center Wise Data
                </div>
                <div className="w-3/4 m-auto">
                  <Bar
                    data={state2}
                    options={{
                      title: {
                        display: true,
                        text: "Center Wise data",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </div>
            </div>

             {/* <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 md:pt-20 pt-52 px-5 md:px-0 md:ml-10 md:mr-10">
              <div class="flex flex-col rounded shadow-sm bg-red-100 overflow-hidden border border-red-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{telangana}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-red-400 font1">telangana</span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-blue-100 overflow-hidden border border-blue-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{karnataka}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-blue-400 font1">karnataka</span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-yellow-100 overflow-hidden border border-yellow-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{tamilnadu}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-yellow-400 font1">tamilnadu</span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-green-100 overflow-hidden border border-green-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{others}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-green-400 font1">others</span>
                    </dd>
                  </dl>
                </div>
              </div>

               <div class="flex flex-col rounded shadow-sm bg-purple-100 overflow-hidden border border-purple-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{module5pass}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-purple-400 font1">greater than 80%</span>
                    </dd>
                  </dl>
                </div>
              </div> 
            </div> */}

                          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 md:pt-20 pt-52 px-5 md:px-0 md:ml-10 md:mr-10">


           {centerStudent?.map((e)=>{
            return(
              <>
              <div class="flex flex-col rounded shadow-sm bg-red-100 overflow-hidden border border-red-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{e.student_count}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-red-400 font1">{e.center_shortadd}</span>
                    </dd>
                  </dl>
                </div>
              </div>


              </>
            )

           }) 
          }
          </div>
          </div>
        </main>
      </div>
    </Template>
  );
}
