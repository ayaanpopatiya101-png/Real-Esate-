import Sidebar from '../components/Sidebar';
import './PageLayout.css';

export default function Contacts() {
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-main">
        <div className="page-header">
          <h1>Contacts</h1>
          <button className="btn btn-primary">+ Add Contact</button>
        </div>
        <div className="page-content">
          <div className="empty-state">
            <p>No contacts yet. Start by adding your first contact!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
