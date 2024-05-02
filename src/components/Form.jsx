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
          placeholder="Add your name..."
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
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
          placeholder="Add your number..."
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
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
