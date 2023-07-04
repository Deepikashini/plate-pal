import './Style.css';

const Footer = () => {
  return (
    <div className='footer-wrapper'>
      <div className='footer-content'>
        <p className='content'>
          Created By{' '}
          <strong>
            <a className='a-link'
              href="https://www.linkedin.com/in/deepikashini-vilvanathan-50a053189/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deepikashini
            </a>
          </strong>{' '}
          | &#xa9; 2023 All rights reserved
        </p>
      </div>
    </div>
    
  )
}

export default Footer;
