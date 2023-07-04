import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import check from '../../assets/check.png';
import './Styles.css';
import { Typography, Divider } from 'antd';
const { Title, Text } = Typography;

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const formData = location.state?.formData;
    console.log('formData', formData);

    if (!formData) {
      // If formData is null, redirect to the home page
      navigate('/');
    }

    const handleBeforeUnload = () => {
      // Reset the form data to null on page refresh
      navigate('/');
    };

    // Add event listener for beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.state, navigate]);

  const formData = location.state?.formData;

  if (!formData) {
    return null;
  }
  
  return (
    <div className="outer-box">
      {formData && (
        <div className='order-confirmation-box' >
          <Title level={2} className="order-title">
            Order Confirmation
          </Title>
          <div className='check-img-box'>
            <img className='success-check' src={check} alt='success'/>
          </div>
          <Divider />
          <div className="order-status"> 
          <Text strong className='order-purchase'>
            <Text>Status: </Text> Purchased
          </Text>
          </div>
          
          <div className='order-form-details'>
          
            <div>
            <Title className='order-details-label' level={4}>Order Details: </Title>
            <div>
              <Text strong>First Name:</Text> {formData.firstName}
            </div>
            <div>
              <Text strong>Last Name:</Text> {formData.lastName}
            </div>
            <div>
              <Text strong>Address:</Text> {formData.address}
            </div>
            <div>
              <Text strong>City:</Text> {formData.city}
            </div>
            <div>
              <Text strong>Pin Code:</Text> {formData.pinCode}
            </div>
            <div>
              <Text strong>State:</Text> {formData.state}
            </div>
            <div>
              <Text strong>Country:</Text> {formData.country}
            </div>
            <div>
              <Text strong>Email:</Text> {formData.email}
            </div>                   
            <div>
              <Text strong>Phone Number:</Text> {formData.phone}
            </div>
            </div>
            
          </div>
      </div>
      )}
      
    </div>
  );
};


export default OrderConfirmation;
