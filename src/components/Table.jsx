/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useAppContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TableButtons from "./TableButtons";
import { Table as AntTable } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../actions";

export default function Table() {
  const {
    data,
    setShowButtons,
    setSelectedId,
    selectedId,
    showUpdateForm,
    setShowUpdateForm,
  } = useAppContext();
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredData, setHoveredData] = useState(null);

  // data from redux
  const savedData = useSelector((state) => state.saveData);
  const dispatch = useDispatch();

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
    onMouseEnter: () => {
      // get data id of specific row
      const filteredData = savedData.filter((item) => item.id === record.id)[0];
      setHoveredRow(true);
      setHoveredData(filteredData);
    },
    onMouseLeave: () => {
      setHoveredData(null);
    },
  });

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="Table">
      <div className="container">
        <div className="Table-wrapper">
          <TableButtons />
          {data.length > 0 ? (
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="mt-4 relative"
            >
              <AntTable
                dataSource={data}
                columns={columns}
                onRow={onRowClick}
                rowKey={"id"}
                rowClassName={"SELECTED_ITEM"}
              />
              {hoveredData && <HoverTable {...hoveredData} />}
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

function HoverTable({
  fullName,
  dob,
  genderId,
  phone,
  address,
  personalNum,
  email,
}) {
  return (
    <div className="flex flex-col justify-start absolute bottom-[-150px] bg-blue-200 p-4 rounded-md">
      <div>
        <strong>ვგარი სახელი:</strong> {fullName}
      </div>
      <div>
        <strong>დაბ თარიღი:</strong>{" "}
        {new Date(dob * 1000)
          .toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, ".")}
      </div>
      <div>
        <strong>სქესი:</strong> {genderId == 0 ? "მამრობითი" : "მდედრობითი"}
      </div>
      <div>
        <strong>მობ ნომერი:</strong> {phone}
      </div>
      <div>
        <strong>მისამართი:</strong> {address}
      </div>
      <div>
        <strong>პირადი ნომერი:</strong> {personalNum}
      </div>
      <div>
        <strong>იმეილი:</strong> {email}
      </div>
    </div>
  );
}
