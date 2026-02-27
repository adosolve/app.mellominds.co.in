import React, { useState } from 'react';
import styles from './Appointments.module.css';
import { Search, Upload, MoreCircle } from 'react-iconly';

const Appointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Upcoming');

  const tabs = ['Upcoming', 'All Appointments', 'Completed', 'No Show', 'Cancelled'];

  const appointmentData = [
    {
      name: 'Shriram Surse',
      phone: '+91 98765 XXXXX',
      sessionType: 'Individual Therapy',
      timing: 'Friday, Jan 16, 2026 at 4:00 PM - 4:50 PM IST',
      mode: 'In-person',
      status: '',
      actions: '⋯'
    },
    {
      name: 'Rutvik M.',
      phone: '+91 98765 XXXXX',
      sessionType: 'Couple Therapy',
      timing: 'Friday, Jan 16, 2026 at 4:00 PM - 4:50 PM IST',
      mode: 'Google Meet',
      status: '',
      actions: '⋯'
    },
    {
      name: 'Meet Pandya',
      phone: '+91 98765 XXXXX',
      sessionType: 'Couple Therapy',
      timing: 'Friday, Jan 16, 2026 at 4:00 PM - 4:50 PM IST',
      mode: 'In-person',
      status: '',
      actions: '⋯'
    }
  ];

  return (
    <div className={styles.appointmentsPage}>
      <div className={styles.appointmentsHeader}>
        <div className={styles.headerContent}>
          <h1>My Appointments</h1>
          <p>View Recently Book Session, Send Invite and more...</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.searchContainer}>
            <Search size="small" primaryColor="#6E6E6E" />
            <input type="text" placeholder="Search users by name, or phone no" />
          </div>
          <button className={styles.exportBtn}>
            <img src="/Upload.svg" alt="" />
            Export to CSV
          </button>
        </div>
      </div>

      <div className={styles.appointmentsTabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <table className={styles.appointmentsTable}>
        <thead>
          <tr>
            <th>Client Details</th>
            <th>Session Type</th>
            <th>Session Timing</th>
            <th>Mode</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentData.map((appointment, index) => (
            <tr key={index}>
              <td>
                <div className={styles.clientDetails}>
                  <div className={styles.clientName}>{appointment.name}</div>
                  <div className={styles.clientPhone}>{appointment.phone}</div>
                </div>
              </td>
              <td>{appointment.sessionType}</td>
              <td>{appointment.timing}</td>
              <td>{appointment.mode}</td>
              <td>{appointment.status}</td>
              <td>
                <button className={styles.actionsBtn}>
                  <MoreCircle set="light" size={24} primaryColor="#6E6E6E" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <span>Showing 1 to 10 of 32 results</span>
        <div className={styles.paginationControls}>
          <img src="/Arrow - Left Square.svg" alt="Previous" className={styles.paginationBtn} />
          <img src="/Arrow - Right Square.svg" alt="Next" className={styles.paginationBtn} />
        </div>
      </div>
    </div>
  );
};

export default Appointments;