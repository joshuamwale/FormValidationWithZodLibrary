"use client";
//"use client" optimizes client-side rendering performance for this component
import Form from "./Form";  //import Form component into app/page.tsx

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <Form/>
    </main>
  );
}

export default Home;