import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Style.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button className='err-btn' type="primary" shape="round" onClick={handleBackHome}>Back Home</Button>}
    />
  );
};

export default ErrorPage;