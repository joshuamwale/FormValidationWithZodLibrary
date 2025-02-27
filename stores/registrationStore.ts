"use client";
import { create }  from 'zustand';

interface FormData {
  email: string;
  yearsOfExperience: number;
  password: string;
  confirmPassword: string;
}

interface RegistrationStore {
  formData: FormData[];
  addFormData: (data: FormData) => void;
}

const useStore = create<RegistrationStore>((set) => {
  let initialData: FormData[] = [];

   if (typeof window !== 'undefined') {
    // Only execute in the browser
    const storedData = sessionStorage.getItem("formData");
    initialData = storedData ? JSON.parse(storedData) : [];
  }

  return {
    formData: initialData,
    addFormData: (data) => {
      set((state) => {
        const updatedData = [...state.formData, data];

        // saving the updated data to sessionStorage
        if (typeof window !== 'undefined') {
          // Only execute in the browser
          sessionStorage.setItem("formData", JSON.stringify(updatedData));
        }
        return { formData: updatedData };
      });
    },
  };
});

export default useStore;