import * as Yup from "yup";

export const formValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("სავალდებულო ველი").max(200),
  dob: Yup.date().required("სავალდებულო ველი"),
  genderId: Yup.string().required("სავალდებულო ველი"),
  phone: Yup.string()
    .test("startsWithFive", "ველი 5-ით უნდა იწყებოდეს", (value) => {
      if (value === undefined) return true;
      return value.toString().startsWith("5");
    })
    .max(9, "მაქსიმუმ 9 ციფრი")
    .min(9, "მინიმუმ 9 ციფრი"),
  address: Yup.string().required("სავალდებულო ველი"),
  personalNum: Yup.string().matches(/^[0-9]+$/, "დაშვებულია მხოლოდ ციფრები"),
  email: Yup.string().test(
    "is-valid-email",
    "შეიყვანეთ სწორი ელ-ფოსტა",
    (value) => {
      if (!value) {
        return true;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
      return emailRegex.test(value) && !/\s+$/.test(value);
    }
  ),
});

export default formValidationSchema;
