import './complaints.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const complaints = ({ type, count, importance }) => {
  let divClass = '';
  if (importance === 3) {
    divClass = 'text-high-importance';
  } else if (importance === 2) {
    divClass = 'text-medium-importance';
  } else if (importance === 1) {
    divClass = 'text-low-importance';
  }

  return (
    <div className={`container ${divClass}`}>
      <p>{type} : {count}</p>
    </div>
  );
};


export default complaints;