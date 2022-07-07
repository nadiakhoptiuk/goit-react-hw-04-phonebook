import React from 'react';
import PropTypes from 'prop-types';
import s from './FilterInput.module.css';

export default function FilterInput({ contacts, onFindContacts }) {
  return (
    <>
      {contacts.length ? (
        <label className={s.inputLabel}>
          Find contact by name
          <input
            className={s.filterInput}
            type="text"
            name="filter"
            onChange={onFindContacts}
          />
        </label>
      ) : (
        <p className={s.notification}>You haven't added any contact yet...</p>
      )}
    </>
  );
}

FilterInput.propTypes = {
  onFindContacts: PropTypes.func.isRequired,
  state: PropTypes.shape({
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    filter: PropTypes.string.isRequired,
  }),
};
