import Sidebar from '../components/Sidebar';
import './PageLayout.css';

export default function Leads() {
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-main">
        <div className="page-header">
          <h1>Leads Pipeline</h1>
          <button className="btn btn-primary">+ Add Lead</button>
        </div>
        <div className="page-content">
          <div className="empty-state">
            <p>No leads yet. Start building your pipeline!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
