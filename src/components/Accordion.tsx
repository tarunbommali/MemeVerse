/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from "react";
import AccordionItem from "./AccordionItem";


interface AccordionProps {
  accordionData: { title: string; content: string }[];
}

const Accordion = ({ accordionData }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col my-10 bg-white shadow-xl rounded-xl p-6 md:p-10 max-w-3xl w-full  space-y-4 border-2 border-dashed border-yellow-300">
      {accordionData &&
        accordionData.map(
          (item: { title: string; content: string }, index: number) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
              isOpen={activeIndex === index}
              setActiveIndex={() => {
                activeIndex === index
                  ? setActiveIndex(null)
                  : setActiveIndex(index);
              }}
            />
          )
        )}

      
    </div>
  );
};

export default Accordion;
