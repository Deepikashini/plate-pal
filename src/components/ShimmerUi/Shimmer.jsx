import './Styles.css';
import { Row, Col } from 'antd';

const Shimmer = () => {
  return (
    <div>
      <div className='search-container'>
        <div className='search-box'></div>
      </div>
{/* 
      <div className='shimmer-elements'>
        {Array(10)
          .fill('')
          .map((e, index) => (
            <div key={index} className='card-shimmer'>
              <div className='card-img'></div>
              <div className='card-title'></div>
              <div className='card-sub-title'></div>
              <div className='card-area'></div>
            </div>
          ))}
      </div> */}

      <Row className='shimmer-elements' justify="center">
        <Col xs={24} sm={24} md={24} lg={20} xl={20}>
          <Row gutter={[24, 24]} justify="center">
            {Array(10)
            .fill('')
            .map((e, index) => (
              <Col xs={24} sm={12} md={8} lg={4} xl={4} key={index}>
                  <div className='card-shimmer'>
                    <div className='card-img'></div>
                    <div className='card-title'></div>
                    <div className='card-sub-title'></div>
                    <div className='card-area'></div>
                  </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Shimmer;
