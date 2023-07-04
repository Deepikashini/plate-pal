
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'antd/dist/reset.css';
import './index.css'
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <ConfigProvider>
      <App />
    </ConfigProvider>,
)
