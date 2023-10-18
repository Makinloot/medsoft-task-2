import { useRef } from "react";
import { useAppContext } from "../context/ContextProvider";
import { Field, Formik, Form as FormikForm } from "formik";
import formValidationSchema from "../validationSchema";
import axios from "axios";
import { motion } from "framer-motion";

/* eslint-disable react/prop-types */
export default function Form() {
  const { setShowForm } = useAppContext();
  const formRef = useRef(null);

  async function handleSubmit({
    name,
    birthdate,
    sex,
    mobile,
    location,
    identification,
    email,
  }) {
    try {
      const generateId = () => Math.random() * Math.random() * Math.random();
      const request = {
        name: name,
        birthdate: new Date(birthdate)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "."),
        sex: sex,
        mobile: mobile,
        location: location,
        identification: identification,
        email: email,
        id: String(generateId()).split(".")[1],
      };
      // production route
      axios.post("/insert", request).then((res) => {
        console.log(res);
        setShowForm(false);
      });
      // test route
      // axios.post("http://localhost:3000/insert", request).then((res) => {
      //   console.log(res);
      //   setShowForm(false);
      // });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

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
              name: "",
              birthdate: "",
              sex: "",
              mobile: "",
              location: "",
              identification: "",
              email: "",
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
  return (
    <div className="Input-field flex flex-col text-white">
      <label className="my-2" htmlFor={name}>
        {error ? (
          <span className="text-red-400">{error}</span>
        ) : (
          <span>{label}</span>
        )}
      </label>
      {/* {error && <div>{error}</div>} */}
      <input
        className={`w-[300px] max-w-[100%] h-9 rounded-sm px-2 bg-white text-black outline-none focus:bg-slate-200 ${
          error ? "!border-red-400 border" : ""
        }`}
        type={type ? type : "text"}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        name={name}
        id={name}
      />
    </div>
  );
}
