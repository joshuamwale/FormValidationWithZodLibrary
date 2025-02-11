import { FieldError, UseFormRegister } from "react-hook-form";

import { z, ZodType } from "zod"; //new import of Zod


//FormData: a representation of the data we want add in the form

export type FormData = {
    email: string;
    yearsOfExperience: number;
    password: string;
    confirmPassword: string;
  };

  //create a TypeScript-backed form schema using Zod to the existing form structure
  export const FormSchema: ZodType<FormData> = z  //FormSchema representation of Zod type that corresponds to the structure defined by the FormData type
  .object({                                       //z.object a definition of an object schema using Zod
    email: z.string().email(),
    yearsOfExperience: z
      .number({
        required_error: "required field",
        invalid_type_error: "Years of Experience is required",
      })
      .min(1)
      .max(5),
    password: z
      .string()
      .min(4, { message: "Password is too short" })
      .max(10, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error associated with the confirmPassword field
  });


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