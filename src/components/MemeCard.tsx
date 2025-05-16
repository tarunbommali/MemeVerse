

type Meme = {
  id: string | number;
  url: string;
  title: string;
};

const MemeCard = (meme: Meme) => {
  return (
    <>
        <li
          key={meme.id}
          className="flex flex-wrap bg-white shadow-md  rounded-lg p-4"
        >
          <img
            src={meme.url}
            alt={meme.title}
            className="w-full md:h-[350px] rounded-lg"
          />
          <h3 className="text-lg font-semibold mt-2 w-full md:w-[350px] whitespace-nowrap overflow-hidden text-ellipsis">{meme.title}</h3>
        </li>
      
    </>
  );
};

export default MemeCard;