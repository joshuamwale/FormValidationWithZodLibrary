"use client"; //using app router and using in client components

import useStore from "@/stores/registrationStore";
import { useForm } from "react-hook-form"; //this hook is for helping us manage form state and validations
import { FormData } from "@/types";        //the structure or shape of the form data
import FormField from "./formFieldComponent";       //the reusable form field component
import { z, ZodType } from "zod"; //new import of Zod
import { zodResolver } from "@hookform/resolvers/zod";


  //create a TypeScript-backed form schema using Zod to the existing form structure
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


function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema), // Applying the zodResolver
  });
  
  //getting addFormData from Zustand
  const addFormData = useStore((state) => state.addFormData);

  const onSubmit = (data: FormData) => {
      console.log("Form Submitted Successfully", data);

      //Adding form data to Zustand store: RegistrationStore

      addFormData(data); 

      //resetting the form fields after a successful submission

      reset();
  }

  return (
    //handleSubmit(onSubmit): handles the form submission. Validates the form and runs the onSubmit function
    //reset() : resets the form fields and any errors called inside the onSubmit function

      <form onSubmit={handleSubmit(onSubmit)}className= "bg-cyan-100 rounded-lg shadow p-6 space-y-4" > 
        <div className="grid col-auto">
          <h1 className="text-3xl font-bold mb-4">
            FormData Validation with Zod
          </h1>
          
          <FormField
            type="email"
            placeholder="Enter Your Email"
            name="email"
            register={register}
            error={errors.email}
          />

          <FormField
            type="number"
            placeholder="Years of Experience (1 - 5)"
            name="yearsOfExperience"
            register={register}
            error={errors.yearsOfExperience}
            valueAsNumber
          />

          <FormField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
          />

          <FormField
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
          />

          <button type="submit"  className="submit-button bg-sky-500 p-2 border rounded-[10px] mt-4 font-bold text-black submit-button hover:bg-[rgba(0,26,255,0.217)]">
            Submit
          </button>
        </div>
      </form>
  );
}

export default Form;