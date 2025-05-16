import React from 'react';
import './DashboardStatsCard.css';
import { useNavigate } from 'react-router-dom';

const DashboardStatsCard = ({ title, count, color, path }) => {
  const navigate = useNavigate();

  return (
    <div
      className="dashboard-stats-card"
      style={{ backgroundColor: color, cursor: path ? 'pointer' : 'default' }}
      onClick={() => path && navigate(path)}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{count}</p>
      {path && (
        <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>
          Click here to view details
        </p>
      )}
    </div>
  );
};

export default DashboardStatsCard;
