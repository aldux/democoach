import { useState, useRef, useEffect } from 'react';
import { Save, Download, PlusCircle, Trash2 } from 'lucide-react';
import { savePlay, getPlays } from '../services/api';
import Token from '../components/Token';

export default function TacticalBoard() {
  const [tokens, setTokens] = useState([]);
  const [plays, setPlays] = useState({});
  const [playName, setPlayName] = useState('');
  const boardRef = useRef(null);

  useEffect(() => {
    const loadPlays = async () => {
      const data = await getPlays();
      setPlays(data);
    };
    loadPlays();
  }, []);

  const addToken = (type) => {
    const newToken = {
      id: Date.now().toString(),
      type,
      x: 50 + tokens.length * 20, // Initial offset
      y: 50,
    };
    setTokens([...tokens, newToken]);
  };

  const handleDragEnd = (id, point) => {
    // In a real app with framer-motion drag, getting relative coordinates to the container
    // requires tracking the bounding rect. For simplicity in this mock, we let framer motion 
    // handle the visual state and just update our state on save.
    // To do it properly, we'd use useDrag or capture the offset.
    // For this POC, we update the token array manually by trying to calculate relative position.
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    
    // Calculate relative coordinates and clamp them to the container bounds
    // Token size is roughly 44px, we'll clamp to (rect.width - 44)
    let relativeX = point.x - rect.left;
    let relativeY = point.y - rect.top;
    
    relativeX = Math.max(0, Math.min(relativeX, rect.width - 44));
    relativeY = Math.max(0, Math.min(relativeY, rect.height - 44));

    setTokens(tokens.map(t => t.id === id ? { ...t, x: relativeX, y: relativeY } : t));
  };

  const handleSave = async () => {
    if (!playName) {
      alert('Ingresa un nombre para la jugada');
      return;
    }
    await savePlay(playName, tokens);
    const data = await getPlays();
    setPlays(data);
    setPlayName('');
    alert('Jugada guardada');
  };

  const handleLoad = (name) => {
    const loadedTokens = plays[name] || [];
    if (!boardRef.current) {
      setTokens(loadedTokens);
      return;
    }
    
    const width = boardRef.current.clientWidth;
    const height = boardRef.current.clientHeight;
    
    const converted = loadedTokens.map((t, index) => {
      let newX = t.x;
      let newY = t.y;
      if (t.isPercent) {
        newX = (t.x / 100) * width - 24; // -24 to center the token (approx)
        newY = (t.y / 100) * height - 24;
      }
      return {
        ...t,
        id: `${t.type}-${Date.now()}-${index}`, // Force re-render for Framer Motion
        x: newX,
        y: newY,
        isPercent: false
      };
    });
    setTokens(converted);
  };

  const handleClear = () => {
    setTokens([]);
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <div className="pt-4 pb-2 text-center bg-white z-10 relative">
        <h2 className="text-2xl font-bold text-gray-800">Pizarra Táctica</h2>
      </div>
      
      {/* Top Toolbar */}
      <div className="bg-white p-2 shadow-sm flex flex-wrap gap-2 items-center justify-between z-10">
        <div className="flex gap-2">
          <button onClick={() => addToken('forward')} className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-bold">
            <PlusCircle size={16} /> Fwd
          </button>
          <button onClick={() => addToken('back')} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-bold">
            <PlusCircle size={16} /> Back
          </button>
          <button onClick={() => addToken('ball')} className="flex items-center gap-1 bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm font-bold">
            <PlusCircle size={16} /> Bola
          </button>
        </div>
        
        <button onClick={handleClear} className="flex items-center gap-1 bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors">
          <Trash2 size={16} /> Borrar
        </button>
      </div>

      {/* Board Container */}
      <div className="flex-1 flex justify-center bg-gray-200 overflow-hidden py-4">
        
        {/* Pitch Area */}
        <div 
          ref={boardRef}
          className="w-[90%] max-w-md h-full bg-green-600 relative shadow-2xl border-4 border-white rounded-sm overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: 'center'
          }}
        >
          {/* IN-GOAL AREA */}
          <div className="absolute top-0 w-full h-[15%] bg-green-700/50 border-b-4 border-white"></div>
          
          {/* H - Goal Posts on Try Line */}
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-8 flex justify-between items-end z-0">
            <div className="w-1.5 h-full bg-white shadow-sm"></div>
            <div className="w-full h-1.5 bg-white absolute top-1/2 -translate-y-1/2"></div>
            <div className="w-1.5 h-full bg-white shadow-sm"></div>
          </div>

          {/* 5m line from Try Line (dashed) */}
          <div className="absolute top-[25%] w-full border-b-2 border-white/60 border-dashed"></div>

          {/* 22m line (solid) */}
          <div className="absolute top-[45%] w-full border-b-2 border-white/80"></div>

          {/* 10m line from halfway (dashed) */}
          <div className="absolute bottom-[20%] w-full border-b-2 border-white/60 border-dashed"></div>

          {/* Halfway line (Bottom edge of our visible pitch, though we add a thick line to represent it) */}
          <div className="absolute bottom-0 w-full border-b-4 border-white"></div>
          
          {/* 5m and 15m lines parallel to touch (Left) */}
          <div className="absolute left-[10%] top-[15%] bottom-0 border-l-2 border-white/40 border-dashed"></div>
          <div className="absolute left-[30%] top-[15%] bottom-0 border-l-2 border-white/40 border-dashed"></div>
          
          {/* 5m and 15m lines parallel to touch (Right) */}
          <div className="absolute right-[10%] top-[15%] bottom-0 border-r-2 border-white/40 border-dashed"></div>
          <div className="absolute right-[30%] top-[15%] bottom-0 border-r-2 border-white/40 border-dashed"></div>

          {/* Tokens */}
          {tokens.map(token => (
            <Token 
              key={token.id} 
              id={token.id} 
              type={token.type} 
              initialPosition={{ x: token.x, y: token.y }}
              onDragEnd={handleDragEnd}
              dragConstraints={boardRef}
            />
          ))}
        </div>
      </div>

      {/* Bottom Toolbar for Saving/Loading */}
      <div className="bg-white p-3 shadow-md flex flex-col gap-3 pb-4">
        <div className="flex gap-2 items-center w-full">
          <input 
            type="text" 
            placeholder="Nombre de jugada..."
            className="border rounded px-3 py-2 text-sm outline-none focus:border-sanpatricio-primary flex-1 bg-gray-50"
            value={playName}
            onChange={(e) => setPlayName(e.target.value)}
          />
          <button onClick={handleSave} className="bg-sanpatricio-primary text-white p-2 rounded-lg font-bold flex items-center gap-1 shadow-sm">
            <Save size={18} /> Guardar
          </button>
        </div>
        
        <div className="w-full h-px bg-gray-200 my-1"></div>
        
        <div className="flex flex-wrap gap-2">
          {Object.keys(plays).map(name => (
            <button 
              key={name}
              onClick={() => handleLoad(name)}
              className="flex items-center gap-1.5 bg-sanpatricio-light text-sanpatricio-primary border border-sanpatricio-primary/20 px-3 py-1.5 rounded-lg text-sm font-semibold shadow-sm active:scale-95 transition-transform"
            >
              <Download size={16} /> {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
