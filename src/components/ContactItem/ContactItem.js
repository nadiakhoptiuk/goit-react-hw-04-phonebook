import React from 'react';
import PropTypes from 'prop-types';
import { FaUserAlt } from 'react-icons/fa';
import s from './ContactItem.module.css';

export default function ContactItem({ contactData, deleteContact }) {
  return (
    <li className={s.contactItem}>
      <FaUserAlt className={s.icon} />
      <p className={s.contactName}>{contactData.name}:</p>
      <p className={s.contactNumber}>{contactData.number}</p>
      <button
        className={s.btnDelete}
        type="button"
        onClick={() => deleteContact(contactData.id)}
      >
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  contactData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  deleteContact: PropTypes.func.isRequired,
};
