import { Clock, Tag } from 'lucide-react';

export default function ExerciseCard({ exercise }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col h-full active:scale-[0.98] transition-transform">
      <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{exercise.title || exercise.name}</h3>
      <p className="text-sm text-gray-600 mb-3 flex-1 line-clamp-3">{exercise.description}</p>
      
      <div className="mt-auto flex flex-col gap-2">
        <div className="flex items-center text-gray-500 text-sm">
          <Tag size={16} className="mr-1 text-sanpatricio-primary" />
          <span className="font-medium bg-sanpatricio-light text-sanpatricio-primary px-2 py-0.5 rounded-full text-xs">
            {exercise.category}
          </span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <Clock size={16} className="mr-1" />
          <span>{exercise.duration}</span>
        </div>
      </div>
    </div>
  );
}
