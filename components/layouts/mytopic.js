import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  LinkIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
import Alert from "../ui/alert";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { statesData } from "../../utils/Data";

export default function AddLocationDialog(props) {
  // console.log("props",props)
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [myimage, setMyImage] = useState("");

  const [userdata,setUserData]=useState();
  const [addLocationMessage, setAddLocationMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });

  useEffect(() => {
    setOpen(props.open);





    axios.post(API_URL + "topicfeedback/displaytopicfeedback.php",{
      id:props.id,
      
      
          }).then(function(response) {
      
      
      console.log("mytopic",response.data?.data)
      setUserData(response.data?.data)
      
      })
      






  }, [props.open]);
  function closed() {
    setOpen(false);
    props.onChangeOpen();
    setAddLocationMessage("");
    setLevel("");
    setTitle("");
    setDescription("");
    setStatus("");
    // setState("");
  }
  function closedSuccess(message) {
    props.successMessage(message);
    closed();
  }

  function submitLocation(e) {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();

    formData.append("file", myimage);
    formData.append("level", level);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    // if (level.trim() === "") {
    //   setAddLocationMessage({ type: "error", message: "Please enter location name", icon: "error" });
    // } else {
    axios
      .post(API_URL + "module/add_modules.php", formData, config)
      .then(function (response) {
        if (response.data.meta.error) {
          setAddLocationMessage({
            type: "error",
            message: response.data?.meta?.message,
            icon: "error",
          });
        }
        if (!response.data.meta.error) {
          setAddLocationMessage({
            type: "success",
            message: response.data?.meta?.message,
            icon: "loading",
          });
          props.locationAdded(response.data?.id);
          closedSuccess(response.data?.meta?.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
                <form className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="px-4 py-6 bg-gray-50 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            topic feedback
                          </Dialog.Title>
                          <p className="text-sm text-gray-500">
                           below you can see the feedback and suggestion given by students for the particular topic.
                           
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




<div>
  <div class="bg-gray-200 rounded-lg p-4 flex justify-around items-center text-gray-700 hover:text-gray-700  active:bg-white m-5">
  <p>No of Yes:{props.yes}</p>
  <p>No of No:{props.no}</p>
  </div>
  
  {userdata ? (

userdata.map((data) => (





  <div key={data.ID} class=" py-1 px-6 mb-1  mt-1 ">




  <a class="bg-gray-200 rounded-lg p-4 flex justify-between items-center text-gray-700 hover:text-gray-700  active:bg-white">
    <div class="flex items-center space-x-4">
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="User Avatar" class="inline-block w-10 h-10 rounded-full" />
      <div>
        <p class="font-semibold text-sm">
        {data.StudentId}
        </p>
        <p class="font-medium text-sm text-gray-500">
        {data.Feedback}
        </p>
       
        <p class="font-medium text-sm text-gray-500 pt-2">Date :<span className="font-bold">{data.CreatedAt}</span> </p>
      </div>
    </div>
   
  </a>





  {/* <div class="flex items-center space-x-4 bg-gray-200 p-5 ">
      <img src="https://source.unsplash.com/iFgRcqHznqg/160x160" alt="User Avatar" class="inline-block w-10 h-10 rounded-full" />
      <div>
        <p class="font-semibold text-sm">
       
        </p>
        <p class="font-medium text-sm text-gray-500">
       
        </p>
      </div>
      <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="opacity-50 hi-solid hi-chevron-right inline-block w-5 h-5"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
    </div>
     */}
   


{/* <p class=" text-xl font-semibold">{data.FullName}</p>
<div>{data.Feedback}</div> */}

</div>
))):""}
</div>






                   
                  </div>

                  {/* Action buttons */}
                  {/* <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
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
                        Create
                      </button>
                    </div>
                  </div> */}
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
