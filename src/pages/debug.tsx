import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/appStore";
import { useEffect, useState } from "react"; // Import useState and useEffect

import Comments from "../components/Comments";
import MemePost from "../components/MemePost";

const Meme = () => {
  const { id } = useParams<{ id: string }>(); // Get id like "1knw1jp"
  const navigate = useNavigate();
  const memes = useSelector((state: RootState) => state.memes.memes);

  const [activeMemeIndex, setActiveMemeIndex] = useState<number | null>(null);
  
  useEffect(() => {
    if (memes.length > 0 && id) {
      // The id from params is already the extracted one.
      // The `id` property on the meme object in Redux store is also the extracted one.
      const currentIndex = memes.findIndex((meme) => meme.id === id);
      console.log(currentIndex +"current Index")
      if (currentIndex !== -1) {
        setActiveMemeIndex(currentIndex);
      } else {
        console.warn(`Meme with id ${id} not found in Redux store.`);
        // Potentially navigate('/not-found') or fetch the specific meme if API allows
      }
    }
  }, [id, memes]);

  const currentMeme = activeMemeIndex !== null ? memes[activeMemeIndex] : undefined;

  console.log(currentMeme)

  

  if (memes.length === 0 && !id) {
     // Still loading memes or no id provided yet
     return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
         <div className="text-center text-gray-500">Loading memes...</div>
        </div>
     );
  }

  if (!memes.length || !currentMeme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="text-center text-gray-500">Meme not found or still loading... 😔</div>
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center text-start w-full max-h-full md:px-18 bg-gray-100 ">
      <div className={`flex breadcrumbs text-sm p-4 w-full text-start`}>
        <ul className="flex gap-2">
          <li>
            <Link to="/" className="text-blue-500">
              Home
            </Link>
          </li>
          <li className="font-semibold">/ {currentMeme.title}</li>
        </ul>
      </div>

      <div className="flex flex-col md:flex-row h-auto md:h-[80vh] rounded-2xl shadow p-2 m-2 items-center justify-center w-full">
        <MemePost
          meme={{ ...currentMeme, postLink: currentMeme.postLink ?? "" }}
          
        />
        <Comments />
      </div>
    </div>
  );
};

export default Meme;



