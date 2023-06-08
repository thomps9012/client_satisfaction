import { beginSurvey } from "@/utils/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Stepper from "@/components/stepper";
const BeginSurvey = async () => {
  const begin_interview = async (client_data: FormData) => {
    "use server";
    if (client_data.get("PID") === "") {
      throw new Error("Please enter a valid PID Number");
    }
    if (client_data.get("first_name") === "") {
      throw new Error("Please enter a valid First Name");
    }
    if (client_data.get("last_name") === "") {
      throw new Error("Please enter a valid Last Name");
    }
    const client_info = {
      PID: parseInt(client_data.get("PID") as string),
      first_name: client_data
        .get("first_name")
        ?.toString()
        .trim()
        .toLowerCase() as string,
      last_name: client_data
        .get("last_name")
        ?.toString()
        .trim()
        .toLowerCase() as string,
    };
    const interview_id = await beginSurvey(client_info);
    if (interview_id) {
      cookies().set("interview_id", interview_id);
      redirect("/1");
    }
  };
  return (
    <main className="container sm:w-3/4 m-5 p-5 mx-auto w-full">
      <Stepper active_link="begin" />
      <h1 className="my-10 text-2xl font-semibold leading-none tracking-tighter text-gray-900 text-center">
        Please Enter Your Personal Information
      </h1>
      <form action={begin_interview}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            id="PID"
            name="PID"
            required
            autoFocus
            placeholder=" "
            min={0}
          />
          <label
            htmlFor="PID"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            PID
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            required
            placeholder=" "
            id="first_name"
            name="first_name"
          />
          <label
            htmlFor="first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            First Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            required
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            placeholder=" "
            id="last_name"
            name="last_name"
          />
          <label
            htmlFor="last_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Last Name
          </label>
        </div>
        <button
          id="begin_interview"
          type="submit"
          className="w-full text-xl my-10 cursor-pointer text-white text-center rounded-md bg-purple-900 hover:bg-purple-800 px-3 py-2 font-semibold shadow-sm ring-1 ring-inset ring-purple-300"
        >
          Begin Survey
        </button>
      </form>
    </main>
  );
};
export default BeginSurvey;
