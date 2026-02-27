import React, { useState, useEffect } from 'react';
import styles from './MyProfile.module.css';
import { ArrowLeft } from 'react-iconly';
import DateInput from './components/DateInput';

interface MyProfileProps {
  onBack: () => void;
}

const MyProfile: React.FC<MyProfileProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    dateOfBirth: '',
    email: '',
    gender: 'Female',
    specialization: 'Counselling Therapist',
    languages: 'English, Hindi, Odia',
    country: 'INDIA',
    state: '',
    city: '',
    pincode: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/me', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setFormData({
              fullName: data.user.user_name || '',
              phoneNumber: data.user.phone || '',
              dateOfBirth: data.user.dob ? new Date(data.user.dob).toISOString().split('T')[0] : '',
              email: data.user.email || '',
              gender: data.user.gender || 'Female',
              specialization: data.user.specialization || 'Counselling Therapist',
              languages: data.user.language_spoken || 'English, Hindi, Odia',
              country: data.user.country || 'INDIA',
              state: data.user.state || '',
              city: data.user.city || '',
              pincode: data.user.pincode || '',
              address: data.user.clinic_address || ''
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const payload = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        specialization: formData.specialization,
        languages: formData.languages,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        address: formData.address
      };

      const response = await fetch('http://localhost:3000/auth/complete-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Profile changes saved successfully!');
      } else {
        alert('Failed to save profile changes.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile changes.');
    }
  };

  const handleImageChange = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Selected file:', file.name);
        // Implement image upload logic here if backend supports it
        alert('Image upload not yet implemented on backend');
      }
    };
    input.click();
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={onBack}>
            <ArrowLeft size="medium" primaryColor="#000000" />
          </button>
          <div>
            <h1>My Profile</h1>
            <p>Manage your personal information and preferences.</p>
          </div>
        </div>
        <button className={styles.saveBtn} onClick={handleSaveChanges}>Save Changes</button>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.profileImageSection}>
          <div className={styles.profileAvatar}>
            <svg width="48" height="48" viewBox="0 0 28 24" fill="none">
              <circle cx="12" cy="7" r="4" stroke="#2D7579" strokeWidth="2" fill="none" />
              <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" stroke="#2D7579" strokeWidth="2" fill="none" />
              <path d="M20 8h4m-2-2v4" stroke="#2D7579" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <button className={styles.changeImageBtn} onClick={handleImageChange}>+ Change profile image</button>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Phone Number<span className={styles.required}>*</span></label>
            <div className={styles.phoneInput}>
              <span className={styles.countryCode}>+91</span>
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                maxLength={10}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Date of Birth<span className={styles.required}>*</span></label>
            <DateInput
              value={formData.dateOfBirth}
              onChange={(val) => handleInputChange('dateOfBirth', val)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled // Email usually shouldn't be changeable easily
            />
          </div>

          <div className={styles.formGroup}>
            <label>Gender</label>
            <div className={styles.selectWrapper}>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
              >
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Specialization</label>
            <div className={styles.selectWrapper}>
              <select
                value={formData.specialization}
                onChange={(e) => handleInputChange('specialization', e.target.value)}
              >
                <option>Counselling Therapist</option>
                <option>Clinical Psychologist</option>
                <option>Psychiatrist</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Languages Spoken</label>
            <div className={styles.selectWrapper}>
              <select
                value={formData.languages}
                onChange={(e) => handleInputChange('languages', e.target.value)}
              >
                <option>English, Hindi, Odia</option>
                <option>English, Hindi</option>
                <option>English</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Country<span className={styles.required}>*</span></label>
            <div className={styles.selectWrapper}>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
              >
                <option>INDIA</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>State<span className={styles.required}>*</span></label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Pincode<span className={styles.required}>*</span></label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Office or Clinic Address<span className={styles.required}>*</span></label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
