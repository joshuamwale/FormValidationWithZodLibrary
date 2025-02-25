"use client";
import DataTable from "@/components/dataTable";
//"use client" optimizes client-side rendering performance for this component
import Form from "../components/formComponent";  //import Form component into app/page.tsx

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <Form/>
      <h2 className="text-2xl font-bold mt-6"> Submitted Data</h2>
      <DataTable/>
    </main>
  );
}
