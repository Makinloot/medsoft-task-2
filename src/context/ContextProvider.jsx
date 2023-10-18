/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

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

  async function fetchPatients() {
    try {
      const { data } = await axios.get(
        "https://64d3873467b2662bf3dc5f5b.mockapi.io/family/patients/"
      );
      setData(data);
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
      axios
        .post(
          "https://64d3873467b2662bf3dc5f5b.mockapi.io/family/patients/",
          patientValues
        )
        .then((res) => {
          console.log(res);
          setShowForm(false);
        });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  // update existing patient
  async function updatePatient(values, id) {
    try {
      const unformattedDob = values.dob;
      values.dob = Math.floor(new Date(unformattedDob).getTime() / 1000);
      console.log("AEEEE", values.dob);
      axios
        .put(
          `https://64d3873467b2662bf3dc5f5b.mockapi.io/family/patients/${id}`,
          values
        )
        .then((res) => {
          console.log(res);
          setShowUpdateForm(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(`Error updating patient: ${error}`);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, [showForm, showButtons, showDeletePopup, showUpdateForm]);

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
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ContextProvider, useAppContext };
