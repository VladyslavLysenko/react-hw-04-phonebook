import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => (
  <>
    <label>Find contacts by name</label>
    <input
      value={value}
      type="text"
      onChange={evt => onChange(evt.currentTarget.value)}
      name=""
      placeholder="find name"
    />
  </>
);


Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};