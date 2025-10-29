import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contact: '',
    role: '',
    status: '',
    createdDate: '',
    sites: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupError, setPopupError] = useState('');
  const [showUserPage, setShowUserPage] = useState(false);

  const modules = [
    'User Management',
    'Patient Management',
    'Document Management',
    'Form Builder',
    'Electronic Signature',
    'Audit Trail',
    'Dashboard',
    'Notifications',
    'Go Back',
  ];

  useEffect(() => {
    let t;
    if (loggedIn) t = setTimeout(() => {}, 1000);
    return () => clearTimeout(t);
  }, [loggedIn]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.firstName || !form.lastName) {
      return alert('Please fill required fields: First name, Last name, Email, Password');
    }
    setLoggedIn(true);
    setShowUserPage(false);
  };

  const handleModuleClick = (mod) => {
    if (mod === 'User Management') {
      setShowPopup(true);
      setPopupError('');
      setShowUserPage(false);
    }
    if (mod === 'Go Back') {
      setLoggedIn(false);
      setShowUserPage(false);
      setShowPopup(false);
    }
  };

  const handlePopupLogin = (e) => {
    e.preventDefault();
    const enteredEmail = e.target.popupEmail.value.trim();
    const enteredPass = e.target.popupPassword.value;

    if (enteredEmail === form.email && enteredPass === form.password) {
      setPopupError('');
      setShowPopup(false);
      setShowUserPage(true);
    } else {
      setPopupError('Incorrect details. Please try again.');
      e.target.popupPassword.value = '';
      e.target.popupEmail.focus();
    }
  };

  return (
    <div className="app-root">
      {!loggedIn ? (
        <div className="center-wrap">
          <form className="login-card" onSubmit={handleSubmit}>
            <h1 className="card-title">Electronic Consent Application</h1>

            <div className="row two-cols">
              <div className="col">
                <label>First Name</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="First Name" />
              </div>
              <div className="col">
                <label>Last Name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Last Name" />
              </div>
            </div>

            <div className="field">
              <label>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="name@domain.com" />
            </div>

            <div className="field password-field">
              <label>Password</label>
              <div className="password-box">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3L21 21" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.58 10.58a3 3 0 004.84 4.84" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="#0f172a" strokeWidth="1.2"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="row two-cols">
              <div className="col">
                <label>Contact Number</label>
                <input name="contact" type="tel" value={form.contact} onChange={handleChange} placeholder="+91 98765 43210" />
              </div>
              <div className="col">
                <label>Role</label>
                <select name="role" value={form.role} onChange={handleChange} required>
                  <option value="">-- Select Role --</option>
                  <option>Admin</option>
                  <option>Site Staff</option>
                  <option>Monitor</option>
                  <option>Patient</option>
                </select>
              </div>
            </div>

            <div className="row two-cols">
              <div className="col">
                <label>Status</label>
                <select name="status" value={form.status} onChange={handleChange} required>
                  <option value="">-- Select Status --</option>
                  <option>Active</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div className="col">
                <label>Created Date</label>
                <input name="createdDate" type="date" value={form.createdDate} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label>Sites</label>
              <input name="sites" value={form.sites} onChange={handleChange} placeholder="Site 1, Site 2" />
            </div>

            <div className="bottom-actions">
              <label className="remember">
                <input name="remember" type="checkbox" checked={form.remember} onChange={handleChange} /> Remember Me
              </label>
              <button type="submit" className="primary-btn">Login</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="app-layout">
          <aside className="sidebar">
            <h3>eConsent Modules</h3>
            <ul>
              {modules.map((m) => (
                <li key={m} onClick={() => handleModuleClick(m)} className="module-item">{m}</li>
              ))}
            </ul>
          </aside>
          <main className="content-area">
            <div className="content-left">
              {showUserPage ? (
                <section className="user-mgmt">
                  <h2>User Management</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th>Sites</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{form.firstName || '—'}</td>
                        <td>{form.lastName || '—'}</td>
                        <td>{form.email}</td>
                        <td>{form.contact || '—'}</td>
                        <td>{form.role}</td>
                        <td>{form.status}</td>
                        <td>{form.createdDate}</td>
                        <td>{form.sites || '—'}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              ) : (
                <div className="success-panel">
                  <h2>Successfully Logged In ✅</h2>
                  <p className="hint">Welcome, {form.firstName || form.email}</p>
                  <p className="small">You are logged in as <strong>{form.role || '—'}</strong></p>
                </div>
              )}
            </div>
            <div className="content-right"></div>
          </main>
        </div>
      )}

      {showPopup && (
        <div className="modal-overlay" onClick={() => setShowPopup(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Authenticate to enter User Management</h3>
            <form onSubmit={handlePopupLogin}>
              <label>Username (Email)</label>
              <input name="popupEmail" type="email" defaultValue="" required />
              <label>Password</label>
              <input name="popupPassword" type="password" defaultValue="" required />
              {popupError && <p className="popup-error">{popupError}</p>}
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowPopup(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Verify & Enter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
