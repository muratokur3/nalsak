import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Header = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const handleUsernameChange = () => {
      const username = Cookies.get('username');
      if (username) {
        setUsername(username);
      }
    };

    // İlk yüklemede username'i kontrol et
    handleUsernameChange();

    // Çerez değişikliklerini dinlemek için bir interval kullan
    const intervalId = setInterval(handleUsernameChange, 1000);

    // Temizleme işlemi
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true });
      Cookies.remove('token');
      Cookies.remove('username');
      window.location.href = '/login';
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <header className="header d-flex justify-content-between align-items-center p-3 bg-light">
      <Link to="/" className="navbar-brand fs-2 fw-bold text-primary">Nalsak</Link>
      {username && (
        <div className="profile dropdown">
          <button
            className="btn btn-custom dropdown-toggle"
            type="button"
            id="profileDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {username}
          </button>
          <ul className="dropdown-menu" aria-labelledby="profileDropdown">
            <li>
              <Link to="/change-password" className="dropdown-item">Şifre Değiştir</Link>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleLogout}>Çıkış Yap</button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;