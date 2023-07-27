import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const AppContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #2ecc71;
  font-size: 24px;
  margin-bottom: 20px;
`;

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    const existingContact = contacts.find(
      (existingContact) => existingContact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts.`);
    } else {
      setContacts((prevContacts) => [...prevContacts, contact]);
    }
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const changeFilter = (event) => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <AppContainer>
      <Title>Phonebook</Title>
      <ContactForm onAddContact={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      <ContactList contacts={filteredContacts} onDeleteContact={deleteContact} />
    </AppContainer>
  );
};

export default App;
