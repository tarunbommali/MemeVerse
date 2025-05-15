import { motion } from "framer-motion";
import aboutLocales from "../locales/aboutLocales";
import { useSelector } from "react-redux";
import type { RootState } from "../store/appStore";

type LocaleKey = keyof typeof aboutLocales;

const About = () => {
  // 🔁 Get selected language from Redux store
  const currentLang = useSelector((state: RootState) => state.locale.language);

  // ✅ Fallback to English if currentLang not found in aboutLocales
  const content = aboutLocales[currentLang as LocaleKey] || aboutLocales["en"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 flex flex-col items-center justify-center px-4 py-10">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-6xl font-extrabold text-center text-pink-600 mb-6"
      >
        {content.heading}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg md:text-xl text-center max-w-3xl text-gray-700 mb-10"
      >
        {content.paragraph}
      </motion.p>

      <div className="bg-white shadow-xl rounded-xl p-6 md:p-10 max-w-3xl w-full text-center space-y-4 border-2 border-dashed border-yellow-300">
        {content.points.map((point, index) => (
          <p
            key={index}
            className={`text-md md:text-lg ${
              index === content.points.length - 1 ? "text-pink-500 font-bold mt-4" : "text-gray-800"
            }`}
          >
            {point}
          </p>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        {content.footer}
      </div>
    </div>
  );
};

export default About;
