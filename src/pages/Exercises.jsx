import { useState, useEffect } from 'react';
import { Plus, Flame, Dumbbell, Shield, Target, Timer, Users } from 'lucide-react';
import { getExercises, saveExercise } from '../services/api';
import ExerciseCard from '../components/ExerciseCard';
import ExerciseModal from '../components/ExerciseModal';

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [filter, setFilter] = useState('Entrada en calor');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'Entrada en calor', icon: Flame, desc: 'Activación' },
    { id: 'Fuerza', icon: Dumbbell, desc: 'Potencia base' },
    { id: 'Fuerza y Contacto', icon: Shield, desc: 'Impacto' },
    { id: 'Destreza', icon: Target, desc: 'Habilidades' },
    { id: 'Resistencia', icon: Timer, desc: 'Cardio' },
    { id: 'Sistema', icon: Users, desc: 'Táctica' }
  ];

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    setIsLoading(true);
    const data = await getExercises();
    setExercises(data);
    setIsLoading(false);
  };

  const handleSaveExercise = async (data) => {
    await saveExercise(data);
    setIsModalOpen(false);
    loadExercises();
  };

  const filteredExercises = exercises.filter(e => e.category === filter);

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Ejercicios Físicos</h2>
      </div>

      {/* Credenciales de Filtro */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-2 scrollbar-hide snap-x">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = filter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`snap-start shrink-0 w-36 p-3 rounded-xl border text-left transition-all ${
                isActive 
                  ? 'bg-sanpatricio-primary border-sanpatricio-primary text-white shadow-lg scale-105' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-sanpatricio-secondary'
              }`}
            >
              <Icon size={24} className={`mb-2 ${isActive ? 'text-sanpatricio-secondary' : 'text-gray-400'}`} />
              <h3 className="font-bold text-sm">{cat.id}</h3>
              <p className={`text-xs mt-1 ${isActive ? 'text-sanpatricio-light' : 'text-gray-400'}`}>
                {cat.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Grilla */}
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-sanpatricio-primary border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pb-24">
          {filteredExercises.map(exercise => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
          {filteredExercises.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              No hay ejercicios en esta categoría.
            </div>
          )}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 bg-sanpatricio-secondary text-sanpatricio-primary p-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform z-40"
      >
        <Plus size={32} strokeWidth={3} />
      </button>

      <ExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveExercise}
      />
    </div>
  );
}
