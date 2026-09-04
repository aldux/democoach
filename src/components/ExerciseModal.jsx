import { useState } from 'react';
import { X } from 'lucide-react';

export default function ExerciseModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({ title: '', duration: '', category: 'Entrada en calor', description: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ title: '', duration: '', category: 'Entrada en calor', description: '' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-sanpatricio-primary text-white">
          <h2 className="text-xl font-bold">Nuevo Ejercicio</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-sanpatricio-primary focus:border-sanpatricio-primary outline-none"
              placeholder="Ej: Pase colgado 3v2"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duración / Repeticiones</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-sanpatricio-primary focus:border-sanpatricio-primary outline-none"
              placeholder="Ej: 15 min"
              value={formData.duration}
              onChange={e => setFormData({...formData, duration: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-sanpatricio-primary focus:border-sanpatricio-primary outline-none resize-none h-24"
              placeholder="Explica cómo se hace..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-sanpatricio-primary focus:border-sanpatricio-primary outline-none bg-white"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="Entrada en calor">Entrada en calor</option>
              <option value="Fuerza">Fuerza</option>
              <option value="Fuerza y Contacto">Fuerza y Contacto</option>
              <option value="Destreza">Destreza</option>
              <option value="Resistencia">Resistencia</option>
              <option value="Sistema">Sistema</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="mt-4 bg-sanpatricio-secondary text-sanpatricio-primary font-bold text-lg py-4 rounded-xl shadow-md hover:brightness-105 active:scale-[0.98] transition-all"
          >
            Guardar Ejercicio
          </button>
        </form>
      </div>
    </div>
  );
}
