import { useEffect, useState, useRef } from "react";
import MemeCard from "../components/MemeCard";

import ShimmerMemeCard from "../components/ShimmerMemeCard";

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
    <div className="container mx-auto px-2 md:px-4  pb-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {memes.map((meme) => (
          <MemeCard {...meme} />
        ))}
      </ul>
      {loading && <ShimmerMemeCard />}
    </div>
  );
};

export default Home;
