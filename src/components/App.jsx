import React, { useState, useEffect } from 'react';
import Section from './Section';
import FormAddContact from './FormAddContact';
import ContactsList from './ContactsList';
import FilterInput from './FilterInput';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const checkContact = (contactObj, reset) => {
    const nameToAdd = contactObj.name;

    if (contacts.some(contact => contact.name === nameToAdd)) {
      alert(`${nameToAdd} is already in your contacts`);
      return;
    }

    handleSubmit(contactObj);
    reset();
  };

  const handleSubmit = contactObj => {
    setContacts(prevState => [...prevState, contactObj]);
  };

  const onInputFind = evt => {
    const stringForFilter = evt.target.value;
    setFilter(stringForFilter);
  };

  const filterContacts = () => {
    const normalizedString = filter.toLowerCase();

    return filter
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedString)
        )
      : contacts;
  };

  const onContactDelete = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    const contactsFromLS = localStorage.getItem('contacts');
    console.log(contactsFromLS);
    const parsedContacts = JSON.parse(contactsFromLS);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = filterContacts();

  return (
    <>
      <Section title="Phonebook">
        <FormAddContact onSubmitForm={checkContact}></FormAddContact>
      </Section>
      <Section title="Contacts">
        <FilterInput
          onFindContacts={onInputFind}
          contacts={contacts}
        ></FilterInput>
        <ContactsList
          filteredContacts={filteredContacts}
          deleteContact={onContactDelete}
        ></ContactsList>
      </Section>
    </>
  );
}
