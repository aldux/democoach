import { NavLink } from 'react-router-dom';
import { Dumbbell, LayoutDashboard, GraduationCap, ClipboardList } from 'lucide-react';

export default function BottomNavigationBar() {
  const navItems = [
    { path: '/', icon: Dumbbell, label: 'Ejercicios' },
    { path: '/tactical-board', icon: LayoutDashboard, label: 'Pizarra' },
    { path: '/clinic', icon: GraduationCap, label: 'Clínica' },
    { path: '/attendance', icon: ClipboardList, label: 'Asistencia' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg z-50">
      <ul className="flex justify-around items-center h-20">
        {navItems.map((item) => (
          <li key={item.path} className="flex-1 h-full">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center h-full w-full transition-colors ${
                  isActive ? 'text-sanpatricio-primary border-t-4 border-sanpatricio-secondary bg-sanpatricio-light/20' : 'text-gray-400 hover:text-sanpatricio-primary/70'
                }`
              }
            >
              <item.icon size={28} className="mb-1" />
              <span className="text-xs font-semibold">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
