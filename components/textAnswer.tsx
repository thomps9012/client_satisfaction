import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { saveAnswer } from "@/utils/db";
const TextAnswer = async ({ question_id }: { question_id: number }) => {
  const submitAnswer = async (data: FormData) => {
    "use server";
    const interview_id = cookies().get("interview_id")?.value;
    if (
      data.get("open-answer")?.length === 0 ||
      data.get("open-answer") === ""
    ) {
      throw new Error("Answer is required to proceed");
    }
    const ok = await saveAnswer({
      interview_id: interview_id as string,
      question_id: question_id,
      answer_value: data
        .get("open-answer")
        ?.toString()
        .toLowerCase()
        .trim() as string,
    });
    if (ok) {
      question_id + 1 === 47
        ? redirect("/end")
        : redirect(`/${question_id + 1}`);
    }
  };

  return (
    <form className="container mx-auto w-3/4 my-10" action={submitAnswer}>
      <textarea
        className="block p-2.5 mb-5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
        placeholder="Your thoughts here..."
        style={{ height: 250 }}
        required
        name="open-answer"
      ></textarea>
      <button
        type="submit"
        id="open-answer-submit"
        className="text-lg font-light tracking-wide justify-center w-full cursor-pointer inline-flex items-center rounded-md bg-white px-3 py-2 text-grey-900 shadow-sm ring-1 ring-inset ring-purple-100 hover:bg-purple-50"
      >
        Submit Answer
      </button>
    </form>
  );
};

export default TextAnswer;
