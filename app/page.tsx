"use client";
//"use client" optimizes client-side rendering performance for this component
import Form from "../components/formComponent";  //import Form component into app/page.tsx

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <Form/>
    </main>
  );
}
