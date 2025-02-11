import { useForm } from "react-hook-form"; //this hook is for helping us manage form state and validations
import { FormData, FormSchema } from "@/types";        //the structure or shape of the form data
import FormField from "./FormField";       //the reusable form field component
import { zodResolver } from "@hookform/resolvers/zod";

function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema), // Applying the zodResolver
  });

  const onSubmit = async (data: FormData) => {
      console.log("Form Submitted Successfully", data);

      //resetting the form fields after a successful submission

      reset();
  }

  return (
    //handleSubmit(onSubmit): handles the form submission. Validates the form and runs the onSubmit function
    //reset() : resets the form fields and any errors called inside the onSubmit function

      <form className= "bg-cyan-100 rounded-lg shadow p-6 space-y-4" onSubmit={handleSubmit(onSubmit)}> 
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