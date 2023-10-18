/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Field, Formik, Form as FormikForm } from "formik";
import { useAppContext } from "../context/ContextProvider";
import { useEffect, useRef, useState } from "react";
import { InputField } from "./Form";
import axios from "axios";
import formValidationSchema from "../validationSchema";
import { motion } from "framer-motion";

export default function UpdateForm({ id }) {
  const { data, setShowUpdateForm } = useAppContext();
  const formRef = useRef(null);
  const [formValues, setFormValues] = useState({});
  // filter data by given id
  const filterData = () => data.filter((item) => item.id === id);

  function handleSubmit(values) {
    try {
      values.id = id;
      (values.birthdate = new Date(values.birthdate)
        .toLocaleDateString("en-GB")
        .replace(/\//g, ".")),
        axios
          .post("/update", values)
          // .post("http://localhost:3000/update", values)
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
    setFormValues(filterData()[0]);
  }, [id]);
  return (
    <div className="Update-form">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="Update-form-wrapper flex items-center justify-center fixed h-screen w-full top-0 left-0 bg-[#000000b7]"
        >
          {formValues?.name && (
            <Formik
              initialValues={{
                name: formValues?.name,
                birthdate: new Date(
                  formValues?.birthdate.split(".").reverse().join("-")
                )
                  .toISOString()
                  .split("T")[0],
                sex: formValues?.sex,
                mobile: formValues?.mobile,
                location: formValues?.location,
                identification: formValues?.identification,
                email: formValues?.email,
              }}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
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
                      name="name"
                      label="სახელი გვარი"
                      value={values.name}
                      error={touched.name && errors.name}
                      required
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
                    <InputField
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      name="identification"
                      label="პირადი ნომერი"
                      value={values.identification}
                      error={touched.identification && errors.identification}
                    />
                    <InputField
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      name="birthdate"
                      label="დაბ თარიღი"
                      value={values.birthdate}
                      error={touched.birthdate && errors.birthdate}
                      type="date"
                      required
                    />
                    <div className="radio-group my-6 mb-2 text-white">
                      {touched.sex && errors.sex && (
                        <span className="text-red-400">{errors.sex}</span>
                      )}
                      <div className="Input-field">
                        <label>
                          <Field type="radio" name="sex" value="მამრობითი" />
                          <span className="ml-2">მამრობითი</span>
                        </label>
                      </div>
                      <div className="Input-field">
                        <label>
                          <Field type="radio" name="sex" value="მდედრობითი" />
                          <span className="ml-2">მდედრობითი</span>
                        </label>
                      </div>
                    </div>
                    <InputField
                      handleChange={handleChange("mobile")}
                      handleBlur={handleBlur("mobile")}
                      name="mobile"
                      label="მობ ნომერი"
                      value={values.mobile}
                      error={touched.mobile && errors.mobile}
                      type="number"
                    />
                    <InputField
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      name="location"
                      label="მისამართი"
                      value={values.location}
                      error={touched.location && errors.location}
                      required
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
