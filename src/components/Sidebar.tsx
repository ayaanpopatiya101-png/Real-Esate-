import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { signOut, profile } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/contacts', label: 'Contacts', icon: '👥' },
    { path: '/leads', label: 'Leads', icon: '🎯' },
    { path: '/transactions', label: 'Transactions', icon: '📋' },
    { path: '/tasks', label: 'Tasks', icon: '✓' },
    { path: '/calendar', label: 'Calendar', icon: '📅' },
    { path: '/campaigns', label: 'Campaigns', icon: '📧' },
    { path: '/team', label: 'Team', icon: '👔' },
    { path: '/reports', label: 'Reports', icon: '📈' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
          <h1 className="sidebar-logo">RC</h1>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {profile?.first_name?.charAt(0)}{profile?.last_name?.charAt(0)}
            </div>
            <div className="user-details">
              <p className="user-name">
                {profile?.first_name} {profile?.last_name}
              </p>
              <p className="user-email">{profile?.email}</p>
            </div>
          </div>
          <button className="btn-signout" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
