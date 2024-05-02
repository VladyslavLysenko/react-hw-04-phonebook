import PropTypes from 'prop-types';

export const ContactsItem = ({ contacts, handlerDelete }) => (
  <>
    {contacts.map(item => (
      <li key={item.id}>
        <span>
          {item.name} : {item.number}
        </span>
        <button
          onClick={() => {
            handlerDelete(item.id);
          }}
        >
          Delete
        </button>
      </li>
    ))}
  </>
);

ContactsItem.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
