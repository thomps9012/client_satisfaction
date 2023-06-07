import SelectAnswer from "@/components/selectAnswer";
import Stepper from "@/components/stepper";
import TextAnswer from "@/components/textAnswer";
import { getQuestion } from "@/utils/db";
import { QuestionInfo } from "@/utils/types";

const QuestionPage = async ({
  params,
}: {
  params: { question_id: string };
}) => {
  const { question_id } = params;
  if (parseInt(question_id) === Number.NaN) {
    throw new Error("question is not available");
  }
  const question_data = (await getQuestion(question_id)) as QuestionInfo;
  const { _id, open_ended, question } = question_data;
  return (
    <main className="container w-3/4 m-5 p-5 mx-auto">
      <Stepper active_link="interview" />
      <h1 className="text-2xl text-center font-bold m-5 p-5 text-gray-900">
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
