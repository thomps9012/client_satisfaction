import Stepper from "@/components/stepper";
import { closeClient, completeSurvey } from "@/utils/db";
import { cookies } from "next/headers";
const EndSurvey = async () => {
  const interview_id = cookies().get("interview_id")?.value as string;
  const ok = await completeSurvey(interview_id);
  if (ok) {
    await closeClient();
    return (
      <main className="container sm:w-3/4 m-5 p-5 mx-auto w-full">
        <Stepper active_link="complete" />
        <h3 className="mb-5  text-green-600 font-bold text-center text-3xl">
          Thank you for completing a Client Satisfaction Survey
        </h3>
        <img
          className="h-auto mb-6 rounded-lg mx-auto"
          alt="NORA Logo"
          src="/nora_logo.png"
        />
        <h3 className="mb-5  text-purple-800 mt-5 font-bold text-center text-xl">
          You may close this tab / browser / application
        </h3>
      </main>
    );
  } else {
    return (
      <main className="container sm:w-3/4 m-5 p-5 mx-auto w-full">
        <Stepper active_link="complete" />
        <h3 className=" text-red-800 font-bold text-center text-3xl mb-5">
          There was an error saving your complete survey
        </h3>
        <p className=" text-gray-800 font-bold text-center text-xl">
          Please contact your assigned counselor or{" "}
          <a
            href="mailto:app_support@norainc.org"
            className="hover:text-purple-500"
          >
            NORA app_support
          </a>
        </p>
      </main>
    );
  }
};

export default EndSurvey;
