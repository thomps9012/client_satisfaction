import SelectAnswer from "@/components/selectAnswer";
import Stepper from "@/components/stepper";
import TextAnswer from "@/components/textAnswer";
import { getAllQuestions } from "@/utils/db";
import { QuestionInfo } from "@/utils/types";

const QuestionPage = async ({
  params,
}: {
  params: { question_id: string };
}) => {
  const { question_id } = params;
  if (parseInt(question_id) === Number.NaN || !question_id) {
    throw new Error("question is not available");
  }
  const questions = await getAllQuestions();
  const question_data = questions.find(
    ({ _id }) => _id === parseInt(question_id)
  ) as QuestionInfo;
  const { _id, open_ended, question } = question_data;
  return (
    <main className="container sm:w-4/5 m-5 p-5 mx-auto w-full h-screen">
      <Stepper active_link="interview" />
      <h1 className="text-xl md:text-2xl text-center font-bold -mt-6 mb-5 pb-5 text-gray-900">
        {question}
      </h1>
      {/* 
      // @ts-ignore */}
      {open_ended && <TextAnswer question_id={_id} />}
      {/* 
      // @ts-ignore */}
      {!open_ended && <SelectAnswer question_id={_id} />}
    </main>
  );
};

export default QuestionPage;
