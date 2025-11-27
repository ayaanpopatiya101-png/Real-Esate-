import Sidebar from '../components/Sidebar';
import './PageLayout.css';

export default function Campaigns() {
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-main">
        <div className="page-header">
          <h1>Marketing Campaigns</h1>
          <button className="btn btn-primary">+ New Campaign</button>
        </div>
        <div className="page-content">
          <div className="empty-state">
            <p>No campaigns yet. Start building your marketing strategy!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
