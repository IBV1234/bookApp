import FormComponent from "./components/formComponent";
export default function Home() {
  return (

    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black" style={{
      backgroundImage: `url('/books_image.jpg')`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <main className="flex w-full h-full flex-1 flex-col items-center justify-center px-20 text-center">
        <FormComponent />
      </main>
    </div>
  );
}
