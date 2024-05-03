import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './Form';
import { ContactsList } from './ContactsList';
import { Filter } from './Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parcedContacts = JSON.parse(savedContacts);
      return parcedContacts;
    }
    return [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    // console.log('did update');
    const contactsStorage = JSON.parse(localStorage.getItem('contactsStorage'));

    if (contactsStorage) {
      setContacts(contactsStorage);
    }
  }, []);

  useEffect(() => {
    if (contacts.length !== 0) {
      console.log(contacts);
      localStorage.setItem('contactsStorage', JSON.stringify(contacts));
    }
  }, [contacts]);

  const saveContact = contact => {
    console.log('contact', contact);
    console.log('contacts', contacts);

    const checkName = contacts
      .map(item => item.name.toLowerCase())
      .some(item => item === contact.name.toLowerCase());
    console.log('checkName', checkName);

    if (checkName) {
      alert('Contact added before');
      return false;
    } else {
      setContacts([
        ...contacts,
        {
          id: nanoid(),
          name: contact.name,
          number: contact.number,
        },
      ]);

      // console.log('checkName', checkName);
      // console.log(contacts);

      return true;
    }
  };

  const saveFilter = filterValue => {
    setFilter(filterValue);
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const filterValue = filter.toLowerCase();

  const filtredContacts = contacts.filter(item =>
    item.name.toLowerCase().includes(filterValue)
  );

  return (
    <>
      <Form onSubmit={saveContact} />
      <Filter value={filter} onChange={saveFilter} />
      <ContactsList contacts={filtredContacts} handlerDelete={deleteContact} />
    </>
  );
};
