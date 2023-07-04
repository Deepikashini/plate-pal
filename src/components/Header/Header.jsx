import { useNavigate } from 'react-router-dom';
import './Styles.css';

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className='header-container'>
      <h1 onClick={handleClick} className='header-title'>
        <span className='first-name'>Plate</span>
        <span className='sec-name'>Pal</span>
      </h1>
    </div>
  );
};

export default Header;