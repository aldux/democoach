import { motion } from 'framer-motion';

export default function Token({ id, type, initialPosition, onDragEnd, dragConstraints }) {
  // Styles based on token type
  let bgClass = '';
  let text = '';
  
  if (type === 'forward') {
    bgClass = 'bg-red-600 border-red-800';
    text = 'F';
  } else if (type === 'back') {
    bgClass = 'bg-blue-600 border-blue-800';
    text = 'B';
  } else if (type === 'ball') {
    bgClass = 'bg-white border-gray-400';
    text = '🏉';
  }

  return (
    <motion.div
      drag
      dragConstraints={dragConstraints}
      dragElastic={0}
      dragMomentum={false}
      initial={initialPosition}
      onDragEnd={(event, info) => onDragEnd(id, info.point)}
      className={`absolute w-11 h-11 text-sm rounded-full border-2 shadow-lg flex justify-center items-center font-bold text-white cursor-grab active:cursor-grabbing z-30 ${bgClass}`}
      style={{ touchAction: "none" }} // Important for touch devices
    >
      {text}
    </motion.div>
  );
}
