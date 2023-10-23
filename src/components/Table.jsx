/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useAppContext } from "../context/ContextProvider";
import { useEffect } from "react";
import { motion } from "framer-motion";
import TableButtons from "./TableButtons";
import { Table as AntTable } from "antd";

export default function Table() {
  const {
    data,
    setShowButtons,
    setSelectedId,
    selectedId,
    showUpdateForm,
    setShowUpdateForm,
  } = useAppContext();

  const columns = [
    {
      title: "გვარი სახელი",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "დაბ თარიღი",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "სქესი",
      dataIndex: "genderId",
      key: "genderId",
    },
    {
      title: "მობ ნომერი",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "მისამართი",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "პირადი ნომერი",
      dataIndex: "personalNum",
      key: "personalNum",
    },
    {
      title: "იმეილი",
      dataIndex: "email",
      key: "email",
    },
  ];

  const onRowClick = (record) => ({
    onClick: () => {
      setSelectedId(record.id);
      setShowButtons(true);
      if (selectedId === record.id) {
        setShowUpdateForm(true);
      }
    },
  });

  return (
    <div className="Table">
      <div className="container">
        <div className="Table-wrapper">
          <TableButtons />
          {data.length > 0 ? (
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="mt-4">
              <AntTable
                dataSource={data}
                columns={columns}
                onRow={onRowClick}
                rowKey={"id"}
                rowClassName={"SELECTED_ITEM"}
                rowSelection
              />
            </motion.div>
          ) : (
            <div className="loading-animation">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
