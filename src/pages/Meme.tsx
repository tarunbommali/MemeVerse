import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Ensure this path is correct for your project structure
// import type { RootState } from "../store/appStore";
import Comments from "../components/Comments"; // Ensure path is correct
import MemePost from "../components/MemePost";   // Ensure path is correct
import { useState, useEffect } from "react";

// Define MemeType and RootState based on your actual data structure
// This is an example based on the provided JSON snippet
interface MemeType {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
  preview: string[];
  // If your memes have a unique 'id' field that's not part of postLink,
  // you might prefer to use that.
}

interface RootState {
  memes: {
    memes: MemeType[];
    // other properties in your memes slice
  };
  // other top-level state slices
}

/**
 * Extracts the meme ID from a postLink.
 * Example: "https://redd.it/1kona44" -> "1kona44"
 * @param postLink The full URL string of the meme post.
 * @returns The extracted ID string, or undefined if not found or invalid.
 */
const extractIdFromPostLink = (postLink: string): string | undefined => {
  if (!postLink) return undefined;
  const parts = postLink.split('/');
  // Pop the last part, or the second to last if there's a trailing slash
  const potentialId = parts.pop() || parts.pop();
  // Basic validation: check if it looks like a typical Reddit ID (alphanumeric)
  return potentialId?.match(/^[a-zA-Z0-9]+$/) ? potentialId : undefined;
};

const Meme = () => {
  const { id: currentMemeRouteId } = useParams<{ id: string }>(); // ID from URL path parameter
  const navigate = useNavigate();
  const allMemes = useSelector((state: RootState) => state.memes.memes);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentMeme, setCurrentMeme] = useState<MemeType | null>(null);

  // Effect 1: Synchronize currentIndex and currentMeme based on URL ID and allMemes list
  useEffect(() => {
    if (allMemes && allMemes.length > 0 && currentMemeRouteId) {
      const foundIndex = allMemes.findIndex(
        (meme) => extractIdFromPostLink(meme.postLink) === currentMemeRouteId
      );

      if (foundIndex !== -1) {
        setCurrentIndex(foundIndex);
        setCurrentMeme(allMemes[foundIndex]);
      } else {
        // ID from URL not found in memes list
        console.warn(`Meme with route ID ${currentMemeRouteId} not found in the available memes.`);
        setCurrentIndex(null);
        setCurrentMeme(null);
        
      }
    } else if (allMemes && allMemes.length > 0 && !currentMemeRouteId) {
      // Case: Navigated to /meme/ without an ID. Redirect to the first meme by default.
      console.log("No meme ID in URL, attempting to load the first meme.");
      const firstMemeId = extractIdFromPostLink(allMemes[0].postLink);
      if (firstMemeId) {
        navigate(`/meme/${firstMemeId}`, { replace: true });
      }
    } else {
      // Memes are not loaded yet, or the list is empty
      setCurrentIndex(null);
      setCurrentMeme(null);
    }
  }, [currentMemeRouteId, allMemes, navigate]);


  const loadNextMeme = () => {
    if (currentIndex !== null && allMemes && currentIndex < allMemes.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextMemeToDisplay = allMemes[nextIndex];
      const nextMemeId = extractIdFromPostLink(nextMemeToDisplay.postLink);
      if (nextMemeId) {
        // Navigate to the new meme's URL. The useEffect will handle state updates.
        navigate(`/meme/${nextMemeId}`);
      }
    }
  };

  const loadPreviousMeme = () => {
    if (currentIndex !== null && allMemes && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevMemeToDisplay = allMemes[prevIndex];
      const prevMemeId = extractIdFromPostLink(prevMemeToDisplay.postLink);
      if (prevMemeId) {
        // Navigate to the new meme's URL. The useEffect will handle state updates.
        navigate(`/meme/${prevMemeId}`);
      }
    }
  };

  // Display loading message if memes are not yet available from Redux
  if (!allMemes || allMemes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="text-center text-gray-500">Loading memes or no memes available...</div>
      </div>
    );
  }

  // Display "not found" if, after attempting to sync, currentMeme is still null
  // This typically means the currentMemeRouteId is invalid or not in the list
  if (!currentMeme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="text-center text-gray-500">
          Meme not found for ID: {currentMemeRouteId || "unknown"} 😔
        </div>
      </div>
    );
  }

  const isFirstMeme = currentIndex === 0;
  const isLastMeme = currentIndex === allMemes.length - 1;

  return (
    <div className="flex flex-col items-center text-start w-full min-h-screen md:px-18 bg-gray-100">
      {/* Corrected className: ensure it's a string literal */}
      <div className="flex breadcrumbs text-sm p-4 w-full text-start">
        <ul className="flex gap-2">
          <li>
            <Link to="/" className="text-blue-500 hover:underline">
              Home
            </Link>
          </li>
          <li className="font-semibold">/ {currentMeme.title}</li>
        </ul>
      </div>

      {/* Using max-h to prevent overflow with fixed headers/footers potentially */}
      <div className="flex flex-col md:flex-row md:h-[80vh] rounded-2xl shadow p-2 m-2 items-center justify-center w-full">
        <MemePost
          onNext={loadNextMeme}
          onPrevious={loadPreviousMeme}
          meme={currentMeme} // currentMeme is guaranteed to be non-null here
          isFirst={isFirstMeme}
          isLast={isLastMeme}
        />
        {/* Ensure Comments component receives necessary props, e.g., meme ID or object */}
        <Comments /* memeId={extractIdFromPostLink(currentMeme.postLink)} */ />
      </div>
    </div>
  );
};

export default Meme;