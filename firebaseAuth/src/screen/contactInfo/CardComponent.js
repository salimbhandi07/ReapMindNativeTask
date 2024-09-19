import React, {useEffect, useMemo, useState} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteContact, fetchContactForms} from '../../../redux/slice/userSlice';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import DeleteModal from '../../component/DeleteModal';
import SearchInput from '../../component/SearchInput';
import NoDataFound from '../../component/NoDataFound';
import Loader from '../../component/Loader';
import ContactCardItem from '../../component/ContactItems';
import {filterContacts} from '../../../utils/filterUtils';
import Heading from '../../component/Heading';

const ContactCard = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const contacts = useSelector(state => state.user?.contactForms?.users);
  const isContacts = useSelector(state => state.user?.isLoading);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const confirmDelete = contact => {
    setSelectedContact(contact);
    setIsModalVisible(true);
  };

  useEffect(() => {
    dispatch(fetchContactForms());
  }, [dispatch, isFocused]);

  const handleDelete = () => {
    dispatch(deleteContact(selectedContact?._id));
    dispatch(fetchContactForms());
    setIsModalVisible(false);
    setSelectedContact(null);
  };

  const handleSearch = text => {
    setSearchQuery(text);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchContactForms()).finally(() => setRefreshing(false));
  };

  const filteredContacts = useMemo(
    () => filterContacts(contacts, searchQuery),
    [contacts, searchQuery],
  );

  const renderContact = ({item}) => (
    <ContactCardItem
      contact={item}
      onPress={() => navigation.navigate('ContactDetail', {contact: item})}
      onDelete={() => confirmDelete(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Heading title={"Contact List"}/>
      <SearchInput value={searchQuery} onChange={handleSearch} />
      {isContacts ? (
        <Loader visible={isContacts} />
      ) : (
        <FlatList
          data={filteredContacts}
          renderItem={renderContact}
          keyExtractor={item => item._id || item.id}
          contentContainerStyle={styles.list}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListEmptyComponent={<NoDataFound />}
        />
      )}

      <DeleteModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleDelete}
        title="Delete Contact"
        message={`Are you sure you want to delete "${selectedContact?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  list: {
    paddingBottom: 20,
  },
});

export default ContactCard;
