import React, { Component } from 'react';

import Section from './Section';
import FormAddContact from './FormAddContact';
import ContactsList from './ContactsList';
import FilterInput from './FilterInput';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  checkContact = (contactObj, reset) => {
    const nameToAdd = contactObj.name;
    const { contacts } = this.state;

    if (contacts.some(contact => contact.name === nameToAdd)) {
      alert(`${nameToAdd} is already in your contacts`);
      return;
    }

    this.handleSubmit(contactObj);
    reset();
  };

  handleSubmit = contactObj => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactObj],
    }));
  };

  onInputFind = evt => {
    const stringForFilter = evt.target.value;
    this.setState({ filter: stringForFilter });
  };

  filterContacts = () => {
    const { filter: stringForFilter, contacts } = this.state;
    const normalizedString = stringForFilter.toLowerCase();

    return stringForFilter
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedString)
        )
      : contacts;
  };

  onContactDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const {
      checkContact,
      onInputFind,
      filterContacts,
      onContactDelete,
      state,
    } = this;
    const filteredContacts = filterContacts();

    return (
      <>
        <Section title="Phonebook">
          <FormAddContact onSubmitForm={checkContact}></FormAddContact>
        </Section>
        <Section title="Contacts">
          <FilterInput onFindContacts={onInputFind} state={state}></FilterInput>
          <ContactsList
            filteredContacts={filteredContacts}
            deleteContact={onContactDelete}
          ></ContactsList>
        </Section>
      </>
    );
  }
}
