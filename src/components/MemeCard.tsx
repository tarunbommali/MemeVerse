import { motion } from "framer-motion";

type Meme = {
  id: string | number;
  url: string;
  title: string;
};

const MemeCard = (meme: Meme) => {
  return (
    <>
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
        <h3 className="text-lg font-semibold mt-2 w-full md:w-[350px] whitespace-nowrap overflow-hidden text-ellipsis">
          {meme.title}
        </h3>
      </motion.li>
    </>
  );
};

export default MemeCard;
