import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Dumbbell, Trophy } from 'lucide-react';
import { getPlayers, savePlayersList, saveAttendance } from '../services/api';

export default function Attendance() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    setIsLoading(true);
    const data = await getPlayers();
    setPlayers(data);
    setIsLoading(false);
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;
    
    const newPlayer = {
      id: Date.now(),
      name: newPlayerName.trim(),
      training: false,
      match: false
    };
    
    const updated = [...players, newPlayer];
    setPlayers(updated);
    setNewPlayerName('');
    await savePlayersList(updated);
  };

  const handleDeletePlayer = async (id) => {
    const updated = players.filter(p => p.id !== id);
    setPlayers(updated);
    await savePlayersList(updated);
  };

  const toggleTraining = (id) => {
    setPlayers(prev => prev.map(p => 
      p.id === id ? { ...p, training: !p.training } : p
    ));
  };

  const toggleMatch = (id) => {
    setPlayers(prev => prev.map(p => 
      p.id === id ? { ...p, match: !p.match } : p
    ));
  };

  const handleSave = async () => {
    await saveAttendance(players);
    // Guardar el listado blanqueado para el futuro
    await savePlayersList(players.map(p => ({ ...p, training: false, match: false })));
    alert('¡Planilla guardada con éxito! La lista base se limpió para la próxima vez.');
    loadPlayers(); // Recargar limpios
  };

  const totalTraining = players.filter(p => p.training).length;
  const totalMatch = players.filter(p => p.match).length;
  
  const today = new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="p-4 h-full flex flex-col bg-gray-50">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Planilla de Asistencia</h2>
        <p className="text-gray-500 text-sm capitalize">{today}</p>
        
        <div className="flex justify-center gap-4 mt-4">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center min-w-[120px]">
            <span className="text-xs text-gray-500 font-semibold uppercase">Entrenamiento</span>
            <span className="text-2xl font-black text-sanpatricio-primary">{totalTraining}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center min-w-[120px]">
            <span className="text-xs text-gray-500 font-semibold uppercase">Partido</span>
            <span className="text-2xl font-black text-blue-600">{totalMatch}</span>
          </div>
        </div>
      </div>

      {/* Formulario Agregar Jugador */}
      <form onSubmit={handleAddPlayer} className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="Nombre del jugador..."
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-sanpatricio-primary focus:ring-1 focus:ring-sanpatricio-primary bg-white shadow-sm"
        />
        <button 
          type="submit" 
          disabled={!newPlayerName.trim()}
          className="bg-sanpatricio-secondary text-sanpatricio-primary p-3 rounded-xl shadow-sm font-bold disabled:opacity-50"
        >
          <Plus size={24} />
        </button>
      </form>

      {isLoading ? (
        <div className="flex-1 flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-sanpatricio-primary border-t-transparent"></div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pb-24 space-y-3">
          {players.map(player => {
            const isActive = player.training || player.match;
            return (
              <div key={player.id} className={`bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between transition-colors ${isActive ? 'border-sanpatricio-primary/30 bg-sanpatricio-light/10' : 'border-gray-100'}`}>
                
                <button 
                  onClick={() => handleDeletePlayer(player.id)}
                  className="text-gray-300 hover:text-red-500 mr-2 p-1"
                  title="Eliminar jugador"
                >
                  <Trash2 size={18} />
                </button>

                <span className={`font-semibold text-lg flex-1 ${isActive ? 'text-sanpatricio-primary' : 'text-gray-500'}`}>
                  {player.name}
                </span>
                
                <div className="flex items-center gap-3">
                  {/* Botón de Entrenamiento */}
                  <button 
                    onClick={() => toggleTraining(player.id)}
                    className={`flex items-center justify-center p-3 rounded-xl transition-all w-14 h-12 ${
                      player.training 
                        ? 'bg-sanpatricio-primary text-white shadow-md' 
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                    }`}
                  >
                    <Dumbbell size={22} />
                  </button>

                  {/* Botón de Partido */}
                  <button 
                    onClick={() => toggleMatch(player.id)}
                    className={`flex items-center justify-center p-3 rounded-xl transition-all w-14 h-12 ${
                      player.match 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                    }`}
                  >
                    <Trophy size={22} />
                  </button>
                </div>
              </div>
            );
          })}
          
          {players.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No hay jugadores en la lista. ¡Agrega uno arriba!
            </div>
          )}
        </div>
      )}

      {/* FAB Guardar */}
      {players.length > 0 && (
        <button
          onClick={handleSave}
          className="fixed bottom-24 right-1/2 translate-x-1/2 bg-sanpatricio-primary text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-bold hover:scale-105 active:scale-95 transition-transform z-40"
        >
          <Save size={20} /> Guardar Planilla
        </button>
      )}
    </div>
  );
}
