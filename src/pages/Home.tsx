/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMemes, setLoading } from "../store/memesSlice";
import MemeCard from "../components/MemeCard";
import ShimmerMemeCard from "../components/ShimmerMemeCard";
import type { RootState } from "../store/appStore";

// API endpoint
const MEMES_API_URL = "https://meme-api.com/gimme/20";

// Utility to extract unique ID from meme URL
const extractIdFromUrl = (url: string): string => {
  const match = url.match(/i\.redd\.it\/([a-zA-Z0-9]+)\./);
  return match ? match[1] : url;
};

const Home = () => {
  const dispatch = useDispatch();
  const memes = useSelector((state: RootState) => state.memes?.memes ?? []);
  const loading = useSelector((state: RootState) => state.memes?.loading ?? false);
  const isFetching = useRef(false);

  // Fetch memes from the API
  const handleFetchMeme = async () => {
    if (isFetching.current) return;

    try {
      isFetching.current = true;
      dispatch(setLoading(true));
      const response = await fetch(MEMES_API_URL);
      const data = await response.json();

      // Add unique IDs to memes
      const formattedMemes = data.memes.map((meme: any) => ({
        id: extractIdFromUrl(meme.url),
        url: meme.url,
        title: meme.title,
        postLink: meme.postLink,
      }));

      dispatch(addMemes(formattedMemes));
    } catch (error) {
      console.error("Error fetching memes:", error);
    } finally {
      dispatch(setLoading(false));
      isFetching.current = false;
    }
  };

  // Handle infinite scroll
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
    <div className="container mx-auto px-2 md:px-4 pb-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {memes.map((meme, idx) => (
          <MemeCard key={`${meme.postLink ?? ""}${idx}`} {...meme} postLink={meme.postLink || ""} />
        ))}
      </ul>
      {loading && <ShimmerMemeCard />}
    </div>
  );
};

export default Home;
