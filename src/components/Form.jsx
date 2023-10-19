import { useRef } from "react";
import { useAppContext } from "../context/ContextProvider";
import { Formik, Form as FormikForm } from "formik";
import formValidationSchema from "../validationSchema";
import { motion } from "framer-motion";
import FormInputs from "./FormInputs";

/* eslint-disable react/prop-types */
export default function Form() {
  const { insertPatient } = useAppContext();
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
            {(formikProps) => (
              <FormikForm ref={formRef} className="w-[450px]" noValidate>
                <FormInputs {...formikProps} />
              </FormikForm>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
  );
}
