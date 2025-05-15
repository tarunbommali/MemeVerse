import { motion } from "framer-motion";
 
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 flex flex-col items-center justify-center px-4 py-10">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-6xl font-extrabold text-center text-pink-600 mb-6"
      >
        Welcome to MemeSync 😂
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg md:text-xl text-center max-w-3xl text-gray-700 mb-10"
      >
        In a world full of seriousness, we chose chaos... and memes! MemeVerse is your daily dose of dopamine
        delivered straight to your screen. Whether you're into dank memes, clean fun, or just weird internet humor,
        we've got you covered.
      </motion.p>

      <div className="bg-white shadow-xl rounded-xl p-6 md:p-10 max-w-3xl w-full text-center space-y-4 border-2 border-dashed border-yellow-300">
        <p className="text-gray-800 text-md md:text-lg">
          🎯 Our mission: Spread laughter, one meme at a time.
        </p>
        <p className="text-gray-800 text-md md:text-lg">
          💡 Got memes? Upload them! Love memes? Save them! Bored? Scroll infinitely.
        </p>
        <p className="text-gray-800 text-md md:text-lg">
          🧠 Built for meme lords, by meme nerds.
        </p>
        <p className="text-pink-500 font-bold mt-4">
          Remember: A meme a day keeps the stress away.
        </p>
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        Made with 💖 + ☕ + 😂 by the MemeSync Team.
      </div>
    </div>
  );
};

export default About;
