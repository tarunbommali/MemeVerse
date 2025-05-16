import { useEffect, useState, useRef } from "react";
import MemeCard from "../components/MemeCard";
import { motion, AnimatePresence } from "framer-motion";

const MEMES_API_URL = "https://meme-api.com/gimme/20";

type Meme = {
  id: string | number;
  url: string;
  title: string;
};

const Home = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false);

  const handleFetchMeme = async () => {
    if (isFetching.current) return;

    try {
      isFetching.current = true;
      setLoading(true);

      const response = await fetch(MEMES_API_URL);
      const data = await response.json();

      setMemes((prevData) => [...prevData, ...data.memes]);
    } catch (error) {
      console.error("Error fetching memes:", error);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
      handleFetchMeme();
    }
  };

  useEffect(() => {
    handleFetchMeme();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {memes.map((meme) => (
          <motion.li
            key={meme.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MemeCard {...meme} />
          </motion.li>
        ))}
      </ul>

      {/* Skeleton Loader with Framer Motion */}
      <AnimatePresence>
        {loading && (
          <motion.ul
            key="skeletons"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.li
                key={index}
                className="bg-gray-200 rounded-lg p-4 animate-pulse"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="w-full md:h-[350px] bg-white shadow-2xl rounded-lg" />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
