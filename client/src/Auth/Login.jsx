import { useEffect, useState } from 'react';
import axios  from '../axiosConfig.js';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('auth/login', {
        username,
        password,
      });
      setSuccess(`Giriş başarılı! Hoş geldiniz, ${response.data.username}`);
      setError('');
      Cookies.set('username', response.data.username, { expires: 7 }); // Kullanıcı adını çerezlere ekleyin
      navigate('/'); // Başarılı girişten sonra yönlendirme
    } catch (err) {
      setError('Giriş başarısız. Lütfen tekrar deneyin.',err);
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
        <h1 className="text-center mb-3">Giriş Yap</h1>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-primary w-100">Giriş Yap</button>
        </form>
        <div className="mt-3 text-center">
          <p>Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;