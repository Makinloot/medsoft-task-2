/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { IoAddOutline } from "react-icons/io5";
import { useAppContext } from "../context/ContextProvider";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "antd";

export default function TableButtons() {
  const { showDeletePopup, showError } = useAppContext();

  return (
    <div className="Table-buttons text-red flex flex-wrap justify-center sm:justify-start gap-2 text-black">
      {showDeletePopup === "delete" && <DeletePopUp />}

      {/* ADD PATIENTS BUTTON */}
      <TableButton
        value={"დამატება"}
        icon={<IoAddOutline size={28} color="green" />}
        noError
      />
      {/* UPDATE PATIENTS BUTTON */}
      <TableButton
        value={"რედაქტირება"}
        icon={<BiEdit className="ant-table-cell" size={24} color="orange" />}
        action={"update"}
      />
      {/* DELETE PATIENTS BUTTON */}
      <TableButton
        value={"წაშლა"}
        icon={
          <TiDeleteOutline className="ant-table-cell" size={24} color="red" />
        }
        action={"delete"}
      />
    </div>
  );
}

function TableButton({ value, icon, action, noError }) {
  const {
    setShowForm,
    showButtons,
    setShowDeletePopup,
    setShowUpdateForm,
    setSelectedId,
  } = useAppContext();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          className={
            noError
              ? `flex items-center gap-1 py-1 px-4`
              : `ant-table-cell table-button flex items-center gap-1 py-1 px-4 relative ${
                  showButtons ? "opacity-100 " : "opacity-50 cursor-not-allowed"
                }`
          }
          onClick={() => {
            if (showButtons) {
              if (action === "delete") setShowDeletePopup("delete");
              else if (action === "update") setShowUpdateForm(true);
            } else if (noError) setShowForm(true);
          }}
        >
          <div className="ant-table-cell">{icon}</div>
          <span className={"text-sm ant-table-cell"}>{value}</span>
          {!showButtons && !noError && (
            <div className="error-text absolute text-xs opacity-0 bg-gray-600 text-white top-[-30px] right-[-80px] rounded-sm p-2">
              <p className="text-center">გთხოვთ აირჩიოთ პაციენტი</p>
            </div>
          )}
        </Button>
      </motion.div>
    </>
  );
}

function DeletePopUp() {
  const { selectedId, setShowDeletePopup, showError, showSuccess } =
    useAppContext();

  // delete patient from database by id
  async function handleDelete(id) {
    console.log(`ID FROM DELETE FUNCTION ${id}`);
    try {
      const res = await axios.delete(
        `https://64d3873467b2662bf3dc5f5b.mockapi.io/family/patients/${id}`
      );
      console.log("Patient successfully deleted", res);
      showSuccess("პაციენტის წარმატებით წაიშალა");
    } catch (error) {
      showError();
      console.log(`Error deleting patient: ${error}`);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="ant-table-cell fixed z-[1000] top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/60"
    >
      <motion.div
        initial={{ y: -100 }}
        whileInView={{ y: 0 }}
        className="ant-table-cell border border-black rounded-sm py-2 px-6 bg-white"
      >
        <p className="ant-table-cell">გსურთ პაციენტის წაშლა ?</p>
        <div className="ant-table-cell flex justify-between my-4">
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
            className="ant-table-cell bg-red-400 py-1 px-4"
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
