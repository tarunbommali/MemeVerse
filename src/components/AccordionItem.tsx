import { motion, AnimatePresence } from "framer-motion";

type AccordionProps = {
  title: string;
  content: string;
  isOpen: boolean;
  setActiveIndex: () => void;
};

const AccordionItem = ({
  title,
  content,
  isOpen,
  setActiveIndex,
}: AccordionProps) => {
  return (
    <li className="flex flex-col shadow my-2 text-sm md:text-xl rounded-lg overflow-hidden border border-gray-200">
      <div
        className="flex justify-between items-center p-4 bg-slate-100 cursor-pointer hover:bg-slate-200 transition-colors duration-200"
        onClick={setActiveIndex}
      >
        <h1 className="font-semibold text-gray-800">{title}</h1>
        <motion.span
          initial={false}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl"
        >
          +
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 py-2 text-gray-600">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default AccordionItem;
