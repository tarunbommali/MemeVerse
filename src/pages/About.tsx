/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import aboutLocales from "../locales/aboutLocales";
import { useSelector } from "react-redux";
import type { RootState } from "../store/appStore";
import Accordion from "../components/Accordion";

type LocaleKey = keyof typeof aboutLocales;

const About = () => {
  // Get selected language from Redux store

  const currentLang = useSelector((state: RootState) => state.locale.language);

  // ✅ Fallback to English if currentLang not found in aboutLocales
  const content = aboutLocales[currentLang as LocaleKey] || aboutLocales["en"];

  return (
    <div className="min-h-screen bg-gradient-to-br p-2 md:p-4 from-yellow-100 via-pink-100 to-purple-100 flex flex-col items-center justify-center ">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-xl md:text-2xl  p-2 font-thin text-center text-pink-600 mb-6"
      >
        {content.heading}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg md:text-xl text-center font-light max-w-3xl text-gray-700 mb-10"
      >
        {content.paragraph}
      </motion.p>

      <div className="bg-white shadow-xl rounded-xl p-6 md:p-10 max-w-3xl w-full  space-y-4 border-2 border-dashed border-yellow-300">
        {content.points.map((point, index) => (
          <p
            key={index}
            className={`text-md md:text-lg ${
              index === content.points.length - 1
                ? "text-pink-500 font-bold mt-4"
                : "text-gray-800"
            }`}
          >
            {point}
          </p>
        ))}
      </div>
      {/*  Accordion */}
      {Array.isArray((content as any).accordion) && (content as any).accordion.length > 0 && (
        <Accordion accordionData={(content as any).accordion} />
      )}
      {/* Footer */}
      <p className="flex justify-center w-full text-center">
        {content.footer}
      </p>
    </div>
  );
};

export default About;
