import { FormFieldProps } from "@/types";

//FormFieldProps contains the expected properties for a form field: type, placeholder, name, register, error, & valueAsNumber

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className="{`bg-sky-500 border border-black p-1 rounded-[10px] m-5 outline-none placeholder-black placeholder-opacity-100`}"


    />
    {error && <span className="text-[rgb(238,80,80)] text-[10px] ml-10 error-message">{error.message}</span>}
  </>
);
export default FormField;