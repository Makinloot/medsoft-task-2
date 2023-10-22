/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { IoAddOutline } from "react-icons/io5";
import { useAppContext } from "../context/ContextProvider";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import { motion } from "framer-motion";

export default function TableButtons() {
  const { showDeletePopup } = useAppContext();

  return (
    <div className="Table-buttons flex flex-wrap justify-center sm:justify-start gap-2 text-black">
      {showDeletePopup === "delete" && <DeletePopUp />}
      {showDeletePopup === "error" && <DeletePopUp error />}
      {/* ADD PATIENTS BUTTON */}
      <TableButton
        value={"დამატება"}
        icon={<IoAddOutline size={28} color="green" />}
        noError
      />
      {/* UPDATE PATIENTS BUTTON */}
      <TableButton
        value={"რედაქტირება"}
        icon={<BiEdit className="SELECTED_ITEM" size={24} color="orange" />}
        action={"update"}
      />
      {/* DELETE PATIENTS BUTTON */}
      <TableButton
        value={"წაშლა"}
        icon={
          <TiDeleteOutline className="SELECTED_ITEM" size={24} color="red" />
        }
        action={"delete"}
      />
    </div>
  );
}

function TableButton({ value, icon, action, noError }) {
  const { setShowForm, showButtons, setShowDeletePopup, setShowUpdateForm } =
    useAppContext();
  return (
    <motion.button
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className={
        noError
          ? `flex items-center gap-1 hover:bg-slate-400 bg-slate-300 py-1 px-4`
          : `SELECTED_ITEM table-button flex items-center gap-1 py-1 px-4 relative ${
              showButtons
                ? "opacity-100 bg-slate-300 hover:bg-slate-400"
                : "opacity-50 bg-slate-200 cursor-not-allowed"
            }`
      }
      onClick={() => {
        if (showButtons) {
          if (action === "delete") setShowDeletePopup("delete");
          else if (action === "update") setShowUpdateForm(true);
        } else if (noError) setShowForm(true);
      }}
    >
      <div className="SELECTED_ITEM">{icon}</div>
      <span className="text-sm SELECTED_ITEM">{value}</span>
      {!showButtons && !noError && (
        <div className="error-text absolute text-xs opacity-0 bg-gray-600 text-white top-[-30px] right-[-80px] rounded-sm p-2">
          <p className="text-center">გთხოვთ აირჩიოთ პაციენტი</p>
        </div>
      )}
    </motion.button>
  );
}

function DeletePopUp({ error }) {
  const { selectedId, setShowDeletePopup } = useAppContext();

  // delete patient from database by id
  async function handleDelete(id) {
    try {
      const res = await axios.delete(
        `https://64d3873467b2662bf3dc5f5b.mockapi.io/family/patients/${id}`
      );
      console.log("Patient successfully deleted", res);
    } catch (error) {
      setShowDeletePopup("error");
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
        {error ? (
          <>
            <p className="SELECTED_ITEM text-center max-w-[300px]">
              დაფიქსირდა შეცდომა, გთხოვთ ცადოთ ხელახლა
            </p>
            <div className="SELECTED_ITEM flex justify-center my-4">
              <button
                className="SELECTED_ITEM text-center bg-red-400 py-1 px-4"
                onClick={() => {
                  setShowDeletePopup(false);
                }}
              >
                დახურვა
              </button>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
