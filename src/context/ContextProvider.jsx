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
  const [selectedId, setSelectedId] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  async function fetchPatients() {
    try {
      // production route
      const { data } = await axios.get("/patients");
      // testing route
      // const { data } = await axios.get("http://localhost:3000/patients");
      setData(data);
    } catch (error) {
      console.log("Something went wrong", error);
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
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ContextProvider, useAppContext };
