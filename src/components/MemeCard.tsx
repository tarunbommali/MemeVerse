import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type Meme = {
  id: string | number;
  postLink: string;
  url: string;
  title: string;
};

function extractMemeId(postLink: string): string | null {
  const match = postLink.match(/redd\.it\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}


const MemeCard = (meme: Meme) => {
  return (
    <Link to={`/meme/${extractMemeId(meme.postLink)}`}>
      <motion.li
        key={meme.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col bg-white shadow-md  rounded-lg m-2 p-4"
      >
        <img
          src={meme.url}
          alt={meme.title}
          className="w-full md:h-[350px] rounded-lg"
        />
        <h3 className="text-lg font-semibold mt-2 w-full md:w-[320px] whitespace-nowrap overflow-hidden text-ellipsis">
          {meme.title}
        </h3>
      </motion.li>
    </Link>
  );
};

export default MemeCard;
