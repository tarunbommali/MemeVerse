import {
  FaRedditAlien,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

interface Meme {
  url: string;
  title: string;
  postLink: string;
}

interface MemePostProps {
  meme: Meme;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const MemePost: React.FC<MemePostProps> = ({
  meme,
  onNext,
  onPrevious,
  isFirst,
  isLast,
}) => {
  return (
    <div className="flex justify-center items-center max-w-xl w-full h-full shadow-lg rounded-lg p-6 text-center">
      <button onClick={!isFirst ? onPrevious : undefined}>
        <FaChevronCircleLeft
          className={`text-2xl cursor-pointer ${
            isFirst
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-disabled={isFirst}
        />
      </button>
      <div className="flex flex-col items-center justify-center w-full h-full mx-2">
        {/* Added mx-2 for spacing */}
        <img
          src={meme.url}
          alt={meme.title}
          className="max-w-full  md:h-[80%]  rounded-md object-contain mb-4" // Adjusted image sizing and added object-contain
        />
        <h1 className="text-xl font-bold mb-4 break-words">{meme.title}</h1>
        {/* Added break-words */}
        <div className="flex flex-wrap justify-center border-t-2 border-gray-200 pt-4 w-full">
          {/* Added flex-wrap and justify-center */}
          <div className="flex items-center m-2 md:mt-0 p-2 border-2 border-gray-100 rounded-2xl">
            {/* Removed md:mt-4 */}
            <a
              href={meme.postLink}
              target="_blank"
              className="flex no-underline decoration-2 items-center" // Added items-center
              rel="noopener noreferrer"
            >
              <FaRedditAlien className="mr-2 text-2xl md:text-3xl text-red-500" />
              {/* Adjusted icon size */}
              <span className="no-underline text-lg md:text-xl font-thin">
                {/* Adjusted text size */}
                Reddit
              </span>
            </a>
          </div>
          <div className="flex items-center m-2 md:mt-0 p-2 border-2 border-gray-100 rounded-2xl">
            {/* Removed md:mt-4 */}
            <a
              // href={meme.postLink} // Standard share link would be different
              href={`whatsapp://send?text=${encodeURIComponent(
                meme.title + " " + meme.url
              )}`} // Example WhatsApp share link
              data-action="share/whatsapp/share" // For mobile web support
              target="_blank"
              className="flex no-underline decoration-2 items-center" // Added items-center
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="mr-2 text-2xl md:text-3xl text-green-500" />
              {/* Adjusted icon size */}
              <span className="no-underline text-lg md:text-xl font-thin">
                {/* Adjusted text size */}
                Share
              </span>
            </a>
          </div>
        </div>
      </div>
      <button onClick={!isLast ? onNext : undefined}>
        <FaChevronCircleRight
          className={`text-2xl cursor-pointer ${
            isLast
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-disabled={isLast}
        />
      </button>
    </div>
  );
};

export default MemePost;
