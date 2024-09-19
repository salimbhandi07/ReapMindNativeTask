const filteredContacts = useMemo(() => {
    return data?.filter(
      contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [data, searchQuery]);