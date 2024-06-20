import ClientSideTest from "./components/client-side-test";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="w-full p-4 bg-blue-500 text-white text-center">
        <h1>Welcome to the Home Page</h1>
      </header>
      <div className="flex-grow flex flex-col items-center justify-center">
        <section className="w-full max-w-2xl p-8 shadow-md rounded-md">
          <ClientSideTest />
        </section>
      </div>
    </main>
  );
}