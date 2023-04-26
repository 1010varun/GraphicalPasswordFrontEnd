import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./components/Modal";


const Login = ({ toastFunction }) => {
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("");
  const [showModal, setShowModal] = useState(false);
    const [links, setLinks] = useState([]);
  const [id, setId] = useState([]);
  const [allId, setAllId] = useState([]);

    const fetchImageLinks = async () => {
        console.log("inside fetch link", allId);
      for (let i = 0; i < allId.length; i++) {
        let url = `https://api.unsplash.com/photos/${allId[i]}?client_id=CsSfWD7jCZOsJu92t5B1z8KLDffRd1RDWmn0vbWQTO8`;

        const fetchedLink = await axios.get(url);

        console.log(fetchedLink.data);

          setLinks((current) => [...current, fetchedLink.data]);
          console.log(" fetch links = ", links);
      }
        console.log("inside fetch links2 =", links);
        setShowModal(true);
        
    };

    // const URL = `http://localhost:5000/login`;
    // const URL = `https://graphicalpasswordbackend.onrender.com/login`;
  const baseURL = process.env.REACT_APP_BACKEND_BASE_URL
  const URL = baseURL + "/login"

    const handelSubmit = async () => {
        
      const data = { email };
      console.log(baseURL)
      console.log(URL);
        const resp = await axios.post(URL, data);
        
        // console.log("data = ", resp.data.Ids);
        //console.log(resp);
        const idArray = resp.data.Ids;

        // console.log(idArray);

        // for (let i = 0; i < idArray.length; i++) {
        //     setAllId([...allId, idArray[i]]);
        // }
        //console.log(idArray);
        setAllId(idArray);

        // await setAllId(curr => [...curr, ...idArray]);
        
        // console.log(allId);

        // fetchImageLinks();
  };
    useEffect(() => {
        // console.log(allId);
        fetchImageLinks();
    }, [allId]);
    

  const handelImageClick = (imageId) => {
      setId([...id, imageId]);
      console.log(id);
  };

    const handelModalSubmit = async () => {
      // console.log("inside login handelmodalFunction");
    // const url = "http://localhost:5000/loginVerify";
    const url = "https://graphicalpasswordbackend.onrender.com/loginVerify";
      const data = { id, theme };
      
      // console.log("data = ", data);

      const repos = await axios
        .post(url, data)
      if (repos.data === "successfully logged in") {
        toastFunction("successfully logged in !!", 1);
      } else {
        toastFunction("failed to login", 0);
      }
      setShowModal(false);
    setEmail("");
    setTheme("");
  };

//   const imageId = (id) => {
//     setAllId([...allId, setAllId]);
//   };

  return (
    <>
      <div className="mt-48 flex flex-row justify-center">
        <div class="mr-5 relative z-0 w-3/12 mb-6 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div class="ml-5 relative z-0 w-3/12 mb-6 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Theme
          </label>
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handelSubmit}
          class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 mt-10"
        >
          Select Image
        </button>
      </div>

      <div className="mx-96 px-28">
        {showModal && (
          <Modal
            link={links}
            handelImageClick={handelImageClick}
            handelModalSubmit={handelModalSubmit}
            // imageID={imageId}
          />
        )}
      </div>
    </>
  );
};

export default Login;
