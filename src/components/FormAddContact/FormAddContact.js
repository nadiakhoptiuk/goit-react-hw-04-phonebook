import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { FaUserPlus } from 'react-icons/fa';
import s from './FormAddContact.module.css';

export default class FormAddContact extends Component {
  static propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    const { state, formReset } = this;
    const { onSubmitForm } = this.props;

    evt.preventDefault();
    const contactData = { id: nanoid(), ...state };
    onSubmitForm(contactData, formReset);
  };

  formReset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { handleChange, handleSubmit, state } = this;

    return (
      <form className={s.form} onSubmit={handleSubmit}>
        <label>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            value={state.name}
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
            value={state.number}
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
}
