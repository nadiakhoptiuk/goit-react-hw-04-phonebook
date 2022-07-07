import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaUserPlus } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import s from './FormAddContact.module.css';

export default function FormAddContact({ onSubmitForm }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        console.log('name', value);
        break;

      case 'number':
        setNumber(value);
        console.log('number', value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const contactData = { id: nanoid(), name, number };
    onSubmitForm(contactData, formReset);
  };

  const formReset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Number
        <input
          className={s.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={s.btn} type="submit">
        <FaUserPlus className={s.AddContactIcon} /> Add contact
      </button>
    </form>
  );
}

FormAddContact.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
