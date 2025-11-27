import Sidebar from '../components/Sidebar';
import './PageLayout.css';

export default function Transactions() {
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-main">
        <div className="page-header">
          <h1>Transactions</h1>
          <button className="btn btn-primary">+ New Transaction</button>
        </div>
        <div className="page-content">
          <div className="empty-state">
            <p>No transactions yet. Start tracking your deals!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
