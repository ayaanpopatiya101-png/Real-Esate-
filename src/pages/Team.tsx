import Sidebar from '../components/Sidebar';
import './PageLayout.css';

export default function Team() {
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-main">
        <div className="page-header">
          <h1>Team Management</h1>
          <button className="btn btn-primary">+ Add Team Member</button>
        </div>
        <div className="page-content">
          <div className="empty-state">
            <p>No team members yet. Build your team!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
