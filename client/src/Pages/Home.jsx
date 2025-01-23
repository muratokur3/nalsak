import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios  from '../axiosConfig';


function Home() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

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
        setItems(fetchedItems.filter(item => !item.completed));
        setCompletedItems(fetchedItems.filter(item => item.completed));
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
        setItems([...items, response.data]);
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
      setItems(items.filter((item) => item._id !== id));
      setCompletedItems([...completedItems, response.data]);
    } catch (err) {
      console.error('Error completing item:', err);
    }
  };

  const handleReAddItem = async (id) => {
    const item = completedItems.find((item) => item._id === id);
    try {
      const response = await axios.put(`items/${id}`, { ...item, completed: false });
      setCompletedItems(completedItems.filter((item) => item._id !== id));
      setItems([...items, response.data]);
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
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      inputRef.current.focus();
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
        <button
          className="btn btn-primary btn-lg"
          onClick={handleAddItem}
          ref={buttonRef}
          tabIndex="0"
        >
          Ekle
        </button>
      </div>
      {items.length > 0 && <h2>Alınacaklar</h2>}
      <ul className="list-group mb-3 w-100" style={{ maxWidth: '600px' }}>
        {items.map((item) => (
          <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <button className="btn btn-success me-3 btn-sm" onClick={() => handleCompleteItem(item._id)}>
                Alındı
              </button>
              <span>{item.text}</span>
            </div>
            <button className="btn btn-link text-danger" onClick={() => handleDeleteItem(item._id, setItems, items)}>
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>
      {completedItems.length > 0 && <h2>Alınanlar</h2>}
      <ul className="list-group mb-3 w-100" style={{ maxWidth: '600px' }}>
        {completedItems.map((item) => (
          <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <button className="btn btn-warning me-3  btn-sm" onClick={() => handleReAddItem(item._id)}>
               Ekle
              </button>
              <span>{item.text}</span>
            </div>
            <button className="btn btn-link text-danger" onClick={() => handleDeleteItem(item._id, setCompletedItems, completedItems)}>
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;