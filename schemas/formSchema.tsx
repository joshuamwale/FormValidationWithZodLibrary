import { z, ZodType } from "zod"; //new import of Zod for client and server side validation
import { FormData } from "@/types";        //the structure or shape of the form data


//define/create a TypeScript-backed form schema using Zod to the existing form structure
export const FormSchema: ZodType<FormData> = z  //FormSchema representation of Zod type that corresponds to the structure defined by the FormData type
.object({                                       //z.object a definition of an object schema using Zod
  email: z.string().email("Invalid email address"),
  yearsOfExperience: z
    .number({
      required_error: "required field",
      invalid_type_error: "Years of Experience is required",
    })
    .min(1)
    .max(5, "Experience must be betweeen 1-5 years"),
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

