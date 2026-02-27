import React, { useState } from 'react';
import './App.css';
import AllClients from './AllClients';

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showNotificationsPage, setShowNotificationsPage] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Dec 2025');

  const navItems = [
    { name: 'Dashboard', icon: 'Category1.svg' },
    { name: 'All Clients', icon: '3 User.svg' },
    { name: 'Appointments', icon: 'Calendar1.svg' },
    { name: 'Payments & Invoice', icon: 'Wallet.svg' }
  ];

  const bottomNavItems = [
    { name: 'My Settings', icon: 'Setting.svg' },
    { name: 'Contact Support', icon: 'Calling.svg' }
  ];

  const statsData = [
    { label: 'Revenue', value: '₹1,89,000' },
    { label: 'Refund', value: '₹9,000' },
    { label: 'Sessions', value: '189' },
    { label: 'Cancelled', value: '9' },
    { label: 'NoShow', value: '10' },
    { label: 'Pending Notes', value: '32' },
    { label: 'Pending Payment', value: '5' },
    { label: 'No of Clients', value: '9' }
  ];

  const grayFilter = 'invert(43%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(95%) contrast(87%)';
  const blackFilter = 'brightness(0)';

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const allBookings = [
    { time: 'Friday, Jan 16, 2026 at\n4:00 PM - 4:50 PM IST', client: 'Shriram Surse', type: 'Individual\nTherapy', mode: 'Google\nMeet' },
    { time: 'Friday, Jan 17, 2026 at\n4:00 PM - 4:50 PM IST', client: 'Meet Pandya', type: 'Couple\nTherapy', mode: 'Google\nMeet' },
    { time: 'Friday, Jan 18, 2026 at\n4:00 PM - 4:50 PM IST', client: 'Rutvik M', type: 'Couple\nTherapy', mode: 'In-\nperson' },
    { time: 'Saturday, Jan 19, 2026 at\n2:00 PM - 2:50 PM IST', client: 'Priya Sharma', type: 'Individual\nTherapy', mode: 'Google\nMeet' },
    { time: 'Sunday, Jan 20, 2026 at\n10:00 AM - 10:50 AM IST', client: 'Amit Kumar', type: 'Family\nTherapy', mode: 'In-\nperson' },
    { time: 'Monday, Jan 21, 2026 at\n3:00 PM - 3:50 PM IST', client: 'Sarah Johnson', type: 'Couple\nTherapy', mode: 'Google\nMeet' },
    { time: 'Tuesday, Jan 22, 2026 at\n11:00 AM - 11:50 AM IST', client: 'David Wilson', type: 'Individual\nTherapy', mode: 'In-\nperson' },
    { time: 'Wednesday, Jan 23, 2026 at\n5:00 PM - 5:50 PM IST', client: 'Lisa Brown', type: 'Group\nTherapy', mode: 'Google\nMeet' }
  ];

  const totalPages = Math.ceil(allBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = allBookings.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const actions = [
    {
      title: 'Create Resources',
      description: 'Add new resource and connect it with your calendar',
      icon: <img src="Category.svg" alt="Create Resources" style={{ width: '24px', height: '24px' }} />,
      bg: '#9CFFF499'
    },
    {
      title: 'Create a Booking',
      description: 'Schedule a session for your client manually',
      icon: <img src="Calendar.svg" alt="Create a Booking" style={{ width: '24px', height: '24px' }} />,
      bg: '#FFF29C'
    },
    {
      title: 'Send Booking Link',
      description: 'Share booking link to client to schedule a session',
      icon: <img src="Send.svg" alt="Send Booking link" style={{ width: '24px', height: '24px' }} />,
      bg: '#00403999'
    }
  ];

  const renderSidebar = () => (
    <div className="sidebar">
      <div className="logo">
        <img src="Frame 2 1 (1).svg" alt="MelloMinds Logo" />
      </div>
      
      <div className="nav-menu">
        {navItems.map((item) => (
          <div
            key={item.name}
            className={`nav-item ${activeNav === item.name ? 'active' : ''}`}
            onClick={() => {
              setActiveNav(item.name);
              if (showNotificationsPage) setShowNotificationsPage(false);
            }}
          >
            <span className="nav-icon">
              <img src={item.icon} alt={item.name} />
            </span>
            {item.name}
          </div>
        ))}
      </div>

      <div className="nav-divider"></div>

      <div className="nav-bottom">
        {bottomNavItems.map((item) => (
          <div key={item.name} className={`nav-item ${activeNav === item.name ? 'active' : ''}`} onClick={() => setActiveNav(item.name)}>
            <span className="nav-icon">
              <img src={item.icon} alt={item.name} />
            </span>
            {item.name}
          </div>
        ))}
      </div>

      <div className="hello-section">
        <div style={{ transform: 'translate(-5px, 20px)' }}>
          Say 👋 hello<br />
          to <strong style={{ color: '#F9E141' }}>mello!</strong>
        </div>
      </div>
      
      <img src="MelloFevicon 1.svg" alt="Mello Favicon" className="sidebar-favicon" />
    </div>
  );

  const renderHeader = () => (
    <div className="header">
      <div className="plan-info">
        <span>Your Plan:</span>
        <span className="free-tier">
          Free tier <img src="Danger Circle.svg" alt="Info" style={{ width: '17px', height: '17px', verticalAlign: 'middle' }} />
        </span>
        <button className="upgrade-btn">Upgrade now</button>
      </div>
      
      <div className="user-info">
        <div className="notification-container" style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}>
          <img src={showNotificationDropdown ? "Notification-tap.svg" : "Notification.svg"} alt="bell" style={{ width: '35px', height: '35px' }} />
          {!showNotificationsPage && <div className="notification-badge"></div>}
          {showNotificationDropdown && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <div className="notification-title">Notifications</div>
                <button className="notification-view-more" onClick={(e) => { e.stopPropagation(); setShowNotificationsPage(true); setShowNotificationDropdown(false); }}>view more→</button>
              </div>
              <div className="notification-item">
                <div className="notification-content">
                  <div className="notification-item-title">New Booking</div>
                  <div className="notification-item-desc">You have received a new booking from Meet</div>
                </div>
                <div className="notification-arrow">
                  <img src="Arrow - Right Square.svg" alt="arrow" style={{ width: '16px', height: '16px' }} />
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-content">
                  <div className="notification-item-title">New Booking</div>
                  <div className="notification-item-desc">You have received a new booking from Meet</div>
                </div>
                <div className="notification-arrow">
                  <img src="Arrow - Right Square.svg" alt="arrow" style={{ width: '16px', height: '16px' }} />
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-content">
                  <div className="notification-item-title">New Booking</div>
                  <div className="notification-item-desc">You have received a new booking from Meet</div>
                </div>
                <div className="notification-arrow">
                  <img src="Arrow - Right Square.svg" alt="arrow" style={{ width: '16px', height: '16px' }} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="user-info-card">
          <div className="user-avatar">
            <img src="Profile.svg" alt="Profile" style={{ width: '24px', height: '24px' }} />
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '14px', color: '#2c3e50' }}>Aastha Saraf</div>
            <div style={{ fontSize: '12px', color: '#7f8c8d' }}>sarafaastha13@gmail.com</div>
          </div>
        </div>
        <button className="logout-btn">
          <img src="Logout.svg" alt="Logout" />
        </button>
      </div>
    </div>
  );

  const renderNotificationsPage = () => (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontFamily: 'Urbanist', fontWeight: '700', fontStyle: 'Bold', fontSize: '45px', lineHeight: '100%', letterSpacing: '0%' }}>Notifications</h1>
          <p style={{ fontFamily: 'Urbanist', fontWeight: '600', fontStyle: 'SemiBold', fontSize: '18px', lineHeight: '100%', letterSpacing: '0%', color: '#6E6E6E' }}>Get alerts regarding new booking, payments, cancellations, and more...</p>
        </div>
      </div>
      
      <div className="notifications-section">
        <h3 style={{ fontFamily: 'Urbanist', fontWeight: '600', fontStyle: 'SemiBold', fontSize: '18px', lineHeight: '100%', letterSpacing: '0%', color: '#6E6E6E', marginBottom: '16px', marginLeft: '5px' }}>Today's</h3>
        
        <div className="notification-card">
          <div className="notification-card-content">
            <h4 style={{ fontFamily: 'Urbanist', fontWeight: '700', fontStyle: 'Bold', fontSize: '25px', lineHeight: '100%', letterSpacing: '0%', color: '#082421', margin: '0 0 4px 0' }}>New Booking</h4>
            <p style={{ fontFamily: 'Urbanist', fontWeight: '500', fontStyle: 'Medium', fontSize: '15px', lineHeight: '100%', letterSpacing: '0%', color: '#6E6E6E', margin: '0' }}>You have received a new booking from Meet</p>
          </div>
          <span style={{ fontFamily: 'Urbanist', fontWeight: '500', fontStyle: 'Medium', fontSize: '15px', lineHeight: '100%', letterSpacing: '0%', color: '#6E6E6E' }}>Today - 07:32PM</span>
        </div>
        
        <div className="notification-card">
          <div className="notification-card-content">
            <h4 style={{ fontFamily: 'Urbanist', fontWeight: '700', fontStyle: 'Bold', fontSize: '25px', lineHeight: '100%', letterSpacing: '0%', color: '#082421', margin: '0 0 4px 0' }}>Session Cancelled</h4>
            <p style={{ fontFamily: 'Urbanist', fontWeight: '500', fontStyle: 'Medium', fontSize: '15px', lineHeight: '100%', letterSpacing: '0%', color: '#6E6E6E', margin: '0' }}>Ram has cancelled a session of Jan 15, 2026 at 05:00PM - 05:50PM</p>
          </div>
          <span style={{ fontFamily: 'Urbanist', fontWeight: '500', fontStyle: 'Medium', fontSize: '15px', lineHeight: '100%', letterSpacing: '0%', color: '#6E6E6E' }}>Today - 04:02PM</span>
        </div>
        
        <div className="notification-card">
          <div className="notification-card-content">
            <h4 style={{ fontFamily: 'Urbanist', fontWeight: '700', fontStyle: 'Bold', fontSize: '25px', lineHeight: '100%', letterSpacing: '0%', color: '#082421', margin: '0 0 4px 0' }}>Session Cancelled</h4>
            <p style={{ fontFamily: 'Urbanist', fontWeight: '500', fontStyle: 'Medium', fontSize: '15px', lineHeight: '100%', letterSpacing: '0%', color: '#6E6E6E', margin: '0' }}>Ram has cancelled a session of Jan 15, 2026 at 05:00PM - 05:50PM</p>
          </div>
          <span style={{ fontFamily: 'Urbanist', fontWeight: '500', fontStyle: 'Medium', fontSize: '15px', lineHeight: '100%', letterSpacing: '0%', color: '#6E6E6E' }}>Today - 04:02PM</span>
        </div>
      </div>
      
      <div className="notifications-section">
        <h3 style={{ fontFamily: 'Urbanist', fontWeight: '600', fontStyle: 'SemiBold', fontSize: '18px', lineHeight: '100%', letterSpacing: '0%', color: '#6E6E6E', marginBottom: '16px', marginLeft: '5px' }}>This week's</h3>
        
        <div className="notification-card">
          <div className="notification-card-content">
            <h4 style={{ fontFamily: 'Urbanist', fontWeight: '700', fontStyle: 'Bold', fontSize: '25px', lineHeight: '100%', letterSpacing: '0%', color: '#082421', margin: '0 0 4px 0' }}>Session Cancelled</h4>
            <p style={{ fontFamily: 'Urbanist', fontWeight: '500', fontStyle: 'Medium', fontSize: '15px', lineHeight: '100%', letterSpacing: '0%', color: '#6E6E6E', margin: '0' }}>Ram has cancelled a session of Jan 15, 2026 at 05:00PM - 05:50PM</p>
          </div>
          <span style={{ fontFamily: 'Urbanist', fontWeight: '500', fontStyle: 'Medium', fontSize: '15px', lineHeight: '100%', letterSpacing: '0%', color: '#6E6E6E' }}>Today - 04:02PM</span>
        </div>
        
        <div className="notification-card">
          <div className="notification-card-content">
            <h4 style={{ fontFamily: 'Urbanist', fontWeight: '700', fontStyle: 'Bold', fontSize: '25px', lineHeight: '100%', letterSpacing: '0%', color: '#082421', margin: '0 0 4px 0' }}>Session Cancelled</h4>
            <p style={{ fontFamily: 'Urbanist', fontWeight: '500', fontStyle: 'Medium', fontSize: '15px', lineHeight: '100%', letterSpacing: '0%', color: '#6E6E6E', margin: '0' }}>Ram has cancelled a session of Jan 15, 2026 at 05:00PM - 05:50PM</p>
          </div>
          <span style={{ fontFamily: 'Urbanist', fontWeight: '500', fontStyle: 'Medium', fontSize: '15px', lineHeight: '100%', letterSpacing: '0%', color: '#6E6E6E' }}>Today - 04:02PM</span>
        </div>
      </div>
    </div>
  );

  const renderDashboardContent = () => (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome Back, Aastha Madam!</p>
        </div>
        <div className="header-right">
          <div className="profile-completion">
            <div className="completion-circle">
              <img src="Group 47.svg" alt="Progress" />
            </div>
            <span>Complete your profile <img src="Edit.svg" alt="Edit" style={{ width: '16px', height: '16px', marginLeft: '4px' }} /></span>
          </div>
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
      </div>

      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="content-sections">
        <div>
          <h2 style={{ margin: '0 0 24px 15px', fontFamily: 'Urbanist', fontWeight: '600', fontStyle: 'SemiBold', fontSize: '25px', lineHeight: '100%', letterSpacing: '0%', color: '#082421' }}>Upcoming Bookings</h2>
          <div className="section">
            <div className="table-header">
              <span>Session Timings</span>
              <span>Client Name</span>
              <span>Session Type</span>
              <span>Mode</span>
            </div>
            {currentBookings.map((booking, index) => (
              <div key={index} className="table-row">
                <span className="session-time">
                  {booking.time.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < booking.time.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
                <span className="client-name">{booking.client}</span>
                <span className="session-type">
                  {booking.type.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < booking.type.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
                <span className="session-mode">
                  {booking.mode.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < booking.mode.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </div>
            ))}
            <div className="table-footer">
              <span>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, allBookings.length)} of {allBookings.length} results</span>
              <div className="pagination">
                <img src="Arrow - Left Square.svg" alt="Previous" 
                     style={{ width: '25px', height: '25px', cursor: currentPage > 1 ? 'pointer' : 'not-allowed', filter: currentPage > 1 ? blackFilter : grayFilter }} 
                     onClick={handlePrevPage} />
                <img src="Arrow - Right Square.svg" alt="Next" 
                     style={{ width: '25px', height: '25px', cursor: currentPage < totalPages ? 'pointer' : 'not-allowed', filter: currentPage < totalPages ? blackFilter : grayFilter }} 
                     onClick={handleNextPage} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 style={{ margin: '0 0 24px 0', fontFamily: 'Urbanist', fontWeight: '600', fontStyle: 'SemiBold', fontSize: '25px', lineHeight: '100%', letterSpacing: '0%', color: '#082421' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: '16px' }}>
            {actions.map((action, index) => (
              <div key={index} className="action-card">
                <div className="action-icon" style={{ background: action.bg }}>{action.icon}</div>
                <div>
                  <div className="action-title">{action.title}</div>
                  <div className="action-description">{action.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="footer">
            All Rights Reserved. 2026 MelloMinds LLP
          </div>
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => {
    if (showNotificationsPage) {
      return renderNotificationsPage();
    }
    
    switch (activeNav) {
      case 'All Clients':
        return <AllClients />;
      case 'Dashboard':
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className="dashboard">
      {renderSidebar()}
      <div className="main-content">
        {renderHeader()}
        {renderMainContent()}
      </div>
    </div>
  );
};

export default Dashboard;