import { TITLE } from "../lib/constants";
const Intro: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        {TITLE}
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        明るく楽しく元気よく
      </h4>
    </section>
  );
};

export default Intro;
