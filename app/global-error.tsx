"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container sm:w-4/5 m-5 p-5 mx-auto w-full h-screen">
      <h2 className="text-xl text-center tracking-tighter text-red-400 font-semibold">{error.message}!</h2>
      <button
        className="w-full text-xl my-10 cursor-pointer text-white text-center rounded-md bg-purple-900 hover:bg-purple-800 px-3 py-2 font-semibold shadow-sm ring-1 ring-inset ring-purple-300"
        onClick={() => reset()}
      >
        Reload & Try Again
      </button>
    </main>
  );
}
