import { useEffect, useState } from "react";
import MemeCard from "../components/MemeCard";
const MEMES_API_URL = "https://meme-api.com/gimme/20";

type Meme = {
  id: string | number;
  url: string;
  title: string;
  // add other properties if needed
};

const Home = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);

  const handleFetchMeme = async () => {
    try {
      const response = await fetch(MEMES_API_URL);
      const data = await response.json();

      setMemes((prevData) => [...prevData, ...data.memes]);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching memes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchMeme();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      console.log("Fetching more data...");
      handleFetchMeme();
    }
  };

  return (
    <div className="container mx-auto  md:p-4">
      <div className="container mx-auto md:p-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4  gap-4 p-4 mb-5">
          {!loading &&
            memes.map((meme) => <MemeCard key={meme.id} {...meme} />)}

          {loading &&
            Array.from({ length: 20 }, (_, index) => (
              <li
                key={index}
                className="animate-pulse bg-gray-200 rounded-lg p-4"
              >
                <div className="w-full md:h-[350px] bg-white shadow-2xl rounded-lg" />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
