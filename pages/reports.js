import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { CheckCircleIcon, DocumentTextIcon } from "@heroicons/react/outline";
// import { isStudentLoggedIn, Logout, StudentData } from "../utils/Student";
// import { BASE_URL } from "../config/constants";
const axios = require("axios");
export default function Expired(props){
    const router = useRouter();    
    const [loading, setLoading] = useState(true);
    const [lmsCode, setLmsCode] = useState("Nir_LMS");
    const[completed,setCompleted]=useState(false)
    function GenerateReport(){
        setLoading(true);
        var axios = require('axios');
        var data = '{"lms_reg_id":"'+props.username+'"}';
    
        var config = {
        method: 'post',
        //url: 'http://13.232.128.222/ws/api/v4/pdfreport.php',
        url: 'https://bestcareer.vidyahelpline.org/ws/api/v4/pdfreport.php',
        headers: { 
            'ClientId': 'vidyahelpline', 
            'ClientSecret': 'A740f553-18f2-4v19-8i71-384e5c54oa89', 
            'Content-Type': 'text/plain'
        },
        data : data
        };
        axios(config)
        .then(function (response) {
            setLoading(false);
            window.open(response.data.pdf_link,'_blank')
        })
        .catch(function (error) {
        console.log(error);
        });
    
    }
    function checkRedirect() {
        var data = '{"registration_id":"' + props.username + '"}';
        var config = {
            method: 'post',
            //url: 'http://13.232.128.222/ws/api/v3/userteststatus.php',
            url: 'https://bestcareer.vidyahelpline.org/ws/api/v3/userteststatus.php',
            headers: {
                'ClientId': 'vidyahelpline',
                'ClientSecret': 'A740f553-18f2-4v19-8i71-384e5c54oa89',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
            //console.log(response);
            if (response.data.data.testStatus != 0){
                setLoading(false);
                setCompleted(true)

            }
               
            // else
            //     router.push(BASE_URL+'registered')
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    useEffect(() => {  
        //console.log(router);
        // if (isStudentLoggedIn() !== true ) {
        //     Logout();
        //     router.push("../");
        // }
        // else{
            checkRedirect();
            // setLmsCode(StudentData().lms_code)
        // }            
    },[]);
    return  completed?(
        <>
            <Head>
            <title>Entrance Exam - Future Ready Youth Skilling Program</title>
            <link rel="icon" href="/favicon.png" />
            </Head>
            <section className="font-serif relative bg-green-50  flex ">            
              <div className="relative z-10 container  m-auto bg-white rounded-3xl">
                {/* <img src="../images/logo.png" className="h-16 mx-auto mb-4" />                */}
                {
                    /*
                  lmsCode==''||lmsCode=='Nir_LMS'?
                  <img src="../images/logo.png" className="h-16 mx-auto mb-4" />:""
                }
                {
                  lmsCode=='Nir_MS_LMS'?
                  <div className="m-4">
                  <div className="flow-root align-middle md:text-base text-xs">
                    <span className="float-left md:ml-10 ml-6">Supported by</span>
                    <span className="float-right">Impact Partner</span>
                  </div>
                  <div className="flow-root align-middle mb-8">
                    <img src="../images/microsoft.png" className="md:h-10 sm:h-8 h-6 mt-1 float-left" />
                    <img src="../images/logo.png" className="md:h-12 sm:h-10 h-8 float-right" />
                  </div>                  
                  </div>:"" */
                }
                {/* <h2 className="mb-2 md:text-5xl text-3xl text-center  font-heading tracking-px-n leading-tight mx-auto">Psychometric Test</h2>
                <h2 className="mb-8 md:text-xl text-base text-center font-heading tracking-px-n leading-tight mx-auto">By Nirmaan Organization</h2> */}
                <CheckCircleIcon className="md:h-16 h-10 text-green-400 mx-auto"/>
                <h2 className="mb-2 text-lg text-center font-heading tracking-px-n leading-tight mx-auto"> completed the psychometric test.</h2>
                <h2 className="mb-8 text-lg text-center font-heading tracking-px-n leading-tight mx-auto underline cursor-pointer" onClick={GenerateReport}>View Report <DocumentTextIcon className="inline md:h-6 h-5 text-red-900 mx-auto cursor-pointer"/></h2>
                {/* <div className="flex align-middle justify-center">
                    <button onClick={() => { Logout(); window.location.href=BASE_URL+'?lms_code='+lmsCode}} className="py-4 px-9 text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200" type="submit">Logout</button>
                </div>                 */}
              </div>
            </section>
        </>
    ):(
        <div className="text-center text-red-600">
            Did Not Completed Psychometric Test
        </div>
    )
    // <div className="flex justify-center items-center h-screen">
    //     <img src="../../images/loading.gif" className="h-36"/>
    // </div>;
}