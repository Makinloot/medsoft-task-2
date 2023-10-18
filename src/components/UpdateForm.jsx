/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Field, Formik, Form as FormikForm } from "formik";
import { useAppContext } from "../context/ContextProvider";
import { useEffect, useRef, useState } from "react";
import { InputField } from "./Form";
import formValidationSchema from "../validationSchema";
import { motion } from "framer-motion";

export default function UpdateForm({ id }) {
  // console.log("id", id);
  const { data, setShowUpdateForm, updatePatient } = useAppContext();
  const formRef = useRef(null);
  const [formValues, setFormValues] = useState({});
  // filter data by given id
  const filterData = () => data.filter((item) => item.id === id);

  useEffect(() => {
    setFormValues(filterData()[0]);
    console.log(filterData()[0], "YEY");
  }, [id]);

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
                genderId: formValues?.genderId,
                phone: formValues?.phone,
                address: formValues?.address,
                personalNum: formValues?.personalNum,
                email: formValues?.email,
              }}
              onSubmit={(values) => updatePatient(values, id)}
              validationSchema={formValidationSchema}
            >
              {({
                values,
                handleBlur,
                handleChange,
                errors,
                touched,
                // isSubmitting,
              }) => (
                <FormikForm
                  ref={formRef}
                  className="relative max-w-[100%]"
                  noValidate
                >
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="bg-slate-500 p-6 rounded-sm"
                  >
                    <InputField
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      name="fullName"
                      label="სახელი გვარი"
                      value={values.fullName}
                      error={touched.fullName && errors.fullName}
                      required
                    />
                    <InputField
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      name="dob"
                      label="დაბ თარიღი"
                      value={values.dob}
                      error={touched.dob && errors.dob}
                      type="date"
                      required
                    />
                    <div className="radio-group my-6 mb-2 text-white">
                      {touched.genderId && errors.genderId && (
                        <span className="text-red-400">{errors.genderId}</span>
                      )}
                      <div className="Input-field">
                        <label>
                          <Field type="radio" name="genderId" value="0" />
                          <span className="ml-2">მამრობითი</span>
                        </label>
                      </div>
                      <div className="Input-field">
                        <label>
                          <Field type="radio" name="genderId" value="1" />
                          <span className="ml-2">მდედრობითი</span>
                        </label>
                      </div>
                    </div>
                    <InputField
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      name="phone"
                      label="მობ ნომერი"
                      value={values.phone}
                      error={touched.phone && errors.phone}
                      type="number"
                    />
                    <InputField
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      name="address"
                      label="მისამართი"
                      value={values.address}
                      error={touched.address && errors.address}
                      required
                    />
                    <InputField
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      name="personalNum"
                      label="პირადი ნომერი"
                      value={values.personalNum}
                      error={touched.personalNum && errors.personalNum}
                    />
                    <InputField
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      name="email"
                      label="ელ-ფოსტა"
                      value={values.email}
                      error={touched.email && errors.email}
                      type="email"
                    />
                    <div className="flex my-4 justify-between">
                      <button
                        className="font-bold text-black py-1 px-4 cursor-pointer bg-red-400"
                        type="button"
                        onClick={() => setShowUpdateForm(false)}
                      >
                        დახურვა
                      </button>
                      <input
                        className="font-bold text-black py-1 px-4 cursor-pointer bg-green-400"
                        type="submit"
                        value="რედაქტირება"
                      />
                    </div>
                  </motion.div>
                </FormikForm>
              )}
            </Formik>
          )}
        </motion.div>
      </div>
    </div>
  );
}
