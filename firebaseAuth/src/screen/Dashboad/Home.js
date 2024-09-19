import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import UserPieChart from '../../component/charts/UserPieChart';
import UserCard from './UserCard';
import UserChart from '../../component/charts/UserChart';
import {
  fetchProfile,
  fetchSignUpUser,
  fetchUserProfile,
} from '../../../redux/slice/authSlice';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchContactForms,
  fetchUserCountMonth,
} from '../../../redux/slice/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userCount = useSelector(state => state.auth?.signUpUser?.users?.length);
  const contact = useSelector(state => state.user?.contactForms?.users?.length);
  const userCountMonth = useSelector(
    state => state?.user?.userCountMonth?.userCounts,
  );


  useEffect(() => {
    dispatch(fetchSignUpUser());
    dispatch(fetchContactForms());
    dispatch(fetchUserCountMonth());
  }, [dispatch, isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.heading}>Dashboard Overview</Text>
        <View style={styles.cardContainer}>
          <UserCard
            icon="account-supervisor"
            title="User Logins"
            count={userCount || 0}
            iconColor="#007bff"
            routeName="Register User"
          />
          <UserCard
            icon="card-account-details-outline"
            title="Contact Forms"
            count={contact || 0}
            iconColor="#28a745"
            routeName="List"
          />
        </View>
        <View style={styles.chartContainer}>
          <UserChart userCountMonth={userCountMonth} />
        </View>
        <View style={styles.chartPieContainer}>
          <UserPieChart userCountMonth={userCountMonth} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
  },
  chartPieContainer: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Home;
