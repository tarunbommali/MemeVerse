import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/appStore";

import Comments from "../components/Comments";
import MemePost from "../components/MemePost";

const Meme = () => {
  const { id } = useParams(); // gets id like "1knw1jp"
  const memes = useSelector((state: RootState) => state.memes.memes);

  // Find the meme whose postLink contains the given id
  const meme = memes.find((meme) => meme.postLink?.includes(id || ""));

  if (!meme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="text-center text-gray-500">Meme not found 😔</div>
      </div>
    );
  }

  return (
    //   <header className="flex justify-between fixed top-0 w-full  px-4 md:px-16 items-center bg-amber-500 text-white p-4 z-50">
    <div className="flex flex-col items-center text-start w-full max-h-full  md:px-18  bg-gray-100 ">
      <div className={`flex breadcrumbs text-sm p-4  w-full text-start`}>
        <ul className="flex gap-2">
          <li>
            <Link to="/" className="text-blue-500">
              Home
            </Link>
          </li>
          <li className="font-semibold">/ {meme.title}</li>
        </ul>
      </div>

      {/* body container */}
      <div className="flex flex-col md:flex-row h-auto md:h-[80vh] rounded-2xl shadow p-2 m-2 items-center justify-center w-full">
        <MemePost meme={{ ...meme, postLink: meme.postLink ?? "" }} />
        {/* Nested Comments */}
        <Comments />
      </div>
    </div>
  );
};

export default Meme;
