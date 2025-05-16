import { motion, AnimatePresence } from "framer-motion";

const ShimmerMemeCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <AnimatePresence>
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.li
                key={`skeleton-${index}`}
                className="flex flex-col bg-white shadow-md m-2 w-full h-[250px] md:h-[350px] animate-pulse rounded-lg p-4"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              />
            ))}
          </AnimatePresence>
          </div>
  )
}

export default ShimmerMemeCard