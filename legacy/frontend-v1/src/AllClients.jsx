import React, { useState } from 'react';
import './AllClients.css';
import ClientView from './ClientView';

const AllClients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  
  // Sample client data matching the design
  const clients = [
    {
      id: 1,
      name: 'Shriram Surse',
      phone: '+91 98765 XXXXX',
      email: 'shriramsurse@gmail.com',
      sessions: '09',
      revenue: 'Rs. 15,000/-'
    },
    {
      id: 2,
      name: 'Shriram Surse',
      phone: '+91 98765 XXXXX',
      email: 'shriramsurse@gmail.com',
      sessions: '09',
      revenue: 'Rs. 15,000/-'
    },
    {
      id: 3,
      name: 'Shriram Surse',
      phone: '+91 98765 XXXXX',
      email: 'shriramsurse@gmail.com',
      sessions: '09',
      revenue: 'Rs. 15,000/-'
    }
  ];

  // Show ClientView if a client is selected
  if (selectedClient) {
    return (
      <ClientView 
        client={selectedClient} 
        onBack={() => setSelectedClient(null)} 
      />
    );
  }

  return (
    <div className="clients-content">
      <div className="page-header">
        <div>
          <h1>All Clients</h1>
          <p>View Client Details, Sessions and more...</p>
        </div>
        
        <div className="page-actions">
          <div className="search-container">
            <img src="/Search.svg" alt="Search" width="21" height="21" />
            <input
              type="text"
              placeholder="Search users by name, phone no or email id..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="export-btn"><img src="/Upload.svg" alt="" />Export to CSV</button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="table-container">
        <table className="clients-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Contact Info</th>
              <th>No. of Sessions</th>
              <th>Revenue</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="client-name-cell">
                  <div className="client-name">{client.name}</div>
                </td>
                <td className="contact-info-cell">
                  <div className="phone-number">{client.phone}</div>
                  <div className="email-address">{client.email}</div>
                </td>
                <td className="sessions-cell">
                  <span className="session-count">{client.sessions}</span>
                </td>
                <td className="revenue-cell">
                  <span className="revenue-amount">{client.revenue}</span>
                </td>
                <td className="action-cell">
                  <button 
                    className="view-client-btn"
                    onClick={() => setSelectedClient(client)}
                  >
                    View Client
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span>Showing 1 to 10 of 32 results</span>
        <div className="pagination-controls">
          <img src="/Arrow - Left Square.svg" alt="Previous" className="pagination-btn" />
          <img src="/Arrow - Right Square.svg" alt="Next" className="pagination-btn" />
        </div>
      </div>
    </div>
  );
};

export default AllClients;