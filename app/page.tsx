import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="container mx-auto m-5 mt-24 p-5 items-center min-h-screen">
      <Image
        className="h-auto mb-6 rounded-lg mx-auto w-52"
        alt="NORA Logo"
        src="/nora_logo.png"
      />
      <h1 className="mb-5 text-center text-4xl  leading-none font-extrabold tracking-tight text-purple-950">
        Client Satisfaction Survey
      </h1>
      <Link href={"/begin"}>
        <button
          type="button"
          className="w-full text-xl my-10 cursor-pointer text-white text-center rounded-md bg-purple-900 hover:bg-purple-800 px-3 py-2 font-semibold shadow-sm ring-1 ring-inset ring-purple-300"
          id="begin_survey"
        >
          Begin
        </button>
      </Link>
    </main>
  );
}
