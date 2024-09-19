
export const filterContacts = (contacts, query) => {
    if (!contacts) return [];
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.email.toLowerCase().includes(query.toLowerCase()),
    );
  };
  