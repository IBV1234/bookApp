import Image from "next/image";
import FormComponent from "./components/formComponent";
export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full  h-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="font-sans text-2xl my-20"> Welcome to  Test.com </h1>
        <FormComponent />
      </main>
    </div>
  );
}
