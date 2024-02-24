import PropTypes from 'prop-types';

const Suggestions = ({ data, handleClick }) => (
  <ul>
    {
                data && data.length
                // eslint-disable-next-line
                  ? data.map((item, index) => <li onClick={handleClick} key={index}>{item}</li>)
                  : null
            }
  </ul>
);

Suggestions.propTypes = {
  data: PropTypes.string.isRequired,
  handleClick: PropTypes.string.isRequired,
};

export default Suggestions;
