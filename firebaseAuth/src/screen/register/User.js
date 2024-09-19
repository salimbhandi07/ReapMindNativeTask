import React, {useEffect, useMemo, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSignUpUser} from '../../../redux/slice/authSlice';
import {useIsFocused} from '@react-navigation/native';
import NoDataFound from '../../component/NoDataFound';
import Loader from '../../component/Loader';
import SearchInput from '../../component/SearchInput';
import UserItem from './UserItem';
import {filterContacts} from '../../../utils/filterUtils';
import Heading from '../../component/Heading';

const User = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const data = useSelector(state => state.auth?.signUpUser?.users);
  const isLoading = useSelector(state => state.auth?.isSignUpUser);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchSignUpUser());
  }, [dispatch, isFocused]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchSignUpUser()).finally(() => setRefreshing(false));
  };

  const handleSearch = text => {
    setSearchQuery(text);
  };

  const filteredContacts = useMemo(
    () => filterContacts(data, searchQuery),
    [data, searchQuery],
  );

  return (
    <View style={styles.container}>
      <Heading title={'Registered Users'} />
      <SearchInput value={searchQuery} onChange={handleSearch} />
      {isLoading ? (
        <Loader visible={isLoading} />
      ) : (
        <FlatList
          data={filteredContacts}
          renderItem={({item}) => <UserItem item={item} />}
          keyExtractor={item => item._id || item.id}
          contentContainerStyle={styles.listContainer}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListEmptyComponent={<NoDataFound />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default User;
