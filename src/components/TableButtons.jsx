/* eslint-disable no-unused-vars */
import { IoAddOutline } from "react-icons/io5";
import { useAppContext } from "../context/ContextProvider";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import { motion } from "framer-motion";

export default function TableButtons() {
  const {
    setShowForm,
    showButtons,
    setShowDeletePopup,
    showDeletePopup,
    setShowUpdateForm,
  } = useAppContext();

  return (
    <div className="Table-buttons flex flex-wrap justify-center sm:justify-start gap-2 text-black">
      {showDeletePopup && <DeletePopUp />}
      {/* ADD PATIENTS BUTTON */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-1 bg-slate-300 py-1 px-4"
        onClick={() => setShowForm(true)}
      >
        <IoAddOutline size={28} color="green" />
        <span className="text-sm">დამატება</span>
      </motion.button>
      {/* UPDATE PATIENTS BUTTON */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className={`SELECTED_ITEM flex items-center gap-1 py-1 px-4 ${
          showButtons
            ? "opacity-100 pointer-events-auto bg-slate-300"
            : "opacity-50 pointer-events-none bg-slate-200"
        }`}
        onClick={() => setShowUpdateForm(true)}
      >
        <div className="SELECTED_ITEM">
          <BiEdit className="SELECTED_ITEM" size={24} color="orange" />
        </div>
        <span className="text-sm SELECTED_ITEM">რედაქტირება</span>
      </motion.button>
      {/* DELETE PATIENTS BUTTON */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className={`SELECTED_ITEM flex items-center gap-1 py-1 px-4 ${
          showButtons
            ? "opacity-100 pointer-events-auto bg-slate-300"
            : "opacity-50 pointer-events-none bg-slate-200"
        }`}
        onClick={() => setShowDeletePopup(true)}
      >
        <div className="SELECTED_ITEM">
          <TiDeleteOutline className="SELECTED_ITEM" size={24} color="red" />
        </div>
        <span className="text-sm SELECTED_ITEM">წაშლა</span>
      </motion.button>
    </div>
  );
}

function DeletePopUp() {
  const { selectedId, setShowDeletePopup } = useAppContext();

  // delete patient from database by id
  function handleDelete(id) {
    try {
      // production route
      axios.post("/delete", { id: id }).then((res) => console.log(res));
      // test route
      // axios
      //   .post("http://localhost:3000/delete", { id: id })
      //   .then((res) => console.log(res));
    } catch (error) {
      console.log(`Error deleting patient: ${error}`);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="SELECTED_ITEM fixed z-[1000] top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/60"
    >
      <motion.div
        initial={{ y: -100 }}
        whileInView={{ y: 0 }}
        className="SELECTED_ITEM border border-black rounded-sm py-2 px-6 bg-white"
      >
        <p className="SELECTED_ITEM">გსურთ პაციენტის წაშლა ?</p>
        <div className="SELECTED_ITEM flex justify-between my-4">
          <button
            className="bg-green-400 py-1 px-4"
            onClick={() => {
              handleDelete(selectedId);
              setShowDeletePopup(false);
            }}
          >
            დიახ
          </button>
          <button
            className="SELECTED_ITEM bg-red-400 py-1 px-4"
            onClick={() => {
              setShowDeletePopup(false);
            }}
          >
            არა
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
