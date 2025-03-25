import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '../axiosConfig';

function Home() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]); // Tamamlanmayanlar
  const [completedItems, setCompletedItems] = useState([]); // Tamamlananlar
  const inputRef = useRef(null);

  useEffect(() => {
    const username = Cookies.get('username');

    if (!username) {
      navigate('/login');
      return;
    }

    const fetchItems = async () => {
      try {
        const response = await axios.get('items');
        const fetchedItems = response.data;
        setItems(fetchedItems.filter((item) => !item.completed)); // Tamamlanmayanlar
        setCompletedItems(fetchedItems.filter((item) => item.completed)); // Tamamlananlar
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };

    fetchItems();
  }, [navigate]);

  const handleAddItem = async () => {
    if (inputValue.trim() !== '') {
      try {
        const response = await axios.post('items', { text: inputValue });
        setItems([response.data, ...items]); // Yeni elemanı başa ekle
        setInputValue('');
        inputRef.current.focus(); // Input alanına odaklan
      } catch (err) {
        console.error('Error adding item:', err);
      }
    }
  };

  const handleCompleteItem = async (id) => {
    const item = items.find((item) => item._id === id);
    try {
      const response = await axios.put(`items/${id}`, { ...item, completed: true });
      setItems(items.filter((item) => item._id !== id)); // Tamamlanmayanlardan çıkar
      setCompletedItems([response.data, ...completedItems]); // Tamamlananlara ekle
    } catch (err) {
      console.error('Error completing item:', err);
    }
  };

  const handleReAddItem = async (id) => {
    const item = completedItems.find((item) => item._id === id);
    try {
      const response = await axios.put(`items/${id}`, { ...item, completed: false });
      setCompletedItems(completedItems.filter((item) => item._id !== id)); // Tamamlananlardan çıkar
      setItems([response.data, ...items]); // Tamamlanmayanlara ekle
    } catch (err) {
      console.error('Error re-adding item:', err);
    }
  };

  const handleDeleteItem = async (id, listSetter, list) => {
    try {
      await axios.delete(`items/${id}`);
      listSetter(list.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="input-group mb-3 w-100" style={{ maxWidth: '600px' }}>
        <input
          type="text"
          className="form-control form-control-lg border-primary"
          placeholder="Ürün ekle"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button className="btn btn-primary btn-lg" onClick={handleAddItem}>
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>

      <ul className="list-group mb-3 w-100" style={{ maxWidth: '600px' }}>
        {items.map((item) => (
          <li
            key={item._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <button
                className="btn btn-light me-3 btn-sm"
                onClick={() => handleCompleteItem(item._id)}
              >
                <i className="bi bi-circle" style={{ fontSize: '1.5rem' }}></i> {/* Boş yuvarlak */}
              </button>
              <span>{item.text}</span>
            </div>
            <button
              className="btn btn-link text-danger"
              onClick={() => handleDeleteItem(item._id, setItems, items)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>

      <ul className="list-group mb-3 w-100" style={{ maxWidth: '600px' }}>
        {completedItems.map((item) => (
          <li
            key={item._id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ textDecoration: 'line-through', opacity: 0.6 }}
          >
            <div className="d-flex align-items-center">
              <button
                className="btn btn-warning me-3 btn-sm"
                onClick={() => handleReAddItem(item._id)}
              >
                <i className="bi bi-plus-lg"></i> {/* Tekrar ekleme */}
              </button>
              <span>{item.text}</span>
            </div>
            <button
              className="btn btn-link text-danger"
              onClick={() =>
                handleDeleteItem(item._id, setCompletedItems, completedItems)
              }
            >
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;