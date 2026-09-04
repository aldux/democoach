import { useState, useEffect } from 'react';
import { MoveRight, ShieldAlert, ShieldHalf, ArrowUpFromLine } from 'lucide-react';
import ClinicCard from '../components/ClinicCard';
import { getClinicData } from '../services/api';

export default function Clinic() {
  const [filter, setFilter] = useState('Pase');
  const [clinicData, setClinicData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fundamentals = [
    { id: 'Pase', icon: MoveRight, desc: 'Juego de manos' },
    { id: 'Tackle', icon: ShieldAlert, desc: 'Defensa baja' },
    { id: 'Ruck', icon: ShieldHalf, desc: 'Juego en el piso' },
    { id: 'Line-out', icon: ArrowUpFromLine, desc: 'Formación aérea' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const data = await getClinicData();
    setClinicData(data);
    setIsLoading(false);
  };

  const filteredData = clinicData.filter(item => item.category === filter);

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Clínica de Fundamentos</h2>
        <p className="text-gray-500 text-sm mt-1">Aprende la técnica paso a paso</p>
      </div>

      {/* Credenciales de Filtro */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-2 scrollbar-hide snap-x">
        {fundamentals.map(cat => {
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

      {/* Lista */}
      <div className="flex-1 overflow-y-auto pb-24">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-sanpatricio-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map(item => (
              <ClinicCard key={item.id} data={item} />
            ))}
            {filteredData.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-10">
                Próximamente más contenido de {filter}.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
