/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useAppContext } from "../context/ContextProvider";
import { useEffect } from "react";
import { motion } from "framer-motion";
import TableButtons from "./TableButtons";

export default function Table() {
  const { data } = useAppContext();

  return (
    <div className="Table">
      <div className="container">
        <div className="Table-wrapper">
          <TableButtons />
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="border border-black mt-4"
          >
            <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead>
                  <tr className="border-black text-black">
                    <th className="border-r border-black">ID</th>
                    <th className="border-r border-black">
                      პაციენტის გვარი სახელი
                    </th>
                    <th className="border-r border-black">დაბ თარიღი</th>
                    <th className="border-r border-black">სქესი</th>
                    <th className="border-r border-black">მობ ნომერი</th>
                    <th className="border-r border-black">მისამართი</th>
                    <th className="border-r border-black">პირადი ნომერი</th>
                    <th className="border-r">ელ-ფოსტა</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {data?.map((item) => (
                    <TableRow key={item.id} {...item} />
                  ))}
                  <tr className="border-black hover:bg-slate-200 h-[25px]">
                    <th className="border-r border-black"></th>
                    <td className="border-r border-black"></td>
                    <td className="border-r border-black"></td>
                    <td className="border-r border-black"></td>
                    <td className="border-r border-black"></td>
                    <td className="border-r border-black"></td>
                    <td className="border-r border-black"></td>
                    <td className=""></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TableRow({
  id,
  name,
  birthdate,
  sex,
  mobile,
  location,
  identification,
  email,
}) {
  const {
    setShowButtons,
    setSelectedId,
    selectedId,
    showUpdateForm,
    setShowUpdateForm,
  } = useAppContext();

  useEffect(() => {
    // check if click contains class SELECTED_ITEM
    const handleClick = (e) => {
      if (e.target.classList.contains("SELECTED_ITEM")) return;
      else if (
        !e.target.classList.contains("SELECTED_ITEM") &&
        showUpdateForm === true
      )
        return;
      else {
        setSelectedId("");
        setShowButtons(false);
      }
    };
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [showUpdateForm]);

  return (
    <tr
      className={`SELECTED_ITEM border-black relative hover:bg-slate-200 cursor-pointer ${
        selectedId === id ? "bg-slate-400 hover:bg-slate-400" : ""
      }`}
      onClick={() => {
        setSelectedId(id);
        setShowButtons(true);
        if (selectedId === id) {
          setShowUpdateForm(true);
        }
      }}
    >
      <th
        className="SELECTED_ITEM border-r border-black max-w-[25px] overflow-hidden text-ellipsis"
        title={id}
      >
        {id}
      </th>
      <td className="SELECTED_ITEM border-r border-black">{name}</td>
      <td className="SELECTED_ITEM border-r border-black">{birthdate}</td>
      <td className="SELECTED_ITEM border-r border-black">{sex}</td>
      <td className="SELECTED_ITEM border-r border-black">{mobile}</td>
      <td className="SELECTED_ITEM border-r border-black">{location}</td>
      <td className="SELECTED_ITEM border-r border-black">{identification}</td>
      <td className="SELECTED_ITEM">{email}</td>
    </tr>
  );
}
