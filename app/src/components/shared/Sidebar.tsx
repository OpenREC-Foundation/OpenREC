import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', icon: 'dashboard', label: 'Dashboard' },
  { to: '/recorder', icon: 'record', label: 'Gravação' },
  { to: '/projects', icon: 'editor', label: 'Projetos' },
  { to: '/hub', icon: 'hub', label: 'Hub' },
];

const iconPaths: Record<string, JSX.Element> = {
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="9" height="9" rx="2"/>
      <rect x="13" y="2" width="9" height="5" rx="2"/>
      <rect x="13" y="9" width="9" height="13" rx="2"/>
      <rect x="2" y="13" width="9" height="9" rx="2"/>
    </svg>
  ),
  record: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="4" fill="currentColor"/>
    </svg>
  ),
  editor: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <path d="M8 10h8M8 14h5"/>
      <circle cx="18" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
  hub: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="8" cy="10" r="2" fill="currentColor" stroke="none"/>
      <circle cx="16" cy="10" r="2" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="16" r="2" fill="currentColor" stroke="none"/>
    </svg>
  ),
};

const Sidebar = () => {
  return (
    <aside className="w-16 lg:w-56 border-r border-white/5 bg-gray-950/80 backdrop-blur-xl flex flex-col py-4">
      <div className="px-4 mb-6 hidden lg:block">
        <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
          OpenREC
        </span>
      </div>
      <nav className="flex flex-col gap-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-violet-500/20 text-violet-300'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {iconPaths[item.icon]}
            <span className="hidden lg:inline">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;