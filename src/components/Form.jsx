import { useState } from 'react';
import PropTypes from 'prop-types';

export const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const saved = onSubmit({ name: name, number: number });
    if (saved) {
      form.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          required
        />
      </label>
      <label>
        Contact
        <input
          onChange={handleChange}
          value={number}
          type="tel"
          name="number"
          required
        />
      </label>
      <button type="submit">Send</button>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
