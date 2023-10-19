/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Formik, Form as FormikForm } from "formik";
import { useAppContext } from "../context/ContextProvider";
import { useEffect, useRef, useState } from "react";
import formValidationSchema from "../validationSchema";
import { motion } from "framer-motion";
import FormInputs from "./FormInputs";

export default function UpdateForm({ id }) {
  const formRef = useRef(null);
  const { data, updatePatient } = useAppContext();
  const [formValues, setFormValues] = useState({});
  // filter data by given id
  const filterData = () => data.filter((item) => item.id === id);
  // save filtered values in state
  useEffect(() => setFormValues(filterData()[0]), [id]);

  return (
    <div className="Update-form">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="Update-form-wrapper flex items-center justify-center fixed h-screen w-full top-0 left-0 bg-[#000000b7]"
        >
          {formValues?.fullName && (
            <Formik
              initialValues={{
                fullName: formValues?.fullName,
                dob: new Date(formValues?.dob * 1000)
                  .toISOString()
                  .split("T")[0],
                genderId:
                  formValues?.genderId == 0 ? "მამრობითი" : "მდედრობითი",
                phone: formValues?.phone,
                address: formValues?.address,
                personalNum: formValues?.personalNum,
                email: formValues?.email,
              }}
              onSubmit={(values) => updatePatient(values, id)}
              validationSchema={formValidationSchema}
              enableReinitialize
            >
              {(formikProps) => (
                <FormikForm ref={formRef} className="w-[450px]" noValidate>
                  <FormInputs {...formikProps} update />
                </FormikForm>
              )}
            </Formik>
          )}
        </motion.div>
      </div>
    </div>
  );
}
