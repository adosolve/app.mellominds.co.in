import React, { useState } from 'react'
import './LoginPage.css'

const SignUpPage: React.FC = () => {
  const [step, setStep] = useState(1)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [languages, setLanguages] = useState('')

  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [address, setAddress] = useState('')

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    if (fullName && email && password && confirmPassword) {
      setStep(2)
    }
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber && dateOfBirth) {
      setStep(3)
    }
  }

  const handleSelectPlan = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Complete:', { fullName, email, phoneNumber, dateOfBirth, gender, specialization, languages, country, state, city, pincode, address })
  }

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Say <span className="wave">👋</span> hello to <span className="mello">mello</span>!
          </h1>
          <h2 className="hero-subtitle">
            <span className="future">FUTURE OF</span> <span className="therapy">THERAPY PRACTICE MANAGEMENT</span>
          </h2>
        </div>
        <div className="mascot">
          <img src="/MelloFevicon 1.png" alt="Mello Mascot" />
        </div>
      </div>

      <div className="right-section">
        <div className="login-card">
          {step === 1 ? (
            <>
              <h1 className="login-title">
                Sign Up <img src="/mellominds logo 2 1.png" alt="MelloMinds" className="logo-image" />
              </h1>
              <p className="welcome-text">
                <strong>Create your account to get started</strong>
              </p>

              <form onSubmit={handleSignUp}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      type="email"
                      id="email"
                      placeholder="enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {showPassword ? (
                          <>
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </>
                        ) : (
                          <>
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      placeholder="re-enter password to confirm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {showConfirmPassword ? (
                          <>
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </>
                        ) : (
                          <>
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                <button type="submit" className="login-button">
                  Create Account
                </button>
              </form>

              <p className="signup-text">
                Already have an account? <a href="/">Login Now!</a>
              </p>
            </>
          ) : step === 2 ? (
            <>
              <h1 className="login-title">
                Let's setup <img src="/mellominds logo 2 1.png" alt="MelloMinds" className="logo-image" />
              </h1>
              <p className="welcome-text">
                <strong>Personal & Professional Information</strong>
              </p>

              <form onSubmit={handleNext}>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number<span style={{color: 'red'}}>*</span></label>
                  <div className="phone-input-wrapper">
                    <input
                      type="text"
                      className="country-code"
                      value="+91"
                      readOnly
                    />
                    <input
                      type="tel"
                      id="phoneNumber"
                      className="phone-input"
                      placeholder="enter phone no."
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth<span style={{color: 'red'}}>*</span></label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      className="date-input"
                      placeholder="DD/MM/YYYY - pick a date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      className="select-input"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="specialization">Specialization</label>
                  <select
                    id="specialization"
                    className="select-input"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  >
                    <option value="">select specializations</option>
                    <option value="clinical">Clinical Psychology</option>
                    <option value="counseling">Counseling</option>
                    <option value="therapy">Therapy</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="languages">Languages Spoken</label>
                  <select
                    id="languages"
                    className="select-input"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                  >
                    <option value="">select languages</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="spanish">Spanish</option>
                  </select>
                </div>

                <button type="submit" className="login-button">
                  Next →
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="login-title">
                Let's setup <img src="/mellominds logo 2 1.png" alt="MelloMinds" className="logo-image" />
              </h1>
              <p className="welcome-text">
                <strong>Location & Address Information</strong>
              </p>

              <form onSubmit={handleSelectPlan}>
                <div className="form-group">
                  <label htmlFor="country">Country<span style={{color: 'red'}}>*</span></label>
                  <select
                    id="country"
                    className="select-input"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">select country</option>
                    <option value="india">India</option>
                    <option value="usa">USA</option>
                    <option value="uk">UK</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="state">State<span style={{color: 'red'}}>*</span></label>
                  <select
                    id="state"
                    className="select-input"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">select state</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="delhi">Delhi</option>
                    <option value="karnataka">Karnataka</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      className="date-input"
                      placeholder="enter city name"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pincode">Pincode<span style={{color: 'red'}}>*</span></label>
                    <input
                      type="text"
                      id="pincode"
                      className="date-input"
                      placeholder="enter pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Office or Clinic Address<span style={{color: 'red'}}>*</span></label>
                  <input
                    type="text"
                    id="address"
                    className="date-input"
                    placeholder="enter office no./building name/street name/etc..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <button type="submit" className="login-button">
                  Select a plan →
                </button>
              </form>
            </>
          )}

          <p className="footer-text">
            All Rights Reserved. 2026 MelloMinds LLP
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
