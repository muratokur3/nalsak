import { useState } from 'react';
import axios  from '../axiosConfig';
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
      const response = await axios.post('auth/change-password', {
        newPassword
      });
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
    <div className="container d-flex flex-column align-items-center">
      <div className="form-container">
        <h1 className="text-center mt-3 mb-3">Şifre Değiştir</h1>
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Yeni Şifre"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Yeni Şifre (Tekrar)"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <button type="submit" className="btn btn-primary w-100">Şifreyi Değiştir</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;