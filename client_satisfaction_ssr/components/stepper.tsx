const CheckICON = () => (
  <svg
    aria-hidden="true"
    className="w-5 h-5 mx-auto"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    ></path>
  </svg>
);
const Stepper = ({ active_link }: { active_link: string }) => {
  return (
    <ol className="flex justify-between mx-auto items-center w-full text-md font-medium text-center text-gray-500 mb-10 pb-10">
      <li
        className={
          active_link === "begin"
            ? "flex-col items-center text-amber-300"
            : "flex items-center mt-5"
        }
      >
        {active_link === "begin" && <CheckICON />}
        Personal Information
      </li>
      <li
        className={
          active_link === "interview"
            ? "flex-col items-center text-purple-600"
            : "flex items-center mt-5"
        }
      >
        {active_link === "interview" && <CheckICON />}
        Satisfaction Survey
      </li>
      <li
        className={
          active_link === "complete"
            ? "flex-col items-center text-green-600"
            : "flex items-center mt-5"
        }
      >
        {active_link === "complete" && <CheckICON />}
        Interview Complete
      </li>
    </ol>
  );
};

export default Stepper;
