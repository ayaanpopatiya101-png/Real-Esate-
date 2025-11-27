import Sidebar from '../components/Sidebar';
import './PageLayout.css';

export default function Tasks() {
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-main">
        <div className="page-header">
          <h1>Tasks</h1>
          <button className="btn btn-primary">+ New Task</button>
        </div>
        <div className="page-content">
          <div className="empty-state">
            <p>No tasks yet. Stay organized and add your first task!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
