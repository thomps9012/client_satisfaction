import { getAnswerOptions, saveAnswer } from "@/utils/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { retrieveIcon } from "@/utils/retrieve_icon";

const SelectAnswer = async ({ question_id }: { question_id: number }) => {
  const answer_options = await getAnswerOptions();
  const submitAnswer = async (data: FormData) => {
    "use server";
    const interview_id = cookies().get("interview_id")?.value;
    const value = data.get("answer_choice") as string;
    if (value.length === 0 || value === "") {
      throw new Error("Answer is required to proceed");
    }
    const ok = await saveAnswer({
      interview_id: interview_id as string,
      question_id: question_id,
      answer_value: parseInt(value),
    });
    if (ok) {
      question_id + 1 === 47
        ? redirect("/end")
        : redirect(`/${question_id + 1}`);
    }
  };

  return answer_options.map(
    ({ _id, text, value }: { _id: number; text: string; value: number }) => (
      <form
        key={_id}
        className="mb-4 w-3/4 mx-auto"
        id="multiple_choice_answer"
        action={submitAnswer}
      >
        <button
          type="submit"
          value={value}
          key={_id}
          name="answer_choice"
          className="w-full cursor-pointer inline-flex items-center rounded-md bg-white px-3 py-2 text-grey-900 shadow-sm ring-1 ring-inset ring-purple-100 hover:bg-purple-50"
        >
          <span className="cursor-pointer ml-2 text-lg font-light tracking-wide w-full text-left">
            {text}
          </span>
          {retrieveIcon(_id)}
        </button>
      </form>
    )
  );
};

export default SelectAnswer;
