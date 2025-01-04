import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Yeni şifreler eşleşmiyor');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/change-password', {
        newPassword,
      }, { withCredentials: true });
      setSuccess(response.data.message);
      setError('');
      setNewPassword('');
      setConfirmPassword('');
      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
      setSuccess('');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Şifre Değiştir</h1>
      <form onSubmit={handleChangePassword}>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">Yeni Şifre</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Yeni Şifre (Tekrar)</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button type="submit" className="btn btn-primary">Şifre Değiştir</button>
      </form>
    </div>
  );
};

export default ChangePassword;