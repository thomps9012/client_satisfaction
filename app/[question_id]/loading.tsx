import Stepper from "@/components/stepper";
import Image from "next/image";
const Loading = async () => {
  return (
    <main className="container sm:w-4/5 m-5 p-5 mx-auto w-full h-screen">
      <Stepper active_link="interview" />
      <Image
        className="w-auto md:h-auto mt-24 rounded-lg animate-ping mx-auto"
        alt="NORA Logo"
        src="/nora_logo.png"
      />
    </main>
  );
};

export default Loading;
