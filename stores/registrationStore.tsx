// stores/registrationStore.tsx
import { create } from 'zustand';

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
  const storedData = localStorage.getItem("formData");

  return {
    formData: storedData ? JSON.parse(storedData) : [],
    addFormData: (data) => {
      set((state) => {
        const updatedData = [...state.formData, data];

        // saving the updated data to localStorage localStorage.setItem
        localStorage.setItem("formData", JSON.stringify(updatedData));
        return { formData: updatedData };
      });
    },
  };
});

export default useStore;
