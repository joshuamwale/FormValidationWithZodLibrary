// components/dataTable.tsx
import useStore from "@/stores/registrationStore";

const DataTable = () => {
  const formData = useStore((state) => state.formData);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left border-collapse border border-zinc-950">
        <thead>
          <tr>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Experience</th>
            <th className="border px-4 py-2">Password</th>
            <th className="border px-4 py-2">Confirm Password</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((data, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{data.email}</td>
              <td className="border px-4 py-2">{data.yearsOfExperience}</td>
              <td className="border px-4 py-2">{data.password}</td>
              <td className="border px-4 py-2">{data.confirmPassword}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
