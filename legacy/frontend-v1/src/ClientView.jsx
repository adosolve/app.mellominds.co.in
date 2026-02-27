import React, { useState } from 'react';
import './ClientView.css';

const ClientView = ({ client, onBack }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedDate, setSelectedDate] = useState('Dec 2025');
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const tabs = ['Overview', 'Sessions', 'Documents', 'Activity Suggestion'];

  return (
    <div className="client-view">
      <div className="client-layout">
        <div className="left-panel">
          <div className="client-title-section">
            <button className="back-button" onClick={onBack}>
              <img src="/Arrow - Left.svg" alt="Back" />
            </button>
            <div className="client-info">
              <h1>Shriram Surse</h1>
              <p>Client ID: 5678</p>
            </div>
            <button className="edit-button">
              <img src="Edit Square.svg" alt="Edit" />
              Edit
            </button>
          </div>
          
          <div className="info-section">
            <h3>Contact Info:</h3>
            <div className="contact-item">
              <img src="/Call.svg" alt="Phone" />
              <span>+91 76522 9XXXX</span>
            </div>
            <div className="contact-item">
              <img src="/Message.svg" alt="Email" />
              <span>shriram@gmail.com</span>
            </div>
          </div>

          <div className="info-section">
            <h3>Emergency Contact:</h3>
            <div className="emergency-contact-card">
              <div className="emergency-name">Meet Pandya <span className="relationship">(Brother)</span></div>
              <div className="emergency-phone">+91 76552 XXXXX</div>
            </div>
          </div>

          <div className="info-section">
            <h3>Demographics:</h3>
            <div className="demographics-grid">
              <div className="demo-row">
                <span className="demo-label">Age</span>
                <span className="demo-value">21</span>
                <span className="demo-label">Occupation</span>
                <span className="demo-value">Student</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">Gender</span>
                <span className="demo-value">Male</span>
                <span className="demo-label">Marital Status</span>
                <span className="demo-value">Single</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Clinical Profile:</h3>
            <div className="clinical-profile-card">
              <button className="add-clinical-btn">+ add clinical profile</button>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="tab-navigation">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="tab-content">
            {activeTab === 'Overview' && (
              <div className="overview-content">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-label">Sessions</div>
                    <div className="stat-value">09</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Revenue</div>
                    <div className="stat-value">₹9,000</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Next Session</div>
                    <div className="stat-value">Jan 30, 2026</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Cancellation</div>
                    <div className="stat-value">01</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">NoShow</div>
                    <div className="stat-value">00</div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'Sessions' && (
              <>
                <div className="sessions-header">
                  <div className="date-selector" onClick={() => setShowDateDropdown(!showDateDropdown)}>
                    <div className="date-icon">
                      <img src="Graph.svg" alt="Graph" />
                    </div>
                    <span>{selectedDate}</span>
                    <div className="dropdown-arrow">▼</div>
                    {showDateDropdown && (
                      <div className="date-dropdown">
                        <div className="dropdown-header">Custom Dates</div>
                        <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); setSelectedDate('Nov 2025'); setShowDateDropdown(false); }}>Nov 2025</div>
                        <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); setSelectedDate('Oct 2025'); setShowDateDropdown(false); }}>Oct 2025</div>
                        <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); setSelectedDate('Sep 2025'); setShowDateDropdown(false); }}>Sep 2025</div>
                        <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); setSelectedDate('Aug 2025'); setShowDateDropdown(false); }}>Aug 2025</div>
                        <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); setSelectedDate('Jul 2025'); setShowDateDropdown(false); }}>Jul 2025</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="session-list">
                  <div className="session-item">
                    <div className="session-header">
                      <span className="session-time">Friday, Jan 16, 2026 at 4:00 PM - 4:50 PM IST</span>
                    </div>
                    <div className="session-tags">
                      <span className="session-mode">Google Meet</span>
                      <span className="session-type">#Individual Therapy</span>
                    </div>
                    <div className="session-notes">
                      <div>&lt;field_name&gt;</div>
                      <div>&lt;field_data&gt;</div>
                      <div>.</div>
                      <div>.</div>
                      <div>&lt;/&gt;</div>
                      <div>&lt;field_name&gt;</div>
                      <div>&lt;field_data&gt;</div>
                      <div>.</div>
                      <div>.</div>
                      <div>&lt;/&gt;</div>
                    </div>
                  </div>

                  <div className="session-item">
                    <div className="session-header">
                      <span className="session-time">Friday, Jan 16, 2026 at 4:00 PM - 4:50 PM IST</span>
                    </div>
                    <div className="session-tags">
                      <span className="session-mode">Google Meet</span>
                      <span className="session-type">#Individual Therapy</span>
                    </div>
                    <div className="session-notes">
                      <div>&lt;field_name&gt;</div>
                      <div>&lt;field_data&gt;</div>
                      <div>.</div>
                      <div>.</div>
                      <div>&lt;/&gt;</div>
                    </div>
                  </div>
                </div>

                <div className="add-notes-section">
                  <button className="add-notes-button">+ Add Notes</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientView;