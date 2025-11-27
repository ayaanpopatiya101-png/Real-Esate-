import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

interface DashboardMetrics {
  activeLeads: number;
  pendingTransactions: number;
  upcomingTasks: number;
  recentContacts: number;
}

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeLeads: 0,
    pendingTransactions: 0,
    upcomingTasks: 0,
    recentContacts: 0,
  });

  useEffect(() => {
    if (user?.id) {
      fetchMetrics();
    }
  }, [user?.id]);

  const fetchMetrics = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];

      const [leads, transactions, tasks, contacts] = await Promise.all([
        supabase
          .from('leads')
          .select('id', { count: 'exact' })
          .eq('user_id', user?.id),
        supabase
          .from('transactions')
          .select('id', { count: 'exact' })
          .eq('user_id', user?.id)
          .neq('status', 'closed'),
        supabase
          .from('tasks')
          .select('id', { count: 'exact' })
          .eq('user_id', user?.id)
          .eq('completed', false)
          .gte('due_date', today),
        supabase
          .from('contacts')
          .select('id', { count: 'exact' })
          .eq('user_id', user?.id),
      ]);

      setMetrics({
        activeLeads: leads.count || 0,
        pendingTransactions: transactions.count || 0,
        upcomingTasks: tasks.count || 0,
        recentContacts: contacts.count || 0,
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, {profile?.first_name}!</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary">+ New Contact</button>
            <button className="btn btn-primary">+ New Lead</button>
          </div>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">🎯</div>
            <div className="metric-content">
              <h3>Active Leads</h3>
              <p className="metric-value">{metrics.activeLeads}</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">📋</div>
            <div className="metric-content">
              <h3>Pending Transactions</h3>
              <p className="metric-value">{metrics.pendingTransactions}</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">✓</div>
            <div className="metric-content">
              <h3>Upcoming Tasks</h3>
              <p className="metric-value">{metrics.upcomingTasks}</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">👥</div>
            <div className="metric-content">
              <h3>Total Contacts</h3>
              <p className="metric-value">{metrics.recentContacts}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-section">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-btn">
                <span className="action-icon">📞</span>
                <span>Schedule Call</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📧</span>
                <span>Send Email</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">🏠</span>
                <span>Add Showing</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📈</span>
                <span>View Reports</span>
              </button>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Recent Activity</h2>
            <div className="empty-state">
              <p>No recent activity yet. Start by adding a contact or lead!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
