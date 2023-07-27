import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/store';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  button {
    padding: 5px 10px;
    background-color: #ff6b6b;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
  }
`;

const ContactItem = styled.li`
  color: #2ecc71;
`;

const ContactNumber = styled.span`
  color: #333;
`;

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <ContactItem key={id}>
          {name}: <ContactNumber>{number}</ContactNumber>
          <button type="button" onClick={() => handleDeleteContact(id)}>
            Delete
          </button>
        </ContactItem>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContactList;