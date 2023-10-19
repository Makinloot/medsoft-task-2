/* eslint-disable react/prop-types */
import { Form as AntForm, Input, Button, Select } from "antd";
import { motion } from "framer-motion";
import { useAppContext } from "../context/ContextProvider";

export default function FormInputs({
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  setFieldValue,
  setFieldTouched,
  update,
}) {
  const { setShowForm, setShowUpdateForm } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="bg-gray-600 p-6 rounded-sm"
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
      <InputField
        type={"select"}
        error={touched.genderId && errors.genderId}
        handleChange={(value) => setFieldValue("genderId", value)}
        handleBlur={() => setFieldTouched("genderId", true)}
        value={values.genderId}
      />
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
      <div className="my-4 flex flex-col gap-4">
        <Button htmlType="submit" type="primary" className="bg-blue-400" block>
          დამატება
        </Button>
        <Button
          htmlType="button"
          type="primary"
          danger
          onClick={() =>
            update ? setShowUpdateForm(false) : setShowForm(false)
          }
          block
        >
          დახურვა
        </Button>
      </div>
    </motion.div>
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
  if (type === "select") {
    return (
      <AntForm.Item
        name={"genderId"}
        validateStatus={error ? "error" : ""}
        help={error}
      >
        <label className="my-2 block text-white text-base" htmlFor={"genderId"}>
          სქესი
        </label>
        <Select
          placeholder="Select your gender"
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          id="genderId"
        >
          <Select.Option value="0">მამრობით</Select.Option>
          <Select.Option value="1">მდედრობითი</Select.Option>
        </Select>
      </AntForm.Item>
    );
  }

  return (
    <AntForm.Item
      className="Input-field flex flex-col"
      validateStatus={error ? "error" : ""}
      help={error}
      label={<label className="text-white text-base">{label}</label>}
      name={name}
      labelCol={{ span: 24 }}
    >
      <Input
        type={type ? type : "text"}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        id={name}
        placeholder={label}
      />
      <div className="opacity-0 pointer-events-none absolute">{value}</div>
    </AntForm.Item>
  );
}
