import { NavLink, Outlet } from 'react-router-dom';
import { Home, Users, Search, BookOpen, Activity } from 'lucide-react';

export function Layout() {
  return (
    <div className="app-layout">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <Activity size={28} />
            <span>FHIR Explorer</span>
          </div>
          <p className="tagline">Learn Healthcare Interoperability</p>
        </div>

        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/patients" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Users size={20} />
            <span>Patients</span>
          </NavLink>

          <NavLink to="/explorer" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Search size={20} />
            <span>API Explorer</span>
          </NavLink>

          <NavLink to="/learn" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <BookOpen size={20} />
            <span>Learn FHIR</span>
          </NavLink>
        </div>

        <div className="sidebar-footer">
          <div className="server-status">
            <span className="status-dot"></span>
            <span>HAPI FHIR R4</span>
          </div>
          <p className="version">FHIR R4 (4.0.1)</p>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
