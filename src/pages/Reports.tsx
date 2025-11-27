import Sidebar from '../components/Sidebar';
import './PageLayout.css';

export default function Reports() {
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-main">
        <div className="page-header">
          <h1>Reports & Analytics</h1>
          <button className="btn btn-secondary">Export</button>
        </div>
        <div className="page-content">
          <div className="empty-state">
            <p>Reports and analytics coming soon.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
