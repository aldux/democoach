import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNavigationBar from './components/BottomNavigationBar';
import Exercises from './pages/Exercises';
import TacticalBoard from './pages/TacticalBoard';
import Clinic from './pages/Clinic';
import Attendance from './pages/Attendance';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
        <header className="bg-sanpatricio-primary text-white p-4 shadow-md flex items-center justify-center">
          <h1 className="text-xl font-bold tracking-wider">Junior Rugby Coach</h1>
        </header>
        
        <main className="flex-1 overflow-y-auto pb-20 relative">
          <Routes>
            <Route path="/" element={<Exercises />} />
            <Route path="/tactical-board" element={<TacticalBoard />} />
            <Route path="/clinic" element={<Clinic />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </main>
        
        <BottomNavigationBar />
      </div>
    </Router>
  );
}

export default App;
