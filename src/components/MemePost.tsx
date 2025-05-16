import { FaRedditAlien } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

interface Meme {
  url: string;
  title: string;
  postLink: string;
}

interface MemePostProps {
  meme: Meme;
}

const MemePost: React.FC<MemePostProps> = ({ meme }) => {
  return (
    <div className="flex flex-col justify-center items-center max-w-xl w-full h-full   shadow-lg rounded-lg p-6 text-center">
      <img
        src={meme.url}
        alt={meme.title}
        className="max-w-full h-[80%] rounded-md"
      />
      <h1 className="text-xl font-bold mb-4">{meme.title}</h1>

      <div className="flex border-t-2 border-gray-200 pt-4 w-full">
        <div className="flex items-center m-2 md:mt-4 p-2 border-2 border-gray-100 rounded-2xl">
          <a
            href={meme.postLink}
            target="_blank"
            className="flex no-underline decoration-2"
            rel="noopener noreferrer"
          >
            <FaRedditAlien className="mr-2 text-2xl md:text-4xl text-red-500" />
            <span className="no-underline text-2xl font-thin underline-">
              Reddit
            </span>
          </a>
        </div>

        <div className="flex items-center m-2 md:mt-4 p-2 border-2 border-gray-100 rounded-2xl">
          <a
            href={meme.postLink}
            target="_blank"
            className="flex no-underline decoration-2"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="mr-2 text-2xl  md:text-4xl text-green-500" />
            <span className="no-underline text-2xl font-thin underline-">
              Share
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MemePost;
