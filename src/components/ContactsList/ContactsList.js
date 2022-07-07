import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContactItem from 'components/ContactItem';
import s from './ContactsList.module.css';

export default class ContactsList extends Component {
  static propTypes = {
    deleteContact: PropTypes.func.isRequired,
    filteredContacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
  };

  render() {
    const { filteredContacts, deleteContact } = this.props;

    return (
      <ul className={s.contactsList}>
        {filteredContacts.map(filteredContact => (
          <ContactItem
            key={filteredContact.id}
            contactData={filteredContact}
            deleteContact={deleteContact}
          ></ContactItem>
        ))}
      </ul>
    );
  }
}
