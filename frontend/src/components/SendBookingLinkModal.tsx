import React, { useState } from 'react';
import styles from './SendBookingLinkModal.module.css';

interface SendBookingLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SendBookingLinkModal: React.FC<SendBookingLinkModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientWhatsApp: '',
    clientEmail: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendLink = () => {
    // Handle send link logic here
    console.log('Sending booking link with data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <img src="/Send.svg" alt="Send" className={styles.sendIcon} />
            Send Booking Link
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Client Name<span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter client name"
              value={formData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Client WhatsApp No.<span className={styles.required}>*</span>
            </label>
            <div className={styles.phoneInputContainer}>
              <div className={styles.countryCode}>+91</div>
              <input
                type="text"
                placeholder="Enter client whatsapp number"
                value={formData.clientWhatsApp}
                onChange={(e) => handleInputChange('clientWhatsApp', e.target.value)}
                className={styles.phoneInput}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Client Email Address</label>
            <input
              type="email"
              placeholder="Enter client email address (optional)"
              value={formData.clientEmail}
              onChange={(e) => handleInputChange('clientEmail', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.sendLinkButton} onClick={handleSendLink}>
            Send Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendBookingLinkModal;