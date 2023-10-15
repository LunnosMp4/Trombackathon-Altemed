import './iconAndText.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const iconAndText = ({ icon, text }) => {
    return (
        <div className="container">
          <FontAwesomeIcon className="icon" icon={icon} />
          <p className='text'>{text}</p>
        </div>
      );
};

export default iconAndText;