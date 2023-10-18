import { useRef } from "react";
import { useAppContext } from "../context/ContextProvider";
import { Field, Formik, Form as FormikForm } from "formik";
import formValidationSchema from "../validationSchema";
import { motion } from "framer-motion";

/* eslint-disable react/prop-types */
export default function Form() {
  const { setShowForm, insertPatient } = useAppContext();
  const formRef = useRef(null);

  return (
    <div className="Form">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="Form-wrapper flex items-center justify-center fixed overflow-visible h-screen w-full top-0 left-0 bg-[#000000b7]"
        >
          <Formik
            initialValues={{
              fullName: "",
              dob: "",
              genderId: "",
              phone: "",
              address: "",
              personalNum: "",
              email: "",
            }}
            onSubmit={(values) => insertPatient(values)}
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
                      onClick={() => setShowForm(false)}
                    >
                      დახურვა
                    </button>
                    <input
                      className="font-bold text-black py-1 px-4 cursor-pointer bg-green-400"
                      type="submit"
                      value="დამატება"
                    />
                  </div>
                </motion.div>
              </FormikForm>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
  );
}

export function InputField({
  type,
  name,
  required,
  value,
  handleChange,
  handleBlur,
  error,
  label,
}) {
  // console.log("DATE", value);
  return (
    <div className="Input-field flex flex-col text-white">
      <label className="my-2" htmlFor={name}>
        {error ? (
          <span className="text-red-400">{error}</span>
        ) : (
          <span>{label}</span>
        )}
      </label>
      <input
        className={`w-[300px] max-w-[100%] h-9 rounded-sm px-2 bg-white text-black outline-none focus:bg-slate-200 placeholder:italic ${
          error ? "!border-red-400 border" : ""
        }`}
        type={type ? type : "text"}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        name={name}
        id={name}
        placeholder={label}
      />
    </div>
  );
}
