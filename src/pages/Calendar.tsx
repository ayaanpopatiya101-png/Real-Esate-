import Sidebar from '../components/Sidebar';
import './PageLayout.css';

export default function Calendar() {
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-main">
        <div className="page-header">
          <h1>Calendar</h1>
          <button className="btn btn-primary">+ Add Event</button>
        </div>
        <div className="page-content">
          <div className="empty-state">
            <p>Calendar view coming soon.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
