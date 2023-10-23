/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";

const Context = createContext(null);

const useAppContext = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [selectedId, setSelectedId] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // fetch patients
  async function fetchPatients() {
    try {
      const { data } = await axios.get(
        "https://64d3873467b2662bf3dc5f5b.mockapi.io/family/patients/"
      );
      // const formattedData = []
      const formattedData = data.map((item) => ({
        ...item,
        dob: new Date(item.dob * 1000)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "."),
        genderId: item.genderId == 0 ? "მამრობითი" : "მდედრობითი",
      }));
      setData(formattedData);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  // add new patient
  async function insertPatient({
    fullName,
    dob,
    genderId,
    phone,
    address,
    personalNum,
    email,
  }) {
    try {
      const patientValues = {
        fullName,
        dob: Math.floor(new Date(dob).getTime() / 1000),
        genderId: Number(genderId),
        phone,
        address,
        personalNum,
        email,
      };
      const res = await axios.post(
        "https://64d3873467b2662bf3dc5f5b.mockapi.io/family/patients/",
        patientValues
      );
      setShowForm(false);
      showSuccess("პაციენტი წარმატებით დაემატა");
      console.log(`Patient successfully added: ${res}`);
    } catch (error) {
      showError();
      setShowDeletePopup("error");
      console.log(`Error adding patient: ${error}`);
    }
  }

  // update existing patient
  async function updatePatient(values, id) {
    try {
      const unformattedDob = values.dob;
      values.dob = Math.floor(new Date(unformattedDob).getTime() / 1000);
      const res = await axios.put(
        `https://64d3873467b2662bf3dc5f5b.mockapi.io/family/patients/${id}`,
        values
      );
      console.log(res);
      setShowUpdateForm(false);
      showSuccess("პაციენტის განახლება წარმატებით დასრულდა");
    } catch (error) {
      setShowUpdateForm(false);
      showError();
      console.log(`Error updating patient: ${error}`);
    }
  }

  // display error message on error
  function showError() {
    message.error("დაფიქსირდა შეცდომა, სცადეთ ხელახლა", 2);
  }
  // display success message on success
  function showSuccess(msg) {
    message.success(msg, 2);
  }

  useEffect(() => {
    fetchPatients();
  }, [showForm, showButtons, showDeletePopup, showUpdateForm]);

  useEffect(() => {
    // check if click contains class ant-table-cell
    const handleClick = (e) => {
      if (e.target.classList.contains("ant-table-cell")) return;
      else if (
        !e.target.classList.contains("ant-table-cell") &&
        showUpdateForm === true
      )
        return;
      else if (!e.target.classList.contains("ant-table-cell")) {
        setSelectedId("");
        setShowButtons(false);
      }
    };
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [showUpdateForm]);

  const values = {
    data,
    showForm,
    setShowForm,
    showButtons,
    setShowButtons,
    selectedId,
    setSelectedId,
    showDeletePopup,
    setShowDeletePopup,
    showUpdateForm,
    setShowUpdateForm,
    insertPatient,
    updatePatient,
    showError,
    showSuccess,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ContextProvider, useAppContext };
