import { useEffect, useState } from 'react';
import axios  from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('auth/register', {
        username,
        password,
      });
      setSuccess(`Kayıt başarılı! Hoş geldiniz, ${response.data.username}`);
      setError('');
      Cookies.set('username', response.data.username, { expires: 7 }); // Kullanıcı adını çerezlere ekleyin
      navigate('/');
    } catch (err) {
      setError('Kayıt başarısız. Lütfen tekrar deneyin.',err);
      setSuccess('');
    }
  };
useEffect(() => {
    const username = Cookies.get('username');

    if (username) {
      navigate('/');
    }
  }
  , [navigate]);

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="form-container">
        <h1 className="text-center mb-3">Kayıt Ol</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <button type="submit" className="btn btn-primary w-100">Kayıt Ol</button>
        </form>
        <div className="mt-3 text-center">
          <p>Hesabınız var mı? <Link to="/login">Giriş yap</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;