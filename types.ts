import { FieldError, UseFormRegister } from "react-hook-form";

//FormData: a representation of the data we want to add in the form

export type FormData = {
    email: string;
    yearsOfExperience: number;
    password: string;
    confirmPassword: string;
  };

  //FormFieldProps: a def of the properties expected by the form field component
  export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
  };

//ValidFieldNames: gives us the valid field names for the form. Corresponds to the fields defined in the FormData type
  export type ValidFieldNames =
  | "email"
  | "yearsOfExperience"
  | "password"
  | "confirmPassword";