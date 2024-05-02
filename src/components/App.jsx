import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './Form';
import { ContactsList } from './ContactsList';
import { Filter } from './Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('get item');
    const contactsStorage = JSON.parse(localStorage.getItem('contactsStorage'));
    if (contactsStorage) {
      setContacts(contactsStorage);
    }
  }, []);

  useEffect(() => {
    console.log(contacts)
    localStorage.setItem('contactsStorage', JSON.stringify(contacts));
  }, [contacts]);

  const saveContact = contact => {
    const checkName = contacts
      .map(item => item.name.toLowerCase())
      .some(item => item === contact.name.toLowerCase());

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
      return true;
    }
  };

  // const handlerFilterName = event => {
  //   saveFilter(event.target.value);
  // };

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

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],

//     filter: '',
//   };

//   saveContact = contact => {
//     let contacts = this.state.contacts;
//     const checkName = contacts
//       .map(item => item.name.toLowerCase())
//       .some(item => item === contact.name.toLowerCase());

//     if (checkName) {
//       return alert('Contact added before');
//     } else {
//       this.setState(prevState => ({
//         contacts: [
//           ...prevState.contacts,
//           {
//             id: nanoid(),
//             name: contact.name,
//             number: contact.number,
//           },
//         ],
//       }));
//     }
//   };

//   handlerFilterName = event => {
//     this.saveFilter(event.target.value);
//   };

//   saveFilter = filterValue => {
//     this.setState({
//       filter: filterValue,
//     });
//   };

//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(item => item.id !== id),
//     }));
//   };

//   componentDidMount() {
//     const contactsStorage = JSON.parse(localStorage.getItem('contacts'));
//     if (contactsStorage) {
//     }
//     this.setState({ contacts: contactsStorage });
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     // console.log();
//     const contacts = this.state.contacts;
//     const filterValue = this.state.filter.toLowerCase();
//     const filtredContacts = contacts.filter(item =>
//       item.name.toLowerCase().includes(filterValue)
//     );

//     // запис
//     // localStorage.setItem('contacts', JSON.stringify(contacts));
//     // читання
//     // const theme = localStorage.getItem('contacts');
//     // console.log(theme); // "dark"
//     // видалення
//     // localStorage.removeItem('contacts');

//     return (
//       <>
//         <Form onSubmit={this.saveContact} />
//         <Filter value={this.state.filter} onChange={this.saveFilter} />
//         <ContactsList
//           contacts={filtredContacts}
//           handlerDelete={this.deleteContact}
//         />
//       </>
//     );
//   }
// }
