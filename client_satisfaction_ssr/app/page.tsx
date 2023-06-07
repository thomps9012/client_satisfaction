import Link from "next/link";
export default function Home() {
  return (
    <main className="container mx-auto m-5 p-5 items-center">
      <img
        className="h-auto mb-6 rounded-lg mx-auto"
        alt="NORA Logo"
        src="/nora_logo.png"
      />
      <h1 className="mb-5 text-center text-4xl  leading-none font-extrabold tracking-tight">
        Client Satisfaction Survey
      </h1>
      <Link href={"/begin"}>
        <button
          type="button"
          className="focus:outline-none text-white bg-purple-900 hover:bg-purple-800 focus:ring-4 focus:ring-purple-500 rounded-lg font-semibold px-5 py-2.5 mb-5 w-full mt-10 text-xl"
          id="begin_survey"
        >
          Begin
        </button>
      </Link>
    </main>
  );
}
